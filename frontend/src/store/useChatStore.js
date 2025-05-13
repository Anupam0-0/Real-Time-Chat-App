import { create } from 'zustand';

const useChatStore = create((set, get) => ({
  rooms: [],
  currentRoom: null,
  messages: [],
  friends: [],

  setRooms: (rooms) => set({ rooms }),
  setCurrentRoom: (room) => {
    set({ currentRoom: room, messages: [] });
  },
  addMessage: (msg) => set({ messages: [...get().messages, msg] }),
  setMessages: (msgs) => set({ messages: msgs }),
  setFriends: (friends) => set({ friends }),
}));

export default useChatStore;
