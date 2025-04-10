import { useEffect, useState } from "react";
import { getRegionFromCoords } from "@/utils/getRegionFromCoords";

export function useReverseGeocode(lat: number | null, lng: number | null) {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lat && lng) {
      setLoading(true);
      getRegionFromCoords(lat, lng).then((addr) => {
        setAddress(addr);
        setLoading(false);
      });
    }
  }, [lat, lng]);

  return { address, loading };
}
