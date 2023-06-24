export default function Card({
  children,
  title,
  description,
  cardFooter,
  footerTitle,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  cardFooter?: React.ReactNode;
  footerTitle?: string;
}): JSX.Element {
  return (
    <div className="container w-96 border rounded-2xl bg-white border-zinc-300 px-5 py-5 shadow-sm dark:shadow-none shadow-gray-100 dark:border-zinc-500 dark:bg-zinc-700">
      <h4 className="font-bold text-3xl pb-1 font-Roboto-Condensed  dark:text-gray-100">{title}</h4>
      <p className="font-medium text-sm pb-5 text-gray-400 font-poppins">
        {description}
      </p>
      {children}
      <p className="font-medium text-sm pt-5 text-center text-gray-400 font-poppins">
        {footerTitle} <span>{cardFooter}</span>
      </p>
    </div>
  );
}
