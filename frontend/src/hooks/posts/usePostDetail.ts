"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { PostType } from "@/types/posts";
import { useRouter, useParams } from "next/navigation";

export type CommentType = {
  _id: string;
  content: string;
  createdAt: string;
  author: { uid: string; nickname: string };
};

export const usePostDetail = (postId: string) => {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const user = auth.currentUser;
  const router = useRouter();
  const { region, category } = useParams();

  const postQuery = useQuery<PostType>({
    queryKey: ["post", postId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:4000/api/posts/${postId}`);
      if (!res.ok) throw new Error("게시글을 불러오지 못했습니다.");
      return res.json();
    },
  });

  const commentQuery = useQuery<CommentType[]>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:4000/api/comments/${postId}`);
      if (!res.ok) throw new Error("댓글을 불러올 수 없습니다.");
      return res.json();
    },
  });

  const handleSubmit = async () => {
    if (!comment.trim()) return alert("댓글을 입력해주세요.");
    if (!user) return alert("로그인 후 작성 가능합니다.");

    const idToken = await user.getIdToken();

    const res = await fetch("http://localhost:4000/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        postId,
        content: comment,
        author: {
          uid: user.uid,
          nickname: user.displayName,
        },
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "댓글 등록 실패");
    }

    setComment("");
    queryClient.invalidateQueries({ queryKey: ["comments", postId] });
  };
  // 포스트삭제
  const handleDeletePost = async () => {
    if (!user) return alert("로그인 후 삭제 가능합니다.");
    const confirm = window.confirm("정말 이 글을 삭제하시겠습니까?");
    if (!confirm) return;

    const idToken = await user.getIdToken();

    const res = await fetch(`http://localhost:4000/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "글 삭제 실패");
    }

    alert("글이 삭제되었습니다.");
    router.push(`/community/${region}/${category}`);
  };
  // 댓글삭제
  const handleCommentDelete = async (commentId: string) => {
    if (!user) return;
    const idToken = await user.getIdToken();
    const confirm = window.confirm("댓글을 삭제하시겠습니까?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:4000/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "삭제 실패");
    }

    queryClient.invalidateQueries({ queryKey: ["comments", postId] });
  };

  return {
    user,
    comment,
    setComment,
    handleSubmit,
    handleCommentDelete,
    handleDeletePost,
    ...postQuery,
    comments: commentQuery.data ?? [],
    isLoadingComments: commentQuery.isLoading,
    isErrorComments: commentQuery.isError,
  };
};
