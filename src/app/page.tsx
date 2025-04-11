"use client";
import { useState } from "react";
import AutoDetectLocation from "@/components/location/AutoDetectLocation";
import CategoryCard from "@/components/ui/CategoryCard";
import Input from "@/components/ui/Input";
import { Search } from "lucide-react";
import { useLocationStore } from "@/store/useLocationStore";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setAddress = useLocationStore((state) => state.setAddress);

  return (
    <>
      <div className="flex-grow flex flex-col py-20 px-20 sm:px-10">
        <div className="font-bold flex flex-col justify-center text-2xl sm:text-3xl gap-20">
          {/* 지역 선택 */}
          <div className="flex justify-center whitespace-nowrap">
            <span>
              <AutoDetectLocation
                withSpace={true}
                onClick={() => setIsModalOpen(true)}
              />
              커뮤니티 찾고 계신가요?
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
            <CategoryCard title="자유글" icon="🔥" />
            <CategoryCard title="중고거래" icon="💸" />
            <CategoryCard title="질문" icon="❓" />
            <CategoryCard title="모임" icon="📢" />
          </div>
        </div>
      </div>

      {/* 지역 선택 모달 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)} // 👈 배경 클릭 시 모달 닫힘
        >
          <div
            className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-lg w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">지역 선택</h2>
            <ul className="space-y-2">
              {["서울", "대구", "부산", "경기도", "광주"].map((city) => (
                <li key={city}>
                  <button
                    className="w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md"
                    onClick={() => {
                      setAddress(city);
                      setIsModalOpen(false);
                    }}
                  >
                    {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
