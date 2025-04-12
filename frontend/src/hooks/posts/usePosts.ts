import { useQuery } from "@tanstack/react-query";
import { PostType } from "@/types/posts";

const fetchPosts = async (
  region: string,
  category: string
): Promise<PostType[]> => {
  const res = await fetch(
    `http://localhost:4000/api/posts?region=${region}&category=${category}`
  );
  if (!res.ok) throw new Error("게시글을 불러오지 못했습니다.");
  return res.json();
};

export const usePosts = (region: string, category: string) => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<PostType[]>({
    queryKey: ["posts", region, category],
    queryFn: () => fetchPosts(region, category),
  });

  return { posts: data, isLoading, isError };
};
