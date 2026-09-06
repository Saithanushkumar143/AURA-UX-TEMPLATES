import Link from "next/link";
import { ShieldAlert, KeyRound } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center p-6 text-center selection:bg-purple-500 selection:text-white">
      <div className="w-14 h-14 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mb-4 shadow-inner">
        <ShieldAlert className="w-7 h-7" />
      </div>
      <h1 className="text-3xl font-extrabold text-white mb-2">404 - Not Found</h1>
      <p className="text-xs text-zinc-400 max-w-md mb-6 leading-relaxed">
        The requested resource was not found. Administrative authorization is required to access system tools.
      </p>
      <div>
        <Link
          href="/admin/login"
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all inline-flex items-center gap-2 shadow-lg shadow-purple-600/25"
        >
          <KeyRound className="w-4 h-4" />
          <span>Admin Passcode Gate</span>
        </Link>
      </div>
    </div>
  );
}
