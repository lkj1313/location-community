"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "@/types/posts";

const fetchPost = async (postId: string): Promise<PostType> => {
  const res = await fetch(`http://localhost:4000/api/posts/${postId}`);
  if (!res.ok) throw new Error("게시글을 불러오지 못했습니다.");
  return res.json();
};

export default function PostDetailPage() {
  const { postId, region, category } = useParams();
  const id = decodeURIComponent(postId as string);

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<PostType>({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });

  if (isLoading) return <p className="text-center py-12">로딩 중...</p>;
  if (isError || !post)
    return (
      <p className="text-center py-12 text-red-500">글을 불러올 수 없습니다.</p>
    );

  return (
    <div className="flex-grow w-full min-h-[200px] mx-auto px-4 py-10   dark:border dark:border-gray-700 rounded sm:px-30">
      {/* 제목 */}
      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
        {post.title}
      </h1>

      {/* 작성 정보 */}
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-2 mb-6">
        <div>
          <span className="mr-2">작성자: {post.author.nickname}</span>
          <span className="mr-2">
            | {new Date(post.createdAt).toLocaleDateString("ko-KR")}
          </span>
        </div>
        <span>카테고리: {post.category}</span>
      </div>

      {/* 본문 */}
      <div className="text-gray-800 dark:text-gray-200 text-base leading-relaxed whitespace-pre-wrap mb-8">
        {post.content}
      </div>

      {/* 태그 */}
      {post.tags?.length > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400 border-t dark:border-gray-700 pt-4">
          <span className="mr-2 font-semibold">태그:</span>
          {post.tags.map((tag) => (
            <span key={tag} className="mr-2 text-orange-500">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
