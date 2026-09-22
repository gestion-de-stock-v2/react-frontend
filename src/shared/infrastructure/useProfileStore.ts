
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Profile = 'client' | 'admin' | null;

interface ProfileState {
  profile: Profile;
  _hasHydrated: boolean;
  setProfile: (profile: Profile) => void;
  clearProfile: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      _hasHydrated: false,
      setProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: 'ecommerce-profile',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);