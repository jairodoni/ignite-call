import { globalStyles } from '@/styles/global'
import { Roboto } from 'next/font/google'
import type { AppProps } from 'next/app'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })
globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${roboto.className}`}>
      <Component {...pageProps} />
    </main>
  )
}
