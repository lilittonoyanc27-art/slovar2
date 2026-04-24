import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Volume2, 
  ThumbsUp, 
  Sparkles, 
  MessageCircle, 
  Info,
  ChevronDown,
  ChevronUp,
  MapPin,
  Search,
  Zap
} from 'lucide-react';

// --- Types ---

interface Phrase {
  es: string;
  hy: string;
  nuance: string;
  examples?: { es: string; hy: string }[];
}

// --- Data ---

const PHRASES: Phrase[] = [
  { 
    es: "Por supuesto", 
    hy: "Իհարկե / Միանշանակ", 
    nuance: "Շատ վստահ համաձայնություն" 
  },
  { 
    es: "Claro", 
    hy: "Պարզ է / Հասկանալի է / Իհարկե", 
    nuance: "Ամենատարածված ձևն է" 
  },
  { 
    es: "Venga", 
    hy: "Դե լավ / Դե եկ / Այո՛ (հորդոր)", 
    nuance: "Օգտագործվում է նաև խոսակցությունը առաջ մղելու համար" 
  },
  { 
    es: "Cómo no", 
    hy: "Ինչո՞ւ ոչ / Սիրով", 
    nuance: "Երբ ինչ-որ մեկին ուզում ես հաճույքով օգնել" 
  },
  { 
    es: "Aja", 
    hy: "Ահա / Հը-հը", 
    nuance: "Հաստատող ձայնարկություն (ոչ ֆորմալ)" 
  },
  { 
    es: "¿Por qué no?", 
    hy: "Ինչո՞ւ ոչ:", 
    nuance: "Երբ առաջարկին դրական ես պատասխանում" 
  },
  { 
    es: "Vale", 
    hy: "Եղա՛վ / Լա՛վ", 
    nuance: "Իսպանական ամենահայտնի «OK»-ն",
    examples: [
        { es: "Nos vemos más tarde, ¿vale?", hy: "1. Պայմանավորվելու համար: Կտեսնվենք ավելի ուշ, օքե՞յ / լա՞վ:" },
        { es: "Vale, nos vemos más tarde.", hy: "2. Համաձայնելու համար: Լավ/Օքեյ, կտեսնվենք ավելի ուշ:" },
        { es: "Vale la pena esperar.", hy: "3. Կայուն արտահայտություններ: Արժե սպասել: (Հուշում: Vale la pena նշանակում է «արժե» կամ «իմաստ ունի»:)" }
    ]
  },
  { 
    es: "Ya te digo", 
    hy: "Էլ մի՛ ասա / Հաստա՛տ", 
    nuance: "Երբ լիովին համաձայն ես դիմացինի կարծիքի հետ" 
  }
];

// --- Utilities ---

const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

// --- Components ---

export default function YesGuide() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPhrases = PHRASES.filter(p => 
    p.es.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.hy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-stone-900 font-sans selection:bg-orange-100 overflow-x-hidden">
      
      {/* Visual Header */}
      <header className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
           <img 
            src="https://images.unsplash.com/photo-1543783230-05202868195a?auto=format&fit=crop&q=80&w=2000" 
            alt="Spain Streets" 
            className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#fcfaf7] via-orange-950/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center space-y-4 px-6 max-w-4xl">
           <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg"
           >
             <ThumbsUp size={14} />
             Guía de Acuerdos
           </motion.div>
           <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none text-white drop-shadow-2xl">
             ¡Claro <span className="text-orange-400">que sí!</span>
           </h1>
           <p className="text-white/90 text-lg md:text-xl font-bold italic drop-shadow-md">
             Ինչպե՞ս արտահայտել համաձայնություն իսպաներենով:
           </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 -mt-12 pb-32 relative z-20">
        
        {/* Search */}
        <div className="bg-white p-4 rounded-[32px] shadow-2xl border border-stone-100 flex items-center gap-4 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300" size={20} />
            <input 
              type="text" 
              placeholder="Փնտրել բառ կամ թարգմանություն..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-stone-50 rounded-[24px] outline-none focus:ring-4 ring-orange-500/10 font-bold transition-all"
            />
          </div>
        </div>

        {/* Phrase Cards */}
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredPhrases.map((phrase, i) => (
              <motion.div
                key={phrase.es}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-white rounded-[40px] shadow-xl border border-stone-100 overflow-hidden transition-all ${expandedIndex === i ? 'ring-2 ring-orange-500 shadow-orange-500/10' : ''}`}
              >
                <div 
                  className="p-8 flex flex-col md:flex-row items-center gap-8 cursor-pointer group"
                  onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                >
                  <div className="flex-1 flex items-center gap-6">
                    <div 
                      onClick={(e) => { e.stopPropagation(); speak(phrase.es); }}
                      className="w-16 h-16 bg-orange-50 rounded-3xl flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition-all shrink-0 shadow-sm"
                    >
                      <Volume2 size={24} />
                    </div>
                    <div className="space-y-1">
                       <h3 className="text-3xl md:text-4xl font-black italic tracking-tighter text-stone-900 group-hover:text-orange-500 transition-colors">
                         {phrase.es}
                       </h3>
                       <p className="text-lg font-bold text-stone-500">
                         {phrase.hy}
                       </p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2 border-l border-stone-100 pl-8 hidden md:block">
                     <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Նրբությունը</p>
                     <p className="text-sm font-medium text-stone-600 leading-relaxed italic">
                        {phrase.nuance}
                     </p>
                  </div>

                  <div className="text-stone-300">
                     {expandedIndex === i ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedIndex === i && phrase.examples && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-stone-50/50 border-t border-stone-100 px-8 py-10"
                    >
                      <div className="space-y-6">
                         <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 mb-2">
                           <Zap size={14} /> Ejemplos de uso
                         </div>
                         {phrase.examples.map((ex, idx) => (
                           <div key={idx} className="space-y-2 group/ex">
                             <div className="flex items-start gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-300 mt-2 shrink-0" />
                                <div className="space-y-1">
                                   <p 
                                    onClick={() => speak(ex.es)}
                                    className="text-xl font-black italic tracking-tight text-stone-800 cursor-pointer hover:text-orange-600 transition-colors"
                                   >
                                     {ex.es}
                                   </p>
                                   <p className="text-stone-500 font-medium">
                                     {ex.hy}
                                   </p>
                                </div>
                             </div>
                           </div>
                         ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredPhrases.length === 0 && (
          <div className="py-32 text-center text-stone-300">
             <Search size={64} className="mx-auto mb-6 opacity-20" />
             <p className="font-black uppercase tracking-widest text-xs">Բառ չի գտնվել</p>
          </div>
        )}

      </main>

      {/* Tip Section */}
      <section className="bg-orange-500 py-24 px-6 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 opacity-10">
            <Sparkles size={200} />
         </div>
         <div className="max-w-4xl mx-auto space-y-12 relative z-10 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-8">
               <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-[32px] flex items-center justify-center shrink-0">
                  <Info size={48} />
               </div>
               <div className="space-y-4">
                  <h2 className="text-4xl font-black italic uppercase tracking-tighter">Consejo Pro: VALE</h2>
                  <p className="text-xl font-medium text-orange-50 opacity-90 leading-relaxed">
                    «Vale»-ն իսպանացիների ամենասիրած բառերից է: Այն նշանակում է և՛ «լավ», և՛ «արժե», և՛ «եղավ»: 
                    Մի վախեցեք օգտագործել այն գրեթե ամեն տեղ:
                  </p>
               </div>
            </div>
         </div>
      </section>

      <footer className="py-12 border-t border-stone-100 flex flex-col items-center gap-6 opacity-20 bg-white">
         <div className="flex gap-4">
            <MapPin size={24} />
            <MessageCircle size={24} />
         </div>
         <p className="text-[10px] font-black uppercase tracking-[1em]">Spanish Agreement v1.0</p>
      </footer>
    </div>
  );
}
