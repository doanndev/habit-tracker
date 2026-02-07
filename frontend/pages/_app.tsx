import '../app/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { AppProvider } from '../context/AppContext'

const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </div>
  )
}
