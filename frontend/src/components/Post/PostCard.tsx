import Link from "next/link";
import { PostType } from "@/types/posts";
import { formatDate } from "@/utils/fromDate";
import useDarkMode from "@/store/darkModeStroe";
type Props = {
  post: PostType;
  region: string;
  category: string;
};

export default function PostCard({ post, region, category }: Props) {
  const { isDarkMode } = useDarkMode();
  return (
    <Link
      href={`/community/${region}/${category}/${post._id}`}
      className={`block w-full max-w-sm rounded-xl px-4 py-3 shadow-sm transition
      ${
        isDarkMode
          ? "bg-gray-800 hover:bg-gray-700"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      <div
        className={`flex justify-between items-center text-sm ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <span
          className={`font-medium ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {post.author.nickname}
        </span>
        <span>{formatDate(post.createdAt)}</span>
      </div>

      <h2
        className={`mt-1 font-semibold text-base line-clamp-1 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {post.title}
      </h2>
      <p
        className={`mt-1 text-sm line-clamp-2 ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {post.content}
      </p>

      <div className="mt-2 flex flex-wrap gap-2">
        <span className="text-xs text-orange-500 font-medium inline-block bg-orange-50 px-2 py-0.5 rounded">
          #{post.category}
        </span>
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="text-xs text-orange-500 font-medium inline-block bg-orange-50 px-2 py-0.5 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
