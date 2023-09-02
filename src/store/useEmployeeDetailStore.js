import {create} from 'zustand';

const useEmployeeDetailStore = create((set) => ({
  projects: [],
  setProjects: (projectsData) => set({ projects: projectsData }),
  ledProjects: [],
  setLedProjects: (ledProjectsData) => set({ ledProjects: ledProjectsData }),
  reports: [],
  setReports: (reportsData) => set({ reports: reportsData }),
}));

export default useEmployeeDetailStore;
