import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { MenuItem } from "../types";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";

export default function Prices() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "menu_items"), orderBy("category"));
    const unsub = onSnapshot(q, (snapshot) => {
      const fetchedItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MenuItem[];
      setItems(fetchedItems);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const categories = Array.from(new Set(items.map(item => item.category)));

  return (
    <div className="max-w-5xl mx-auto py-24 md:py-32 px-6 md:px-10">
      <Helmet>
        <title>Sortiment & Preise | Jacky's Bakery Wien</title>
        <meta name="description" content="Entdecke das Sortiment von Jacky's Bakery Wien. Ehrliches Handwerk, faire Preise für Torten, Kuchen und individuelle Backwerke für dein Event oder deine Party." />
        <meta property="og:title" content="Sortiment & Preise | Jacky's Bakery Wien" />
        <meta property="og:description" content="Entdecke handgemachte Köstlichkeiten zu fairen Preisen. Von klassischen Torten bis hin zu individuellen Sonderwünschen." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1200&auto=format&fit=crop" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-20 md:mb-32 text-center md:text-left"
      >
        <h2 className="text-xs uppercase tracking-[0.4em] mb-4 font-bold text-amber-500">Selection / Preise</h2>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 italic leading-none break-words">THE PRICE<br />OF PASSION</h1>
        <p className="text-lg serif italic text-white/90 max-w-sm mx-auto md:mx-0">
          Ehrliches Handwerk. Faire Preise. Kein Schnickschnack. Qualität über Quantität.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border border-white/10 border-t-amber-500 rounded-full animate-spin"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-40 border border-dashed border-white/10 flex flex-col items-center justify-center gap-6">
          <p className="text-white/80 uppercase font-black tracking-[0.3em] text-xs">Die Backstube wird gerade vorbereitet.</p>
          <Link to="/admin" className="text-[10px] bg-white text-black px-6 py-2 font-black uppercase tracking-widest hover:bg-amber-500 transition-all">
            Katalog befüllen
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-x-20 gap-y-32">
          {categories.map(category => (
            <div key={category} className="space-y-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 border-b border-white/10 pb-4">
                {category}
              </h2>
              <ul className="space-y-12">
                {items.filter(item => item.category === category).map(item => (
                  <li key={item.id} className="group flex flex-col md:flex-row md:items-center gap-6 border-b border-white/5 pb-8 transition-all hover:border-amber-500/30">
                      <div className="flex-1 flex justify-between items-baseline gap-4">
                        <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter group-hover:text-amber-500 transition-colors italic break-words">
                          {item.name}
                        </span>
                      <span className="font-mono text-xl text-amber-500">
                        {item.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}


      <div className="mt-32 p-6 sm:p-12 bg-white text-black text-center md:skew-x-[-2deg]">
        <h3 className="text-2xl sm:text-4xl font-black uppercase mb-4 tracking-tighter break-words leading-none">Sonderwünsche?</h3>
        <p className="text-sm sm:text-lg font-bold uppercase tracking-widest mb-10 opacity-90">
          Ich backe auch individuell für deine Events, Partys oder einfach nur für dich.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center md:items-start gap-8 sm:gap-12">
          <div className="text-base sm:text-xl font-black tabular-nums group">
            <span className="block opacity-70 font-bold text-xs uppercase tracking-widest mb-2">Telefon:</span>
            <div className="flex flex-col items-center md:items-start gap-2">
              <a href="tel:+43676123456" className="hover:text-amber-600 transition-colors">
                +43 676 123456
              </a>
              <button 
                onClick={() => { navigator.clipboard.writeText("+43676123456"); alert("Kopiert!"); }}
                className="text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-50 transition-opacity"
              >
                [Kopieren]
              </button>
            </div>
          </div>
          <div className="text-base sm:text-xl font-black tabular-nums group">
            <span className="block opacity-70 font-bold text-xs uppercase tracking-widest mb-2">Email:</span>
            <div className="flex flex-col items-center md:items-start gap-2">
              <a href="mailto:beispiel@gmail.com" className="hover:text-amber-600 transition-colors">
                beispiel@gmail.com
              </a>
              <button 
                onClick={() => { navigator.clipboard.writeText("beispiel@gmail.com"); alert("Kopiert!"); }}
                className="text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-50 transition-opacity"
              >
                [Kopieren]
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
