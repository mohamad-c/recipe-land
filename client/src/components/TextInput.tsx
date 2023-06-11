import { useState } from "react";

interface TextInputProps {
  label: string;
  model: any;
  id: string;
  name: string;
  error?: boolean;
  errorMessage?: React.ReactNode | undefined;
}

export default function TextInput({
  label,
  model,
  id,
  name,
  error,
  errorMessage
}: TextInputProps): JSX.Element {
  const [value, setValue] = useState<string>();
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    model[id] = e.target.value;
  };
  const inputClassName = [
    "border",
    "border-solid",
    "border-stone-200",
    "rounded-lg",
    "py-2",
    "px-5",
    "focus:outline-zinc-400",
    "font-Roboto-Condensed",
    "font-medium",
  ];

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="flex justify-start font-medium text-zinc-600 text-sm pb-1 font-poppins"
      >
        {label}
      </label>
      <input
        onChange={inputHandler}
        id={id}
        value={value}
        name={name}
        className={
          error ? `${inputClassName.join(" ")} border-2 border-rose-500 bg-rose-50 focus:outline-rose-600`: inputClassName.join(" ")
        }
      />
      <p className="text-xs font-Roboto-Condensed mb-3 pt-1 text-rose-800 font-semibold">{errorMessage}</p>
    </div>
  );
}
