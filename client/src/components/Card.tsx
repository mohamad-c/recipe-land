export default function Card({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}): JSX.Element {
  return (
    <div className="container w-96 border rounded-2xl border-gray-200 px-5 py-5 shadow shadow-gray-100">
      <h4 className="font-bold text-3xl pb-1 font-Roboto-Condensed">{title}</h4>
      <p className="font-medium text-sm pb-5 text-gray-400 font-poppins">
        {description}
      </p>
      {children}
      <p className="font-medium text-sm pt-5 text-center text-gray-400 font-poppins">
        Already have an account?{" "}
        <span className="font-medium text-sm pb-10 text-blue-500 font-poppins">
          Login
        </span>
      </p>
    </div>
  );
}
