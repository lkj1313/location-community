"use client";

import { useGeolocation } from "@/hooks/location/useGeolocation"; // 사용자 좌표 가져오는 커스텀 훅
import { useReverseGeocode } from "@/hooks/location/useReverseGeocode"; // 좌표 → 주소 변환 훅
import { useLocationStore } from "@/store/useLocationStore"; // Zustand 전역 상태 (address, coords)
import { useEffect, useRef } from "react";

export default function AutoDetectLocation({
  withSpace = false,
  onClick,
}: {
  withSpace?: boolean;
  onClick?: () => void;
}) {
  // 1. 위치 좌표 가져오기
  const { coords, loading: geoLoading, error } = useGeolocation();

  // 2. 좌표 → 주소 변환
  const { address, loading: addrLoading } = useReverseGeocode(
    coords?.lat ?? null,
    coords?.lng ?? null
  );

  // 3. Zustand 상태
  const userAddress = useLocationStore((state) => state.address);
  const setCoords = useLocationStore((state) => state.setCoords);
  const setAddress = useLocationStore((state) => state.setAddress);

  // 4. 최초 주소 자동 감지 여부 플래그
  const hasInitialized = useRef(false);

  // 5. 좌표가 바뀌면 상태에 저장
  useEffect(() => {
    if (coords) setCoords(coords);
  }, [coords, setCoords]);

  // 6. 주소가 나왔고, 아직 한 번도 저장 안 했으면 저장
  useEffect(() => {
    if (address && !hasInitialized.current) {
      setAddress(address);
      hasInitialized.current = true;
    }
  }, [address, setAddress]);

  // 7. 로딩/에러 상태 처리
  if (geoLoading || addrLoading) return <span>📍 위치 파악 중...</span>;
  if (error) return <span>❌ 위치 권한 필요: {error}</span>;

  // 8. 주소 표시 (클릭 시 수동 선택 모달 등 열리도록)
  return (
    <button
      onClick={onClick}
      className="text-blue-600 font-semibold underline underline-offset-2"
    >
      {userAddress}
      {withSpace ? " " : ""}
    </button>
  );
}
