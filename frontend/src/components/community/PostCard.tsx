import Link from "next/link";
import { PostType } from "@/types/posts";

type Props = {
  post: PostType;
  region: string;
  category: string;
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

export default function PostCard({ post, region, category }: Props) {
  return (
    <Link
      href={`/community/${region}/${category}/${post._id}`}
      className="block w-full max-w-sm border rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition bg-white"
    >
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span className="font-medium text-gray-600">
          {post.author.nickname}
        </span>
        <span>{formatDate(post.createdAt)}</span>
      </div>

      <h2 className="mt-1 font-semibold text-base text-gray-900 line-clamp-1">
        {post.title}
      </h2>
      <p className="mt-1 text-sm text-gray-600 line-clamp-2">{post.content}</p>

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
