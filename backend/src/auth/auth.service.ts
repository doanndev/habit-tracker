/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../users/user.entity';
import { RegisterDto, LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { email, password } = registerDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await (bcrypt.hash as any)(password, 10);

    const user = this.userRepository.create({
      email,
      password_hash: hashedPassword,
    });

    await this.userRepository.save(user);

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: process.env.ACCESS_TOKEN_TTL || '5m' } as any),
      refresh_token: this.jwtService.sign(payload, { expiresIn: process.env.REFRESH_TOKEN_TTL || '7d' } as any),
    };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await (bcrypt.compare as any)(
      password,
      user.password_hash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: process.env.ACCESS_TOKEN_TTL || '5m' } as any),
      refresh_token: this.jwtService.sign(payload, { expiresIn: process.env.REFRESH_TOKEN_TTL || '7d' } as any),
    };
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    try {
      // Verify refresh token

      const payload = this.jwtService.verify(refreshToken);

      // Create new access token

      const newPayload = { email: payload.email, sub: payload.sub };
      const accessTokenTtl = process.env.ACCESS_TOKEN_TTL || '5m';
      return {
        access_token: this.jwtService.sign(newPayload, { expiresIn: accessTokenTtl } as any),
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async googleLogin(credential: string): Promise<{ access_token: string; refresh_token: string; user: any }> {
    const client = new OAuth2Client();
    let ticket;
    try {
      ticket = await client.verifyIdToken({ idToken: credential, audience: process.env.GOOGLE_CLIENT_ID });
    } catch {
      throw new UnauthorizedException('Invalid Google credential');
    }
    const payload = ticket.getPayload();
    if (!payload?.email) throw new UnauthorizedException('No email in Google payload');

    // Tìm hoặc tạo user
    let user = await this.userRepository.findOne({ where: { email: payload.email } });
    if (!user) {
      user = this.userRepository.create({
        email: payload.email,
        password_hash: '', // Không cần password cho Google login
      });
      await this.userRepository.save(user);
    }

    const jwtPayload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(jwtPayload, { expiresIn: process.env.ACCESS_TOKEN_TTL || '5m' } as any),
      refresh_token: this.jwtService.sign(jwtPayload, { expiresIn: process.env.REFRESH_TOKEN_TTL || '7d' } as any),
      user: {
        id: user.id,
        email: user.email,
        name: payload.name || user.email.split('@')[0],
        avatar: payload.picture || 'https://picsum.photos/seed/google/100/100',
        level: 1,
      },
    };
  }
}
