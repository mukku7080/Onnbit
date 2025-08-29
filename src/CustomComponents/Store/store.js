// store.js
import { create } from 'zustand';

const useStore = create((set) => ({
    paid: false,
    receive: false,
    cancel: false,
    expire: false,
    dispute: false,
    buyer: false,
    seller: false,
    disputeMessage: false,

    setPaid: (val) => set({ paid: val }),
    setReceived: (val) => set({ receive: val }),
    setCancel: (val) => set({ cancel: val }),
    setExpire: (val) => set({ expire: val }),
    setDispute: (val) => set({ dispute: val }),
    setBuyer: (val) => set({ buyer: val }),
    setSeller: (val) => set({ seller: val }),
    setDisputeMessage: (val) => set({ disputeMessage: val }),
}));

export default useStore;
