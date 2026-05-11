export default function Privacy() {
  return (
    <div className="max-w-5xl mx-auto py-32 px-10">
      <h2 className="text-xs uppercase tracking-[0.4em] mb-4 font-bold text-amber-500">Privacy</h2>
      <h1 className="text-8xl font-black uppercase tracking-tighter mb-20 italic leading-none">DATENSCHUTZ</h1>
      <div className="space-y-16 text-xl font-light text-white/70 serif italic">
        <section>
          <h2 className="text-white font-black uppercase mb-6 tracking-[0.3em] text-[10px] border-b border-white/10 pb-2">Allgemeine Hinweise</h2>
          <p className="text-sm leading-relaxed mb-4">
            Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003). In diesen Datenschutzinformationen informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.
          </p>
          <p className="text-sm leading-relaxed">
            Verantwortlich für die Datenverarbeitung auf dieser Website ist die im Impressum genannte Inhaberin.
          </p>
        </section>

        <section>
          <h2 className="text-white font-black uppercase mb-6 tracking-[0.3em] text-[10px] border-b border-white/10 pb-2">Firebase Hostings & Datenbank</h2>
          <p className="text-sm leading-relaxed italic mb-4">
            Diese Website wird bei Google Firebase (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) gehostet. 
          </p>
          <p className="text-sm leading-relaxed">
            Firebase verarbeitet IP-Adressen und Zugriffsdaten, um die Auslieferung der Seite und die Sicherheit des Dienstes zu gewährleisten. Die Rechtsgrundlage hierfür ist unser berechtigtes Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden nach der technisch notwendigen Dauer gelöscht.
          </p>
        </section>
        
        <section>
          <h2 className="text-white font-black uppercase mb-6 tracking-[0.3em] text-[10px] border-b border-white/10 pb-2">Ihre Rechte</h2>
          <p className="text-sm leading-relaxed">
            Ihnen stehen bezüglich Ihrer bei uns gespeicherten Daten grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei uns oder der Datenschutzbehörde beschweren.
          </p>
        </section>
      </div>
    </div>
  );
}
