import { motion } from "motion/react";

export default function Imprint() {
  return (
    <div className="max-w-5xl mx-auto py-32 px-10">
      <h2 className="text-xs uppercase tracking-[0.4em] mb-4 font-bold text-amber-500">Legal</h2>
      <h1 className="text-8xl font-black uppercase tracking-tighter mb-20 italic">IMPRESSUM</h1>
      <div className="space-y-16 text-xl font-light text-white/70 serif italic">
        <section>
          <h2 className="text-white font-black uppercase mb-6 tracking-[0.3em] text-[10px] border-b border-white/10 pb-2">Betreiberin</h2>
          <div className="space-y-1">
            <p className="font-bold text-white not-italic uppercase tracking-tight">Jacky</p>
            <p>Kuchen-Hobby-Bäckerei</p>
            <p>Musterstraße 123</p>
            <p>1010 Wien, Österreich</p>
          </div>
        </section>

        <section>
          <h2 className="text-white font-black uppercase mb-6 tracking-[0.3em] text-[10px] border-b border-white/10 pb-2">Kontakt</h2>
          <div className="space-y-1">
            <p>Telefon: +43 676 123456</p>
            <p>Email: beispiel_email@gmail.com</p>
          </div>
        </section>

        <section>
          <h2 className="text-white font-black uppercase mb-4 tracking-widest text-sm">Haftung für Inhalte</h2>
          <p className="text-sm">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
        </section>
      </div>
    </div>
  );
}
