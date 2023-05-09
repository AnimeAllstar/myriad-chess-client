import '@myriad-chess/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Myriad Chess</title>
        <meta name='description' content='Play chess with a myriad of AI opponents' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
