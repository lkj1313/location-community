import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import useDarkMode from "@/store/darkModeStroe";

type Props = {
  comment: string;
  setComment: (value: string) => void;
  handleSubmit: () => void;
};

export default function CommentForm({
  comment,
  setComment,
  handleSubmit,
}: Props) {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="mt-10">
      <h3
        className={`text-lg font-semibold mb-2 ${
          isDarkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        댓글
      </h3>

      <Textarea
        placeholder="댓글을 입력하세요"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Button
        onClick={handleSubmit}
        className="mt-2"
        variant="primary"
        fullWidth={false}
      >
        등록
      </Button>
    </div>
  );
}
