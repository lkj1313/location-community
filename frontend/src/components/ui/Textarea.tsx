import { TextareaHTMLAttributes, forwardRef } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full  border rounded px-4 py-2 text-sm resize-none focus:outline-none focus:ring focus:border-orange-400 ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
