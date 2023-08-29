import {create} from 'zustand';

export const useRegistrationStore = create((set) => ({
  submitted: false,
  setSubmitted: (status) => set({ submitted: status }),
}));
