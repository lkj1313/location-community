import { useRouter } from "next/navigation";
import { useLocationStore } from "@/store/useLocationStore";

export function useCategoryNavigation() {
  const router = useRouter();
  const region = useLocationStore((state) => state.address);

  const navigateToCategory = (e: React.MouseEvent, category: string) => {
    if (!region) {
      e.preventDefault(); // 링크 막기
      alert("먼저 지역을 선택해주세요.");
      return;
    }

    router.push(`/community/${region}/${category}`);
  };

  return { navigateToCategory };
}
