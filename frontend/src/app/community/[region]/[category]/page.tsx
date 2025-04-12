"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { usePosts } from "@/hooks/posts/usePosts";
import PostCard from "@/components/Post/PostCard";

export default function CommunityBoardPage() {
  const rawRegion = useParams().region;
  const rawCategory = useParams().category;
  const region = decodeURIComponent(rawRegion as string);
  const category = decodeURIComponent(rawCategory as string);

  const { posts, isLoading, isError } = usePosts(region, category);

  return (
    <div className="flex-grow flex flex-col gap-3 px-4 py-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">
          [{region}] - {category} 게시판
        </h1>
        <Link
          href={`/community/${region}/${category}/write`}
          className="text-sm bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          글쓰기
        </Link>
      </div>

      {isLoading && (
        <p className="text-sm text-gray-500 text-center py-10">
          게시글 불러오는 중...
        </p>
      )}
      {isError && (
        <p className="text-sm text-red-500 text-center py-10">
          게시글을 불러오는 데 실패했습니다.
        </p>
      )}
      {!isLoading && posts.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-10">
          아직 게시글이 없습니다.
        </p>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            region={region}
            category={category}
          />
        ))}
      </div>
    </div>
  );
}
