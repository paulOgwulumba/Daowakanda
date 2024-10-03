import '../styles/global.scss';
import '../styles/main.css';
import 'react-loading-skeleton/dist/skeleton.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';
import { WalletProvider } from '@txnlab/use-wallet-react';
import { NetworkId, WalletId, WalletManager } from '@txnlab/use-wallet';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  const walletManager = new WalletManager({
    wallets: [WalletId.DEFLY, WalletId.PERA, WalletId.EXODUS, WalletId.KIBISIS],
    network:
      process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
        ? NetworkId.MAINNET
        : NetworkId.TESTNET,
  });

  return (
    <WalletProvider manager={walletManager}>
      <RecoilRoot>
        <SnackbarProvider
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Toaster />
          <Component {...pageProps} />
        </SnackbarProvider>
      </RecoilRoot>
    </WalletProvider>
  );
}
