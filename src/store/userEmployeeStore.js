import {create} from 'zustand';

const useUserEmployeeStore = create((set) => ({
  loggedInEmployee: null,
  setLoggedInEmployee: (employeeData) => set({ loggedInEmployee: employeeData }),
  clearLoggedInEmployee: () => set({ loggedInEmployee: null }),
}));

export default useUserEmployeeStore;
