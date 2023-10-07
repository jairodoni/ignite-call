import Head from 'next/head'
import { Roboto } from 'next/font/google'
import { Heading } from '@ignite-ui/react'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Ignite Call</title>
      </Head>
      <main className={`${roboto.className}`}>
        <Heading as="h1">
          Templates <span>-&gt;</span>
        </Heading>
      </main>
    </>
  )
}
