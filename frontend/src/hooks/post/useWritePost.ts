import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export function useWritePost(region: string, category: string) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("로그인 후 글을 작성할 수 있습니다.");
      return;
    }

    const idToken = await user.getIdToken();

    const postData = {
      title,
      content,
      region,
      category,
      tags,
      author: {
        uid: user.uid,
        nickname: user.displayName,
      },
    };

    try {
      const res = await fetch("http://localhost:4000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "글 등록 실패");
      }

      alert("글이 등록되었습니다.");
      router.push(`/community/${region}/${category}`);
    } catch (err: any) {
      console.error("❌ 글 등록 실패:", err.message);
      alert("글 등록 중 오류 발생: " + err.message);
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    tagInput,
    setTagInput,
    tags,
    addTag,
    removeTag,
    handleSubmit,
  };
}
