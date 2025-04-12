"use client";
import { useParams } from "next/navigation";
import { usePostDetail } from "@/hooks/posts/usePostDetail";
import CommentForm from "@/components/Post/CommentForm";
import CommentList from "@/components/Post/CommentList";
import PostContent from "@/components/Post/PostContent";

export default function PostDetailPage() {
  const { postId } = useParams();
  const id = decodeURIComponent(postId as string);
  const {
    data: post,
    isLoading,
    isError,
    comment,
    setComment,
    handleSubmit,
    comments,
    handleCommentDelete,
    handleDeletePost,
    user,
  } = usePostDetail(id);

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !post) return <p>불러오기 실패</p>;

  return (
    <div className="flex-grow w-full min-h-[200px] mx-auto px-4 py-10 dark:border dark:border-gray-700 rounded sm:px-30">
      <PostContent post={post} handleDeletePost={handleDeletePost} />
      <CommentForm
        comment={comment}
        setComment={setComment}
        handleSubmit={handleSubmit}
      />
      <CommentList
        comments={comments}
        currentUid={user?.uid}
        onDelete={handleCommentDelete}
      />
    </div>
  );
}
