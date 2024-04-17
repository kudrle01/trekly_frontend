import { create } from 'zustand';

const useRefreshStore = create(set => ({
  refresh: false,
  toggleRefresh: () => set(state => ({ refresh: !state.refresh }))
}));

export default useRefreshStore;