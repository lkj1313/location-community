"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const dummyPosts = [
  {
    _id: "1",
    title: "서울에서 같이 모임할 사람 구해요!",
    content: "이번 주말에 강남역 근처에서 소규모 모임 진행할 예정입니다...",
    author: { nickname: "닉네임1" },
    createdAt: "2025-04-10T12:34:56Z",
    category: "모임",
  },
  {
    _id: "2",
    title: "자전거 팝니다",
    content: "상태 아주 좋고, 가격은 10만원입니다. 직거래 가능해요!",
    author: { nickname: "닉네임2" },
    createdAt: "2025-04-09T15:22:00Z",
    category: "중고거래",
  },
  {
    _id: "2",
    title: "자전거 팝니다",
    content: "상태 아주 좋고, 가격은 10만원입니다. 직거래 가능해요!",
    author: { nickname: "닉네임2" },
    createdAt: "2025-04-09T15:22:00Z",
    category: "중고거래",
  },
  {
    _id: "2",
    title: "자전거 팝니다",
    content: "상태 아주 좋고, 가격은 10만원입니다. 직거래 가능해요!",
    author: { nickname: "닉네임2" },
    createdAt: "2025-04-09T15:22:00Z",
    category: "중고거래",
  },
  {
    _id: "2",
    title: "자전거 팝니다",
    content: "상태 아주 좋고, 가격은 10만원입니다. 직거래 가능해요!",
    author: { nickname: "닉네임2" },
    createdAt: "2025-04-09T15:22:00Z",
    category: "중고거래",
  },
  {
    _id: "2",
    title: "자전거 팝니다",
    content: "상태 아주 좋고, 가격은 10만원입니다. 직거래 가능해요!",
    author: { nickname: "닉네임2" },
    createdAt: "2025-04-09T15:22:00Z",
    category: "중고거래",
  },
  {
    _id: "2",
    title: "자전거 팝니다",
    content: "상태 아주 좋고, 가격은 10만원입니다. 직거래 가능해요!",
    author: { nickname: "닉네임2" },
    createdAt: "2025-04-09T15:22:00Z",
    category: "중고거래",
  },
];

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
};

const CommunityBoardPage = () => {
  const rawRegion = useParams().region;
  const rawCategory = useParams().category;
  const region = decodeURIComponent(rawRegion as string);
  const category = decodeURIComponent(rawCategory as string);
  return (
    <div className="flex-grow flex-col gap-3 px-4 py-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">
          {region} - {category} 게시판
        </h1>
        <Link
          href={`/community/${region}/${category}/write`}
          className="text-sm bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          글쓰기
        </Link>
      </div>

      <div className="space-y-4">
        {dummyPosts.map((post) => (
          <Link
            key={post._id}
            href={`/community/${region}/${category}/${post._id}`}
            className="block border rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition bg-white"
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

            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {post.content}
            </p>

            <div className="mt-2 text-xs text-orange-500 font-medium inline-block bg-orange-50 px-2 py-0.5 rounded">
              #{post.category}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CommunityBoardPage;
