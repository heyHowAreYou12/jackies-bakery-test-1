import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-6"
        >
          <div className="max-w-4xl mx-auto bg-black border border-white/10 p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xs uppercase tracking-[0.4em] mb-4 font-bold text-amber-500">Cookie Hinweis</h3>
              <p className="text-sm font-light text-white/70 serif italic leading-relaxed">
                Wir verwenden Cookies, um die Website-Funktionalität sicherzustellen. Durch die Nutzung der Website stimmst du der Verwendung von technisch notwendigen Cookies zu. Mehr Infos findest du in unserer <Link to="/datenschutz" className="text-white underline underline-offset-4 decoration-amber-500/50">Datenschutzerklärung</Link>.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={acceptCookies}
                className="bg-white text-black px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-amber-500 transition-all whitespace-nowrap"
              >
                Einverstanden
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
