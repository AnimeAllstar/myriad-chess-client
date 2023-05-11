import { GameStateProvider } from '@myriad-chess/components/GameStateProvider'
import '@myriad-chess/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SSRProvider } from 'react-bootstrap'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SSRProvider>
      <GameStateProvider>
        <Head>
          <title>Myriad Chess</title>
          <meta name='description' content='Play chess with a myriad of AI opponents' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Component {...pageProps} />
      </GameStateProvider>
    </SSRProvider>
  )
}

export default App
