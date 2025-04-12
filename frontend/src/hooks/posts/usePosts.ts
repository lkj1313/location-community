import { useInfiniteQuery } from "@tanstack/react-query";
import { PostType } from "@/types/posts";

const LIMIT = 5;

const fetchPosts = async ({
  region,
  category,
  pageParam,
}: {
  region: string;
  category: string;
  pageParam: number;
}): Promise<PostType[]> => {
  const res = await fetch(
    `http://localhost:4000/api/posts?region=${region}&category=${category}&page=${pageParam}&limit=${LIMIT}`
  );
  if (!res.ok) throw new Error("게시글을 불러오지 못했습니다.");
  return res.json();
};

export const usePosts = (region: string, category: string) => {
  return useInfiniteQuery<PostType[]>({
    queryKey: ["posts", region, category],
    queryFn: async (context) => {
      const page = (context.pageParam as number) ?? 1;
      return fetchPosts({ region, category, pageParam: page });
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < LIMIT ? undefined : allPages.length + 1,
    initialPageParam: 1,
  });
};
