import Button from "@/components/ui/Button";

interface Props {
  title: string;
  icon: string;
  onClick?: () => void;
}

export default function CategoryCard({ title, icon, onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      variant="light"
      className="flex-col w-full p-0 gap-2 text-center 
        border border-gray-200 
        bg-gray-100 hover:bg-gray-200
        dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 
        text-gray-900 dark:text-white"
    >
      <span className="text-2xl sm:text-3xl">{icon}</span>
      <span className="text-sm sm:text-lg font-semibold">{title}</span>
    </Button>
  );
}
