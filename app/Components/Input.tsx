import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: string;
  label: string;
  placeholder: string;
}

export default function Input({ id, type, label, placeholder }: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="input w-full my-1.5 focus:outline-offset-1"
      />
      <p className="text-error"></p>
    </div>
  );
}
