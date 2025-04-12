export type PostType = {
  _id: string;
  title: string;
  content: string;
  author: { nickname: string };
  createdAt: string;
  category: string;
  tags: string[];
};
