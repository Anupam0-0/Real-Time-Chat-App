import {create} from 'zustand';

const useAuthStore = create((set) => ({
    token : localStorage.getItem('TEMPTOKEN') || null,
    setToken: (token) => {
        localStorage.setItem('TEMPTOKEN', token);
        set({ token });
    },

    user: null,
    setUser: (user) => {
        set({ user });
    },
}))


export const useRoomStore = create((set) => ({
    room: null,
    setRoom: (room) => {
        set({ room });
    },
}))

export default useAuthStore;