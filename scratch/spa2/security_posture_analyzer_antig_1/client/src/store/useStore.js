import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  
  activeSession: null,
  currentReport: null,
  
  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
      set({ token, isAuthenticated: true });
    } else {
      localStorage.removeItem('token');
      set({ token: null, isAuthenticated: false, user: null });
    }
  },
  
  setActiveSession: (session) => set({ activeSession: session }),
  setCurrentReport: (report) => set({ currentReport: report }),
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false, activeSession: null, currentReport: null });
  }
}));

export default useStore;
