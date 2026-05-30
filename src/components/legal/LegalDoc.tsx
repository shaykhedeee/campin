import { Link } from "react-router-dom";

interface LegalDocProps {
  title: string;
  updatedAt?: string;
  markdown: string;
}

export default function LegalDoc({ title, updatedAt, markdown }: LegalDocProps) {
  return (
    <div className="min-h-screen bg-offwhite pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm sm:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-orange">Legal</p>
              <h1 className="mt-2 text-3xl font-extrabold text-forest sm:text-4xl">{title}</h1>
              {updatedAt ? <p className="mt-2 text-sm text-textgrey">Draft version: {updatedAt}</p> : null}
            </div>
            <Link to="/support" className="text-sm font-bold text-forest hover:text-orange">
              Need help? Contact support
            </Link>
          </div>

          <div className="mt-8 rounded-xl bg-offwhite p-5">
            <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-forest">{markdown.trim()}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

