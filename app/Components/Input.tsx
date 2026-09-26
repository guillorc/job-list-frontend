import type { InputHTMLAttributes } from "react";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "type" | "placeholder"
> {
  id: string;
  type: NonNullable<InputHTMLAttributes<HTMLInputElement>["type"]>;
  placeholder: string;
  label: string;
  wrapperClassName: string;
  error?: string;
}

export default function Input({
  id,
  type,
  label,
  placeholder,
  wrapperClassName,
  error,
  name,
  ...props
}: InputProps) {
  return (
    <div className={`flex flex-col ${wrapperClassName}`}>
      <label htmlFor={id}>{label}</label>
      <input
        {...props}
        id={id}
        name={name ?? id}
        type={type}
        placeholder={placeholder}
        className="input w-full my-1.5 focus:outline-offset-1 focus:input-primary"
      />
      {error && <p className="text-error">{error}</p>}
    </div>
  );
}
