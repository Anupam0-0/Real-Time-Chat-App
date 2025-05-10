import {create} from 'zustand';

const useChatStore = create((set) => ({
    screen: null,
    setScreen: (screen) => set({ screen }),
}))


export default useChatStore;    