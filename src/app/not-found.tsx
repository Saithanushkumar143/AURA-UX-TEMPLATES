import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-4">
        <Sparkles className="w-6 h-6" />
      </div>
      <h1 className="text-4xl font-extrabold text-white mb-2">404 - Template Not Found</h1>
      <p className="text-sm text-zinc-400 max-w-md mb-6">
        The requested template route could not be located in either the Business or Celebrations folders.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all flex items-center gap-2"
      >
        <span>Aura UX Templates</span>
      </Link>
    </div>
  );
}
