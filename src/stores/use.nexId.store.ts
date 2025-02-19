import create from 'zustand';

interface IdStore {
  nextId: number;
  incrementId: () => void;
}

const useIdStore = create<IdStore>(set => ({
  nextId: 0,
  incrementId: () => set(state => ({ nextId: state.nextId + 1 })),
  
}));

export default useIdStore;