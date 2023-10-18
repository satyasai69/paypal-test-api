import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
 goerli
} from 'wagmi/chains';
//import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from '@wagmi/core/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

import '../styles/globals.css';


 
const { chains, publicClient } = configureChains(
  [goerli],
  [infuraProvider({ apiKey: "9914ca2f27344fcf828c8e1c33ac6075" })],
)

/*const { chains, publicClient } = configureChains(
  [goerli],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
); */
const { connectors } = getDefaultWallets({
  appName: 'web3-paymet-app',
  projectId: '1ac39e37ad4094b564e470054f24618f' ,
  chains
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export default function App({ Component, pageProps }) {
  return <WagmiConfig config={wagmiConfig}>
  <RainbowKitProvider chains={chains}>
  <Component {...pageProps} />
  </RainbowKitProvider>
</WagmiConfig>
}
