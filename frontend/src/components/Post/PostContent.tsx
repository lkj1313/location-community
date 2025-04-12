"use client";
import { PostType } from "@/types/posts";
import useDarkMode from "@/store/darkModeStroe";
import Button from "../ui/Button";
import { auth } from "@/lib/firebase";

interface Props {
  post: PostType;
  handleDeletePost: () => void;
}

export default function PostContent({ post, handleDeletePost }: Props) {
  const { isDarkMode } = useDarkMode();
  const currentUid = auth.currentUser?.uid;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        {/* 제목 */}
        <h1
          className={`text-2xl font-bold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {post.title}
        </h1>

        {/* ✅ 본인 글일 때만 삭제 버튼 표시 */}
        {currentUid === post.author.uid && (
          <Button
            onClick={handleDeletePost}
            variant="danger"
            size="medium"
            className="mt-1"
          >
            삭제
          </Button>
        )}
      </div>

      {/* 작성 정보 */}
      <div
        className={`flex justify-between text-sm border-b pb-2 mb-6 ${
          isDarkMode
            ? "text-gray-400 border-gray-700"
            : "text-gray-500 border-gray-500"
        }`}
      >
        <div>
          <span className="mr-2">작성자: {post.author.nickname}</span>
          <span className="mr-2">
            | {new Date(post.createdAt).toLocaleDateString("ko-KR")}
          </span>
        </div>
        <span>카테고리: {post.category}</span>
      </div>

      {/* 본문 */}
      <div
        className={`text-base leading-relaxed whitespace-pre-wrap mb-8 ${
          isDarkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        {post.content}
      </div>

      {/* 태그 */}
      {post.tags?.length > 0 && (
        <div
          className={`text-sm border-t pt-4 ${
            isDarkMode ? "text-gray-400 border-gray-700" : "text-gray-600"
          }`}
        >
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
