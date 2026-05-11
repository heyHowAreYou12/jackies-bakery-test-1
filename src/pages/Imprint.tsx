import { motion } from "motion/react";

export default function Imprint() {
  return (
    <div className="max-w-5xl mx-auto py-32 px-10">
      <h2 className="text-xs uppercase tracking-[0.4em] mb-4 font-bold text-amber-500">Legal</h2>
      <h1 className="text-8xl font-black uppercase tracking-tighter mb-20 italic">IMPRESSUM</h1>
      <div className="space-y-16 text-xl font-light text-white/70 serif italic">
        <section>
          <h2 className="text-white font-black uppercase mb-6 tracking-[0.3em] text-[10px] border-b border-white/10 pb-2">Offenlegung gemäß § 25 Mediengesetz</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              <span className="font-bold text-white uppercase tracking-tighter">Inhaberin & Medieninhaberin:</span><br />
              Jacky (Nachname auf Anfrage)<br />
              Hobby-Konditorei & Back-Passion<br />
              Musterstraße 123, 1010 Wien, Österreich
            </p>
            <p>
              <span className="font-bold text-white uppercase tracking-tighter">Unternehmensgegenstand:</span><br />
              Hobby-Backen und Präsentation kreativer Backwaren. Es handelt sich um ein privates Projekt ohne gewerbliche Gewinnerzielungsabsicht.
            </p>
            <p>
              <span className="font-bold text-white uppercase tracking-tighter">Grundlegende Richtung:</span><br />
              Informationen über handgemachte Backwaren, Rezepte und Einblicke in das Hobby-Backen.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-white font-black uppercase mb-6 tracking-[0.3em] text-[10px] border-b border-white/10 pb-2">Informationspflichten gemäß § 5 E-Commerce-Gesetz</h2>
          <div className="space-y-1 text-sm leading-relaxed">
            <p>Telefon: +43 676 123456</p>
            <p>Email: prokic.nico@gmail.com</p>
            <p>Aufsichtsbehörde: Magistrat Wien</p>
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
