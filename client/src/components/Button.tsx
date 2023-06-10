export default function Button({
  title,
  onClick,
  variant,
}: {
  title: string;
  onClick: () => void;
  variant: "success" | "error" | "warning" | "primary";
}): JSX.Element {
  let className = [];
  const successClassName = [
    "bg-emerald-100",
    "border-emerald-600",
    "text-emerald-700",
    "hover:bg-emerald-200",
  ];
  const errorClassName = [
    "bg-red-100",
    "border-red-600",
    "text-red-700",
    "hover:bg-red-200",
  ];
  const warningClassName = [
    "bg-orange-100",
    "border-orange-600",
    "text-orange-700",
    "hover:bg-orange-200",
  ];
  const primaryClassName = [
    "bg-sky-100",
    "border-sky-600",
    "text-sky-700",
    "hover:bg-sky-200",
  ];

  switch (variant) {
    case "success":
      className.push(successClassName.join(" "));
      break;
    case "error":
      className.push(errorClassName.join(" "));
      break;
    case "warning":
      className.push(warningClassName.join(" "));
      break;
    case "primary":
      className.push(primaryClassName.join(" "));
      break;
    default:
      break;
  }
  return (
    <button
      onClick={onClick}
      className={`outline-none rounded-lg border font-Roboto-Condensed text-md font-semibold w-full py-2 mt-3 ${className.join(
        " "
      )}`}
    >
      {title}
    </button>
  );
}
