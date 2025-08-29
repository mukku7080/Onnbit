import { create } from 'zustand';

export const useWalletStore = create((set) => ({
    web3wallet: null,
    setWeb3wallet: (wallet) => set({ web3wallet: wallet }),
}));
