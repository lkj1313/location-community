"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const WritePostPage = () => {
  const { region, category } = useParams();
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

  const handleSubmit = () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const postData = {
      title,
      content,
      region,
      category,
      tags,
    };

    console.log("제출 데이터:", postData);
    // TODO: POST API로 전송
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-6">
        [{decodeURIComponent(region as string)}]{" "}
        {decodeURIComponent(category as string)} 글쓰기
      </h1>

      <div className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring focus:border-orange-400"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          className="w-full h-60 border rounded px-4 py-2 text-sm resize-none focus:outline-none focus:ring focus:border-orange-400"
        />

        {/* ✅ 태그 입력 */}
        <div>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            placeholder="태그를 입력하고 Enter를 누르세요"
            className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring focus:border-orange-400"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                #{tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="text-xs text-orange-500 hover:text-orange-700"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600 transition"
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default WritePostPage;
