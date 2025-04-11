import { InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, id, ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block mb-2 text-sm font-medium">
          {label}
        </label>
      )}
      <input
        {...props}
        id={id}
        className={`w-full border border-gray-500! px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition   placeholder-gray-400 ${
          props.className || ""
        }`}
      />
    </div>
  );
}
