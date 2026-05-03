export default function Privacy() {
  return (
    <div className="max-w-5xl mx-auto py-32 px-10">
      <h2 className="text-xs uppercase tracking-[0.4em] mb-4 font-bold text-amber-500">Privacy</h2>
      <h1 className="text-8xl font-black uppercase tracking-tighter mb-20 italic leading-none">DATENSCHUTZ</h1>
      <div className="space-y-16 text-xl font-light text-white/70 serif italic">
        <section>
          <h2 className="text-white font-black uppercase mb-6 tracking-[0.3em] text-[10px] border-b border-white/10 pb-2">Datenschutz auf einen Blick</h2>
          <p className="text-sm leading-relaxed">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>
        </section>

        <section>
          <h2 className="text-white font-black uppercase mb-6 tracking-[0.3em] text-[10px] border-b border-white/10 pb-2">Datenerfassung</h2>
          <p className="text-sm italic leading-relaxed">
            Wir erfassen keine Cookies oder Daten, außer jene, die Sie uns aktiv übermitteln (z.B. bei einer Bestellung oder Anfrage per Telefon/Email). Die Nutzung dieser Website ist grundsätzlich ohne Angabe personenbezogener Daten möglich.
          </p>
        </section>

        <section>
          <h2 className="text-white font-black uppercase mb-6 tracking-[0.3em] text-[10px] border-b border-white/10 pb-2">Technologie</h2>
          <p className="text-sm leading-relaxed">
            Diese Seite nutzt Firebase von Google für die Darstellung dynamischer Inhalte. Dabei werden IP-Adressen und Zugriffszeiten kurzzeitig verarbeitet, um die Sicherheit und Funktionsfähigkeit des Dienstes zu gewährleisten.
          </p>
        </section>
      </div>
    </div>
  );
}
