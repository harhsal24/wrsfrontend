import {create} from 'zustand';

export const useLoginStore = create((set) => ({
  errorMessage: '',
  setErrorMessage: (message) => set({ errorMessage: message }),
}));
