import { useState } from "react";

interface TextInputProps {
  label: string;
  model: any;
  id: string;
}

export default function TextInput({
  label,
  model,
  id,
}: TextInputProps): JSX.Element {
  const [value, setValue] = useState<string>();
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    model[id] = e.target.value;
  };
  console.log(model);
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
        className="border border-solid border-stone-200 rounded-lg mb-3 py-2 px-5 focus:outline-zinc-400 font-Roboto-Condensed font-medium"
      />
    </div>
  );
}
