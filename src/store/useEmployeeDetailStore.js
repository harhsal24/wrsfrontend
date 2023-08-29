import {create} from 'zustand';

const useEmployeeDetailStore = create((set) => ({
  projects: [],
  setProjects: (projectsData) => set({ projects: projectsData }),
  reports: [],
  setReports: (reportsData) => set({ reports: reportsData }),
}));

export default useEmployeeDetailStore;
