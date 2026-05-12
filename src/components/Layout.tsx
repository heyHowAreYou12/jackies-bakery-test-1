import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Cake, Info, CreditCard, Shield, FileText, Menu, X, Instagram } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Start", path: "/", icon: <Cake className="w-4 h-4" /> },
    { name: "Über mich", path: "/ueber-mich", icon: <Info className="w-4 h-4" /> },
    { name: "Preise", path: "/preise", icon: <CreditCard className="w-4 h-4" /> },
  ];

  const footerItems = [
    { name: "Impressum", path: "/impressum" },
    { name: "Datenschutz", path: "/datenschutz" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 uppercase font-bold tracking-[0.2em] text-[10px]">
        <div className="max-w-7xl mx-auto px-10 h-20 flex items-center justify-between">
          <Link to="/" className="text-xs font-black uppercase tracking-[0.3em] text-amber-500 hover:text-white transition-colors">
            Sweet Buns Club <span className="text-white">/</span> Jacky's Bakery
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`hover:text-amber-500 transition-colors ${
                  location.pathname === item.path ? "text-amber-500" : "text-white/80"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 hover:bg-white/5 rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>


      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-8"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-black uppercase tracking-tighter hover:text-amber-500"
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setIsMenuOpen(false)}
            className="text-xl font-bold uppercase tracking-widest text-white/70 hover:text-amber-500 transition-colors mt-8"
          >
            Admin Login
          </Link>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="mt-8 p-4 bg-white text-black font-bold uppercase tracking-widest"
          >
            Schließen
          </button>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="pt-20">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-40 border-t border-white/10 py-16 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12 text-center md:text-left">
          <div className="max-w-sm flex flex-col items-center md:items-start">
            <h3 className="font-black uppercase text-xs tracking-widest text-amber-500 mb-4">Sweet Buns Club</h3>
            <p className="text-white/70 text-sm leading-relaxed serif italic">
              Keine Prinzessinnen-Torten, sondern echtes Handwerk mit Charakter. Jacky's Bakery ist für alle, die das Leben intensiv lieben.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-500 mb-2">Legal</h4>
            {footerItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="text-[10px] uppercase tracking-widest font-bold text-white/80 hover:text-amber-500 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4 items-center md:items-start">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-500 mb-2">Social</h4>
            <a href="#" className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-white/80 hover:text-amber-500 transition-colors">
              <Instagram size={14} /> Instagram
            </a>
          </div>
        </div>
        <div className="text-center mt-24 opacity-40 text-[9px] uppercase tracking-[0.4em]">
          &copy; {new Date().getFullYear()} Jacky's Bakery Vienna. Built for the wild ones.
        </div>
      </footer>
    </div>
  );
}
