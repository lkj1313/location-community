// src/store/locationStore.ts
import { create } from "zustand";

interface LocationState {
  coords: { lat: number; lng: number } | null;
  address: string | null;
  setCoords: (coords: { lat: number; lng: number }) => void;
  setAddress: (address: string) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  coords: null,
  address: null,
  setCoords: (coords) => set({ coords }),
  setAddress: (address) => set({ address }),
}));
