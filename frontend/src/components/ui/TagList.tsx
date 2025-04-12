type TagListProps = {
  tags: string[];
  onRemove?: (tag: string) => void;
};

export default function TagList({ tags, onRemove }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm flex items-center gap-1"
        >
          #{tag}
          {onRemove && (
            <button
              onClick={() => onRemove(tag)}
              className="text-xs text-orange-500 hover:text-orange-700"
            >
              ✕
            </button>
          )}
        </span>
      ))}
    </div>
  );
}
