import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-fluid flex min-h-[80vh] flex-col justify-center">
      <p className="text-mono-sm text-[#38BDF8]">404 / Route not found</p>
      <h1 className="text-display-1 mt-6 text-balance">
        Nothing <span className="italic text-[#38BDF8]">here</span> yet.
      </h1>
      <p className="mt-6 max-w-prose text-[#94a3b8]">
        The page you were looking for has wandered off. Head back to the index.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex w-fit items-center gap-2 border border-white px-5 py-3 text-sm font-medium hover:bg-white hover:text-[#050816] transition-colors"
      >
        ← Back to home
      </Link>
    </div>
  );
}