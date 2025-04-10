// src/utils/getSimpleRegionFromCoords.ts

const regionMap: Record<string, string> = {
  서울특별시: "서울",
  부산광역시: "부산",
  대구광역시: "대구",
  인천광역시: "인천",
  광주광역시: "광주",
  대전광역시: "대전",
  울산광역시: "울산",
  세종특별자치시: "세종",
  경기도: "경기",
  강원특별자치도: "강원",
  충청북도: "충북",
  충청남도: "충남",
  전라북도: "전북",
  전라남도: "전남",
  경상북도: "경북",
  경상남도: "경남",
  제주특별자치도: "제주",
};

export async function getRegionFromCoords(
  lat: number,
  lng: number
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      }
    );

    const data = await res.json();
    const region1 = data.documents[0]?.address?.region_1depth_name;

    if (!region1) return null;

    const shortRegion = regionMap[region1] ?? region1;
    return shortRegion; // ✅ 시/도만 반환
  } catch (error) {
    console.error("시/도 변환 실패", error);
    return null;
  }
}
