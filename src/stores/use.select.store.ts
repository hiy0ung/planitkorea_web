import { create } from 'zustand';

interface SelectStoreState {
  isCityDropdownOpen: boolean;
  setCityDropdownOpen: (isOpen: boolean) => void;
  toggleCityDropdown: () => void;
}

const useSelectStore = create<SelectStoreState>((set) => ({
  isCityDropdownOpen: false,
  setCityDropdownOpen: (isOpen: boolean) => set({ isCityDropdownOpen: isOpen }),
  toggleCityDropdown: () => set((state) => ({ isCityDropdownOpen: !state.isCityDropdownOpen })),
}));

export default useSelectStore;
