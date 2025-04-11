"use client";

import { Search } from "lucide-react";
import Link from "next/link";

import AutoDetectLocation from "@/components/location/AutoDetectLocation";
import CategoryCard from "@/components/ui/CategoryCard";
import Input from "@/components/ui/Input";
import LocationModal from "@/components/location/LocationModal";
import { categories } from "@/constants/categories";
import { useRegionSelect } from "@/hooks/location/useRegionSelect";
import { useCategoryNavigation } from "@/hooks/navigation/useCategoryNavigation";
export default function Home() {
  // 지역 선택 상태 및 모달 제어 로직을 캡슐화한 커스텀 훅
  const { region, isModalOpen, openModal, closeModal, selectRegion } =
    useRegionSelect();

  // 카테고리 클릭 시 지역 확인 후 이동 처리하는 커스텀 훅
  const { navigateToCategory } = useCategoryNavigation();

  return (
    <>
      <main className="flex-grow flex flex-col py-20 px-20 sm:px-10">
        <div className="font-bold flex flex-col justify-center text-2xl sm:text-3xl gap-20">
          {/* 지역 선택 */}
          <div className="flex justify-center whitespace-nowrap">
            <span>
              <AutoDetectLocation onClick={openModal} /> 커뮤니티 찾고 계신가요?
            </span>
          </div>

          {/* 검색창 */}
          <div className="sm:px-40">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="검색어를 입력해주세요"
                className="text-sm px-10 h-10"
              />
            </div>
          </div>

          {/* 카테고리 카드 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map(({ title, icon }) => (
              <Link
                key={title}
                href={`/community/${region}/${title}`}
                onClick={(e) => navigateToCategory(e, title)}
                className="block"
              >
                <CategoryCard title={title} icon={icon} />
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* 지역 선택 모달 */}
      {isModalOpen && (
        <LocationModal onClose={closeModal} onSelect={selectRegion} />
      )}
    </>
  );
}
