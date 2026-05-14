import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";

export default function Imprint() {
  return (
    <div className="max-w-5xl mx-auto py-24 md:py-32 px-6 md:px-10">
      <Helmet>
        <title>Impressum | Jacky's Bakery Wien</title>
        <meta name="description" content="Rechtliche Informationen und Offenlegung gemäß Mediengesetz und E-Commerce-Gesetz für Jacky's Bakery." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <h2 className="text-xs uppercase tracking-[0.4em] mb-4 font-bold text-amber-500">Legal</h2>
      <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter mb-12 md:mb-20 italic break-words">IMPRESSUM</h1>
      <div className="space-y-16 text-xl font-light text-white/90 serif italic">
        <section>
          <h2 className="text-amber-500 font-black uppercase mb-6 tracking-[0.3em] text-[10px] border-b border-white/10 pb-2">Offenlegung gemäß § 25 Mediengesetz</h2>
          <div className="space-y-4 text-sm leading-relaxed text-white/80">
            <p>
              <span className="font-bold text-white uppercase tracking-tighter">Inhaberin & Medieninhaberin:</span><br />
              Jacky (Nachname auf Anfrage)<br />
              Hobby-Konditorei & Back-Passion<br />
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Musterstraße+123+1010+Wien+Österreich" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition-colors underline decoration-white/20 underline-offset-4"
              >
                Musterstraße 123, 1010 Wien, Österreich
              </a>
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
          <h2 className="text-amber-500 font-black uppercase mb-6 tracking-[0.3em] text-[10px] border-b border-white/10 pb-2">Informationspflichten gemäß § 5 E-Commerce-Gesetz</h2>
          <div className="space-y-2 text-sm leading-relaxed text-white/80">
            <p className="flex items-center gap-4">
              <span>Telefon: <a href="tel:+43676123456" className="hover:text-amber-500 transition-colors">+43 676 123456</a></span>
              <button onClick={() => { navigator.clipboard.writeText("+43676123456"); alert("Kopiert!"); }} className="text-[9px] uppercase border border-white/10 px-2 py-0.5 rounded hover:bg-white/5 transition-colors">Kopieren</button>
            </p>
            <p className="flex items-center gap-4">
              <span>Email: <a href="mailto:beispiel@gmail.com" className="hover:text-amber-500 transition-colors">beispiel@gmail.com</a></span>
              <button onClick={() => { navigator.clipboard.writeText("beispiel@gmail.com"); alert("Kopiert!"); }} className="text-[9px] uppercase border border-white/10 px-2 py-0.5 rounded hover:bg-white/5 transition-colors">Kopieren</button>
            </p>
            <p>Aufsichtsbehörde: Magistrat Wien</p>
          </div>
        </section>

        <section>
          <h2 className="text-amber-500 font-black uppercase mb-4 tracking-widest text-[10px]">Haftung für Inhalte</h2>
          <p className="text-sm text-white/80">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
        </section>
      </div>
    </div>
  );
}
