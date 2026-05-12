import { motion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { BakerySettings } from "../types";

export default function Home() {
  const [settings, setSettings] = useState<BakerySettings | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "bakery"), (doc) => {
      if (doc.exists()) {
        setSettings(doc.data() as BakerySettings);
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen grid grid-cols-12 gap-0 overflow-hidden border-b border-white/10">
        <div className="col-span-12 md:col-span-7 p-10 md:p-20 flex flex-col justify-between relative z-10 text-center md:text-left items-center md:items-start">
          <div>
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-[16vw] md:text-[140px] leading-[0.8] font-black uppercase tracking-tighter mb-8 italic break-words"
            >
              JACKY'S<br/><span className="text-amber-500">BAKERY</span>
            </motion.h1>
            <p className="text-lg md:text-2xl leading-relaxed text-white/90 max-w-md font-light serif italic mx-auto md:mx-0">
              Handgemachte Leidenschaft aus Wien. Keine Prinzessinnen-Torten, sondern echtes Handwerk mit Charakter.
            </p>
          </div>

          {settings?.cakeOfTheDay && (
            <motion.div 
              initial={{ rotate: -2, y: 20, opacity: 0 }}
              animate={{ rotate: -2, y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-amber-600 p-6 md:p-8 text-black transform -rotate-2 max-w-sm mt-8 md:mt-0"
            >
              <span className="block text-[10px] uppercase font-bold tracking-widest mb-2 opacity-70">Cake of the Day</span>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight break-words">{settings.cakeOfTheDay}</h2>
              <p className="text-xs font-bold mt-4 uppercase tracking-widest flex items-center gap-2">
                <Star className="w-3 h-3 fill-black" /> Jetzt in der Backstube
              </p>
            </motion.div>
          )}
        </div>

        <div className="hidden md:block md:col-span-5 relative border-l border-white/10">
          <img 
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2689&auto=format&fit=crop" 
            alt="Hero Cake" 
            className="w-full h-full object-cover grayscale brightness-50 contrast-125"
          />
          <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay"></div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 md:py-40 px-6 md:px-10 border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          <div className="lg:col-span-4 flex flex-col justify-end pb-4 lg:pb-10 text-center lg:text-left items-center lg:items-start">
            <h2 className="text-xs uppercase tracking-[0.4em] mb-4 md:mb-8 font-bold text-amber-500">The Baker</h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] italic break-words">
              AUTHENTISCH.<br />WILD.<br />LECKER.
            </h3>
          </div>
          
          <div className="lg:col-span-4 aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-white/10 max-w-sm mx-auto w-full">
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2670&auto=format&fit=crop" 
              alt="Jacky Baking" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center space-y-6 md:space-y-8 text-base md:text-lg leading-relaxed font-light text-white/90 serif italic text-center lg:text-left items-center lg:items-start">
            <p>
              Hi, ich bin Jacky. 31 Jahre alt, leidenschaftliche Hobby-Bäckerin und Herzschlag des Sweet Buns Clubs. 
            </p>
            <p>
              Ich liebe das Leben, gute Musik und echtes Essen. Bei mir gibt es keinen rosa Prinzessinnen-Kitsch. Meine Backstube ist mein Ort für Leidenschaft und Handwerk.
            </p>
            <Link to="/ueber-mich" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-amber-500 hover:text-white transition-all pt-4">
              Mehr Story <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>


      {/* Grid Gallery */}
      <section className="py-20 grid grid-cols-2 md:grid-cols-4 border-y border-white/10">
        {[
          "https://images.unsplash.com/photo-1544070078-a212eda27b49?q=80&w=2670&auto=format&fit=crop", // Muffin
          "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=2564&auto=format&fit=crop", // Cookie
          "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=2670&auto=format&fit=crop", // Cupcake
          "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=2574&auto=format&fit=crop"  // Chocolate cake
        ].map((img, i) => (
          <div key={i} className="aspect-square overflow-hidden border-r last:border-0 border-white/10 group">
             <img 
              src={img} 
              alt={`Gallery ${i}`} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 cursor-crosshair"
            />
          </div>
        ))}
      </section>

      {/* Contact Section */}
      <section className="py-24 md:py-40 px-6 md:px-10 border-b border-white/10 bg-amber-500/[0.02]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-xs uppercase tracking-[0.4em] mb-12 font-bold text-amber-500">Kontakt</h2>
          
          <div className="grid md:grid-cols-2 gap-16 md:gap-32 w-full">
            <div className="space-y-12">
              <a href="tel:+43676123456" className="block group">
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-4 font-bold">Direkt Anrufen</p>
                <p className="text-2xl sm:text-4xl md:text-6xl font-black group-hover:text-amber-500 transition-colors tracking-tighter tabular-nums break-all">+43 676 123456</p>
              </a>
              
              <a href="mailto:beispiel_email@gmail.com" className="block group">
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-4 font-bold">Schreib mir</p>
                <p className="text-xl sm:text-3xl md:text-5xl font-black group-hover:text-amber-500 transition-colors tracking-tighter break-all">beispiel_email@gmail.com</p>
              </a>
            </div>

            <div className="flex flex-col justify-center items-center md:items-start space-y-8">
              <div className="text-left w-full max-w-sm">
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-4 font-bold text-center md:text-left">The Social Club</p>
                <div className="flex justify-center md:justify-start">
                  <a href="#" className="flex items-center gap-4 text-2xl font-black uppercase tracking-tighter hover:text-amber-500 transition-colors">
                    Instagram <ArrowRight />
                  </a>
                </div>
              </div>
              <p className="text-sm serif italic opacity-90 max-w-xs text-center md:text-left">
                Ich antworte so schnell wie möglich. Wenn ich gerade backe, dauert es vielleicht einen Moment länger.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
