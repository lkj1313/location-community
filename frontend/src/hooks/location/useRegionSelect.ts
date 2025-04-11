import { useState } from "react";
import { useLocationStore } from "@/store/useLocationStore";

export function useRegionSelect() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setAddress = useLocationStore((state) => state.setAddress);
  const region = useLocationStore((state) => state.address);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const selectRegion = (region: string) => {
    setAddress(region);
    closeModal();
  };

  return {
    region,
    isModalOpen,
    openModal,
    closeModal,
    selectRegion,
  };
}
