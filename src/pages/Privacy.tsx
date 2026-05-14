import { Helmet } from "react-helmet-async";

export default function Privacy() {
  return (
    <div className="max-w-5xl mx-auto py-24 md:py-32 px-6 md:px-10">
      <Helmet>
        <title>Datenschutz | Jacky's Bakery</title>
        <meta name="description" content="Informationen zum Datenschutz bei Jacky's Bakery." />
      </Helmet>
      <h2 className="text-xs uppercase tracking-[0.4em] mb-4 font-bold text-amber-500">Privacy</h2>
      <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter mb-12 md:mb-20 italic leading-none break-words">DATENSCHUTZ</h1>
      <div className="space-y-16 text-xl font-light text-white/90 serif italic">
        <section>
          <h2 className="text-amber-500 font-black uppercase mb-6 tracking-[0.3em] text-[10px] border-b border-white/10 pb-2">Allgemeine Hinweise</h2>
          <div className="text-sm leading-relaxed text-white/80 space-y-4">
            <p>
              Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003). In diesen Datenschutzinformationen informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.
            </p>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist die im Impressum genannte Inhaberin.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-amber-500 font-black uppercase mb-6 tracking-[0.3em] text-[10px] border-b border-white/10 pb-2">Firebase Hostings & Datenbank</h2>
          <div className="text-sm leading-relaxed text-white/80 space-y-4">
            <p>
              Diese Website wird bei Google Firebase (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) gehostet. 
            </p>
            <p>
              Firebase verarbeitet IP-Adressen und Zugriffsdaten, um die Auslieferung der Seite und die Sicherheit des Dienstes zu gewährleisten. Die Rechtsgrundlage hierfür ist unser berechtigtes Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden nach der technisch notwendigen Dauer gelöscht.
            </p>
          </div>
        </section>
        
        <section>
          <h2 className="text-amber-500 font-black uppercase mb-6 tracking-[0.3em] text-[10px] border-b border-white/10 pb-2">Ihre Rechte</h2>
          <p className="text-sm leading-relaxed text-white/80">
            Ihnen stehen bezüglich Ihrer bei uns gespeicherten Daten grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei uns oder der Datenschutzbehörde beschweren.
          </p>
        </section>
      </div>
    </div>
  );
}
