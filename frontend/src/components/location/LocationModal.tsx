"use client";
import { cityList } from "@/constants/cityList";
import Button from "../ui/Button";

export default function LocationModal({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (city: string) => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="max-h-[70vh] overflow-y-auto bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-lg w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">지역 선택</h2>
        <ul className="space-y-2">
          {cityList.map((city) => (
            <li key={city}>
              <Button
                onClick={() => {
                  onSelect(city);
                  onClose();
                }}
                variant="gray"
                fullWidth
                className="text-left hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2"
              >
                {city}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
