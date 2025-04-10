// src/components/location/AutoDetectLocation.tsx
"use client";

import { useEffect } from "react";
import { useGeolocation } from "@/hooks/location/useGeolocation";
import { useReverseGeocode } from "@/hooks/location/useReverseGeocode";
import { useLocationStore } from "@/store/useLocationStore";

export default function AutoDetectLocation() {
  const { coords, loading: geoLoading, error } = useGeolocation();
  const { address, loading: addrLoading } = useReverseGeocode(
    coords?.lat ?? null,
    coords?.lng ?? null
  );

  const setCoords = useLocationStore((state) => state.setCoords);
  const setAddress = useLocationStore((state) => state.setAddress);

  useEffect(() => {
    if (coords) setCoords(coords);
  }, [coords, setCoords]);

  useEffect(() => {
    if (address) setAddress(address);
  }, [address, setAddress]);

  if (geoLoading || addrLoading) return <p>📍 위치 파악 중...</p>;
  if (error) return <p>❌ 위치 권한이 필요합니다: {error}</p>;

  return <p>현재 위치: {address}</p>;
}
