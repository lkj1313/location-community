"use client";

import { useParams } from "next/navigation";
import { useWritePost } from "@/hooks/posts/useWritePost";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import TagList from "@/components/ui/TagList";

const WritePostPage = () => {
  const rawRegion = useParams().region;
  const rawCategory = useParams().category;
  const region = decodeURIComponent(rawRegion as string);
  const category = decodeURIComponent(rawCategory as string);

  const {
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
  } = useWritePost(region, category);

  return (
    <div className="w-96 mx-auto p-6">
      <h1 className="text-xl font-bold mb-6">
        [{region}] {category} 글쓰기
      </h1>

      <div className="space-y-4 ">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="text-sm"
        />

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          className="h-60"
        />
        <div>
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            placeholder="태그를 입력하고 Enter를 누르세요"
            className="text-sm w-64"
          />
          <TagList tags={tags} onRemove={removeTag} />
        </div>

        <Button onClick={handleSubmit} fullWidth>
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default WritePostPage;
