import { motion } from "motion/react";
import { Instagram, Mail, Phone, Heart, Dog, Music } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto py-24 md:py-32 px-6 md:px-10">
      <div className="grid lg:grid-cols-12 gap-16 md:gap-20 items-start">
        {/* Visual Side */}
        <div className="lg:col-span-5 sticky top-32 space-y-8 hidden md:block">
          <motion.div 
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="aspect-[3/4] bg-neutral-900 border border-white/10 relative group grayscale hover:grayscale-0 transition-all duration-1000"
          >
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" 
              alt="Jacky Portrait" 
              className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay"></div>
            <div className="absolute bottom-10 left-10">
              <p className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.4em] mb-2">Original Baker</p>
              <p className="text-7xl font-black uppercase tracking-tighter italic leading-none">JACKY</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-1 px-4">
             <div className="flex flex-col items-center justify-center gap-2 aspect-square text-center border border-white/5 opacity-40 hover:opacity-100 transition-opacity">
              <Heart className="w-5 h-5 text-amber-500" />
              <span className="text-[8px] font-black uppercase tracking-widest">Passion</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 aspect-square text-center border border-white/5 opacity-40 hover:opacity-100 transition-opacity">
              <Dog className="w-5 h-5 text-amber-500" />
              <span className="text-[8px] font-black uppercase tracking-widest">Animals</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 aspect-square text-center border border-white/5 opacity-40 hover:opacity-100 transition-opacity">
              <Music className="w-5 h-5 text-amber-500" />
              <span className="text-[8px] font-black uppercase tracking-widest">Vibes</span>
            </div>
          </div>
        </div>

        {/* Story Side */}
        <div className="lg:col-span-7 space-y-16 md:space-y-24 text-center md:text-left items-center md:items-start flex flex-col">
          <section className="w-full">
            <h2 className="text-xs uppercase tracking-[0.4em] mb-4 md:mb-8 font-bold text-amber-500">About Me</h2>
            <h1 className="text-6xl md:text-[120px] font-black uppercase tracking-tighter mb-8 md:mb-12 leading-[0.8] italic">
              ECHT.<br />ROH.<br /><span className="text-amber-500">BACKEN.</span>
            </h1>
            
            <div className="md:hidden aspect-[3/4] mb-12 relative grayscale border border-white/10 mx-auto w-full max-w-xs">
               <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" 
                alt="Jacky" 
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute bottom-6 left-6 text-left">
                <p className="text-5xl font-black uppercase tracking-tighter italic leading-none">JACKY</p>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8 text-lg md:text-2xl text-white/70 leading-relaxed font-light serif italic max-w-2xl mx-auto md:mx-0">
              <p>
                Mit 31 Jahren stehe ich mitten im Leben — und meistens in der Küche. Backen ist für mich mehr als nur Teig rühren. Es ist Fokus, Kreativität und am Ende pure Zufriedenheit.
              </p>
              <p>
                Ich bin ein unkomplizierter Mensch. Ich liebe es, Menschen zuzuhören, wenn sie eine gute Story haben. Ich mag keine Oberflächlichkeit und erst recht keinen Kitsch.
              </p>
            </div>
          </section>

          <section className="p-16 border border-amber-500/20 relative bg-amber-500/[0.02]">
            <h2 className="text-xs uppercase font-black mb-10 tracking-[0.3em] flex items-center gap-4 text-amber-500">
              <StarIcon /> Manifesto
            </h2>
            <ul className="space-y-6 text-xl font-bold uppercase tracking-tight italic">
              <li className="flex items-baseline gap-6 border-b border-white/5 pb-4">
                <span className="text-[10px] font-mono opacity-30 tracking-normal non-italic">01</span> Ich liebe es zu Essen. Wer nicht?
              </li>
              <li className="flex items-baseline gap-6 border-b border-white/5 pb-4">
                <span className="text-[10px] font-mono opacity-30 tracking-normal non-italic">02</span> Tiere sind oft die besseren Menschen.
              </li>
              <li className="flex items-baseline gap-6 border-b border-white/5 pb-4">
                <span className="text-[10px] font-mono opacity-30 tracking-normal non-italic">03</span> Qualität über Quantität — immer.
              </li>
            </ul>
          </section>

          <section className="grid md:grid-cols-2 gap-12 pt-10 border-t border-white/10">
            <div>
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20 mb-8">Contact Details</h2>
              <div className="space-y-8">
                <a href="tel:+43676123456" className="block group">
                  <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1 font-bold">Call directly</p>
                  <p className="text-3xl font-black group-hover:text-amber-500 transition-colors tracking-tighter tabular-nums">+43 676 123456</p>
                </a>
                
                <a href="mailto:beispiel_email@gmail.com" className="block group">
                  <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1 font-bold">Drop an email</p>
                  <p className="text-3xl font-black group-hover:text-amber-500 transition-colors tracking-tighter break-all">beispiel_email@gmail.com</p>
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <p className="text-[9px] uppercase tracking-[0.4em] font-black mb-4">The Social Club</p>
              <div className="flex gap-4">
                <a href="#" className="p-4 border border-white/10 hover:bg-amber-600 hover:text-black hover:border-amber-600 transition-all rounded-full"><Instagram size={20} /></a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

  );
}

function StarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.5921 9.40789L24 12L14.5921 14.5921L12 24L9.40789 14.5921L0 12L9.40789 9.40789L12 0Z" />
    </svg>
  );
}
