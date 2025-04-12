"use client";

import { formatDate } from "@/utils/fromDate";
import useDarkMode from "@/store/darkModeStroe";

type Comment = {
  _id: string;
  content: string;
  createdAt: string;
  author: {
    uid: string;
    nickname: string;
  };
};

type Props = {
  comments: Comment[];
  currentUid?: string;
  onDelete: (commentId: string) => void;
};

export default function CommentList({ comments, currentUid, onDelete }: Props) {
  const { isDarkMode } = useDarkMode();

  if (comments.length === 0)
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
        아직 댓글이 없습니다.
      </p>
    );

  return (
    <div className="mt-6 space-y-4">
      {comments.map((c) => (
        <div
          key={c._id}
          className={`pb-2 text-sm ${
            isDarkMode
              ? "text-gray-300 border-b border-gray-700"
              : "text-gray-700 border-b border-gray-500"
          }`}
        >
          <div className="flex justify-between mb-1">
            <span className="font-medium">{c.author.nickname}</span>
            <span className="text-xs text-gray-400">
              {formatDate(c.createdAt)}
            </span>
          </div>
          <p>{c.content}</p>
          {currentUid === c.author.uid && (
            <button
              onClick={() => onDelete(c._id)}
              className="mt-1 text-xs text-red-500 hover:underline"
            >
              삭제
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
