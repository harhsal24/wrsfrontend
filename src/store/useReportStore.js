import {create} from 'zustand';

export const useReportStore = create((set) => ({
  deliverables: '',
  noOfHours: '',
  activity: '',
  plannedCompletionDate: '',
  actualCompletionDate: '',
  selectedProjectId: null,
  reportDetails: [],
  setDeliverables: (value) => set({ deliverables: value }),
  setNoOfHours: (value) => set({ noOfHours: value }),
  setActivity: (value) => set({ activity: value }),
  setPlannedCompletionDate: (value) => set({ plannedCompletionDate: value }),
  setActualCompletionDate: (value) => set({ actualCompletionDate: value }),
  setSelectedProjectId: (projectId) => set({ selectedProjectId: projectId }),
  setReportDetails: (details) => set({ reportDetails: details }),
}));

