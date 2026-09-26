import type { SelectHTMLAttributes } from "react";

interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "id" | "placeholder"
> {
  id: string;
  placeholder: string;
  label: string;
  wrapperClassName: string;
  error?: string;
}

export default function Select({
  id,
  label,
  placeholder,
  wrapperClassName,
  error,
  name,
  children,
  ...props
}: SelectProps) {
  return (
    <div className={`flex flex-col ${wrapperClassName}`}>
      <label htmlFor={id}>{label}</label>
      <select
        {...props}
        id={id}
        name={name ?? id}
        className="select w-full my-1.5 focus:outline-offset-1 focus:select-primary open:outline-offset-1 open:select-primary"
        defaultValue=""
      >
        <option value="" disabled={true}>
          {placeholder}
        </option>
        {children}
      </select>
      {error && <p className="text-error">{error}</p>}
    </div>
  );
}
