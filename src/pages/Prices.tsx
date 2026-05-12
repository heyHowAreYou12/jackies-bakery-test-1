import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { MenuItem } from "../types";
import { motion } from "motion/react";

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
                    {item.imageUrl && (
                      <div className="w-full md:w-32 aspect-square overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    )}
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
        <p className="text-sm sm:text-lg font-bold uppercase tracking-widest mb-8 opacity-90">
          Ich backe auch individuell für deine Events, Partys oder einfach nur für dich.
        </p>
        <div className="text-base sm:text-xl font-black tabular-nums">
          <span className="block sm:inline opacity-70 font-bold text-xs uppercase tracking-widest mb-2 sm:mb-0 sm:mr-4">Frag einfach nach:</span>
          +43 676 123456
        </div>
      </div>
    </div>
  );
}
