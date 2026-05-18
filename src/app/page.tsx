"use client";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { useState } from "react";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export default function Page() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSuccess(true);
        setEmail("");
      } else {
        const data = await res.json();
        setError(data.error || "Fehler beim Eintragen.");
      }
    } catch (err) {
      setError("Netzwerkfehler. Bitte später erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className={`${geistSans.className} min-h-screen md:h-screen w-full overflow-x-hidden overflow-y-auto md:overflow-hidden bg-[#050505] text-white selection:bg-white selection:text-black`}
    >
      {/* High-end ambient lighting background */}
      <div className="pointer-events-none fixed inset-0 -z-10 flex justify-center">
        <div className="absolute top-0 h-[800px] w-full max-w-4xl bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.06),rgba(255,255,255,0))] opacity-80" />
        <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-white/5 blur-[120px]" />
      </div>

      <section className="mx-auto flex min-h-screen md:min-h-0 md:h-full w-full max-w-5xl flex-col items-center justify-center px-6 py-12 text-center">
        
        {/* Eyebrow */}
        <p className="mb-8 text-xs font-light tracking-[0.4em] uppercase text-zinc-500">
          schlafschaf.co
        </p>

        {/* Headline with Serif Font */}
        <h1 className={`${playfair.className} max-w-4xl text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-zinc-100 leading-[1.1]`}>
          Ein
          <span className="inline-flex align-baseline mx-3 sm:mx-5" aria-label="Wecker">
            <img 
              src="/wecker.png" 
              alt="Wecker" 
              className="inline h-[0.85em] w-auto aspect-square object-contain translate-y-[-0.08em] drop-shadow-[0_15px_25px_rgba(255,255,255,0.08)]" 
            />
          </span>
          für ruhigere <br className="hidden md:block" />
          <span className="italic text-zinc-300">Morgen.</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-8 max-w-xl text-base sm:text-lg text-zinc-400 font-light leading-relaxed tracking-wide">
          Minimalistisch. Hochwertig. <br className="sm:hidden" /> Bald auf deinem Nachttisch.
        </p>

        {/* Waitlist Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 flex w-full max-w-md flex-col sm:flex-row gap-2 rounded-full p-1.5 bg-[#0a0a0a]/80 border border-[#222] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-500 hover:border-[#333] focus-within:border-[#555] focus-within:bg-[#111]"
        >
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="deine@email.de"
            className="flex-1 h-12 bg-transparent px-6 text-sm sm:text-base outline-none placeholder:text-zinc-600 font-light text-zinc-200"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />

          <button
            type="submit"
            className="h-12 rounded-full bg-zinc-100 px-7 text-sm font-medium text-black transition-all duration-300 hover:bg-white hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3 tracking-wide"
            disabled={loading}
          >
            {loading ? "Eintragen..." : "Warteliste"}
            {!loading && (
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
               </svg>
            )}
          </button>
        </form>

        {/* Feedback Messages */}
        <div className="mt-8 h-10">
          {success && (
            <p className="text-xs font-light tracking-wide text-zinc-400 bg-[#111] border border-[#222] px-6 py-3 rounded-full animate-in fade-in slide-in-from-bottom-2 duration-500">
              Danke. Du wurdest zur Liste hinzugefügt.
            </p>
          )}
          {error && (
            <p className="text-xs font-light tracking-wide text-red-200/70 bg-red-950/20 border border-red-900/30 px-6 py-3 rounded-full animate-in fade-in slide-in-from-bottom-2 duration-500">
              {error}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}