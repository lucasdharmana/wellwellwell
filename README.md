import React, { useState, useEffect } from 'react';
import { X, Zap, Radio, TrendingUp, AlertTriangle } from 'lucide-react';

export default function WenNewspaper() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [glitchText, setGlitchText] = useState("$WEN");
  const [tickerPosition, setTickerPosition] = useState(0);

  // Glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const glitchChars = "₿ΞΘΛΠΣΩ$@#%";
      const originalText = "$WEN";
      const shouldGlitch = Math.random() > 0.92;
      
      if (shouldGlitch) {
        const glitched = originalText.split('').map(char => 
          Math.random() > 0.6 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
        ).join('');
        setGlitchText(glitched);
        setTimeout(() => setGlitchText(originalText), 80);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Ticker animation
  useEffect(() => {
    const tickerInterval = setInterval(() => {
      setTickerPosition(prev => prev - 1);
    }, 30);
    return () => clearInterval(tickerInterval);
  }, []);

  const tickerNews = [
    "BREAKING: Solana network celebrates 3 hours of uptime",
    "Local degen claims 'this time is different'",
    "Pump.fun launches rate limited after 10,000th dog coin",
    "Study finds 99% of traders bought the top",
    "Man who said 'WAGMI' in 2021 still waiting",
    "Jupiter agregator becomes sentient, immediately rugs itself"
  ];

  const articles = [
    {
      id: 1,
      headline: "Scientists Discover Checking Wallet Every 30 Seconds Does Increase Anxiety",
      subheading: "Breakthrough study confirms what nobody wanted to hear",
      category: "SCIENCE",
      date: "3025.09.30",
      imageUrl: "https://placehold.co/1200x1600/000000/00ff00?text=FULL+ARTICLE+IMAGE",
      thumbnailUrl: "https://placehold.co/800x500/0a0a0a/00ff41?text=LEAD+STORY",
      breaking: true,
      isLead: true
    },
    {
      id: 2,
      headline: "Solana Validator Claims Network Downtime 'Builds Character'",
      subheading: "'Makes you appreciate the good blocks,' says increasingly defensive operator",
      category: "TECH",
      date: "3025.09.29",
      imageUrl: "https://placehold.co/1200x1600/000000/00ff00?text=FULL+ARTICLE",
      thumbnailUrl: "https://placehold.co/600x400/0a0a0a/ff0099?text=TECH+CRISIS"
    },
    {
      id: 3,
      headline: "Local Man Announces He's 'Early' To Project Launched 6 Months Ago",
      subheading: "Down 87% but remains optimistic about being early",
      category: "MARKETS",
      date: "3025.09.28",
      imageUrl: "https://placehold.co/1200x1600/000000/00ff00?text=FULL+ARTICLE",
      thumbnailUrl: "https://placehold.co/600x400/0a0a0a/00ffff?text=COPIUM+LEVELS:+MAX"
    },
    {
      id: 4,
      headline: "Pump.Fun Dev Promises 'No Rug' While Slowly Backing Toward Exit",
      subheading: "Community notes suspicious bulge in developer's wallet",
      category: "INVESTIGATION",
      date: "3025.09.27",
      imageUrl: "https://placehold.co/1200x1600/000000/00ff00?text=FULL+ARTICLE",
      thumbnailUrl: "https://placehold.co/600x400/0a0a0a/ffff00?text=TOTALLY+SAFE"
    },
    {
      id: 5,
      headline: "Area Woman's Boyfriend Explains Blockchain For 47th Consecutive Date",
      subheading: "'He said something about Byzantine generals' reports increasingly distant partner",
      category: "RELATIONSHIPS",
      date: "3025.09.26",
      imageUrl: "https://placehold.co/1200x1600/000000/00ff00?text=FULL+ARTICLE",
      thumbnailUrl: "https://placehold.co/600x400/0a0a0a/ff6b35?text=LOVE+IS+DEAD"
    },
    {
      id: 6,
      headline: "Telegram Group Admin Disappears After Typing 'Guys, I Have Bad News'",
      subheading: "Last seen online 3 days ago, liquidity pool suspiciously empty",
      category: "CRIME",
      date: "3025.09.25",
      imageUrl: "https://placehold.co/1200x1600/000000/00ff00?text=FULL+ARTICLE",
      thumbnailUrl: "https://placehold.co/600x400/0a0a0a/ff0000?text=RUG+ALERT"
    }
  ];

  const leadArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* CRT Scanlines Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,255,65,0.1) 0px, transparent 1px, transparent 2px, rgba(0,255,65,0.1) 3px)',
          animation: 'scan 8s linear infinite'
        }}></div>
      </div>

      {/* Top Alert Bar */}
      <div className="bg-red-600 text-white py-1 text-center text-xs font-bold tracking-wider animate-pulse">
        <AlertTriangle className="inline w-3 h-3 mr-2" />
        ATTENTION: DYOR OR GET REKT • NOT FINANCIAL ADVICE • PROBABLY NOTHING
      </div>

      {/* Ticker */}
      <div className="bg-cyan-950 border-y-2 border-cyan-500 py-2 overflow-hidden relative">
        <div className="flex items-center">
          <div className="bg-cyan-500 text-black px-3 py-1 text-xs font-bold mr-4 flex-shrink-0">
            <Radio className="inline w-3 h-3 mr-1" />
            LIVE
          </div>
          <div 
            className="flex gap-8 text-cyan-300 text-sm whitespace-nowrap"
            style={{ transform: `translateX(${tickerPosition}px)` }}
          >
            {[...tickerNews, ...tickerNews, ...tickerNews].map((news, i) => (
              <span key={i}>{news} • </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b-4 border-green-500 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Top metadata */}
          <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
            <div className="flex gap-4">
              <span className="text-cyan-400">◉ BLOCKCHAIN: SOLANA</span>
              <span>DATE: 3025.09.30</span>
              <span>EDITION: #420.69</span>
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-green-900 text-green-300 border border-green-500">$SOL: ∞</span>
              <span className="px-2 py-1 bg-purple-900 text-purple-300 border border-purple-500">GAS: LOW</span>
            </div>
          </div>

          {/* Masthead */}
          <div className="text-center">
            <div className="text-xs text-cyan-400 tracking-widest mb-2">║ ESTABLISHED 3025 ║</div>
            <h1 className="text-7xl font-bold tracking-tight mb-2 relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500">
                THE {glitchText} TIMES
              </span>
              <Zap className="inline w-8 h-8 text-yellow-400 ml-2 animate-pulse" />
            </h1>
            <p className="text-sm text-gray-400 italic mb-2">
              "Truth is Dead. Long Live Memes."
            </p>
            <div className="flex justify-center gap-6 text-xs text-green-500 font-bold">
              <span>◈ CERTIFIED DEGEN NEWS</span>
              <span>◈ 100% UNVERIFIED</span>
              <span>◈ TRUST THE PLAN</span>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="mt-4 bg-yellow-900 border-2 border-yellow-500 text-yellow-200 p-2 text-center text-xs">
            ⚠ DISCLAIMER: All content satirical. Do not make financial decisions based on jpeg memes. Seriously. ⚠
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-900 border-b-2 border-cyan-500 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-1">
            {['BREAKING', 'MARKETS', 'TECH', 'CRIME', 'LIFESTYLE', 'OPINION'].map(section => (
              <button 
                key={section}
                className="px-4 py-3 text-xs font-bold hover:bg-cyan-950 hover:text-cyan-300 transition border-r border-gray-800 last:border-r-0"
              >
                [ {section} ]
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Lead Story - Full Width */}
        <div 
          className="mb-12 p-6 border-4 border-cyan-500 bg-gradient-to-br from-cyan-950 to-black cursor-pointer hover:border-green-400 transition-all hover:shadow-lg hover:shadow-cyan-500/50"
          onClick={() => setSelectedArticle(leadArticle)}
        >
          <div className="flex gap-2 items-center mb-3">
            <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold animate-pulse">
              ◉ BREAKING
            </span>
            <span className="text-xs text-gray-500">{leadArticle.date}</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-4xl font-bold leading-tight mb-4 text-green-300 hover:text-cyan-300 transition">
                {leadArticle.headline}
              </h2>
              <p className="text-xl text-gray-300 mb-4">
                {leadArticle.subheading}
              </p>
              <button className="px-6 py-2 bg-green-600 text-black font-bold hover:bg-green-400 transition border-2 border-green-400">
                READ MORE →
              </button>
            </div>
            <img 
              src={leadArticle.thumbnailUrl}
              alt={leadArticle.headline}
              className="w-full border-2 border-green-500 hover:border-cyan-400 transition"
            />
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherArticles.map((article) => (
            <div 
              key={article.id}
              className="border-2 border-green-800 bg-gray-950 hover:border-cyan-400 transition-all cursor-pointer hover:shadow-lg hover:shadow-green-500/30 group"
              onClick={() => setSelectedArticle(article)}
            >
              <img 
                src={article.thumbnailUrl}
                alt={article.headline}
                className="w-full border-b-2 border-green-800 group-hover:border-cyan-400 transition"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-purple-900 text-purple-300 text-xs font-bold border border-purple-500">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-600">{article.date}</span>
                </div>
                <h3 className="text-lg font-bold leading-tight mb-2 text-green-300 group-hover:text-cyan-300 transition">
                  {article.headline}
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  {article.subheading}
                </p>
                <div className="text-xs text-cyan-400 font-bold">
                  → FULL STORY
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Ad Space */}
        <div className="mt-12 p-8 border-4 border-yellow-500 bg-gradient-to-r from-yellow-950 to-orange-950 text-center">
          <div className="text-xs text-yellow-600 mb-2">[ SPONSORED CONTENT ]</div>
          <h3 className="text-3xl font-bold text-yellow-300 mb-3">
            🚀 BUY $WEN ON PUMP.FUN 🚀
          </h3>
          <p className="text-yellow-200 mb-4">
            Join the revolution. DYOR. NFA. Probably a rug but definitely funny.
          </p>
          <button className="px-8 py-3 bg-yellow-400 text-black font-bold text-lg hover:bg-yellow-300 transition border-2 border-yellow-500">
            APE IN NOW →
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t-4 border-green-500 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm mb-4">
            © 3025 THE $WEN TIMES INTERGALACTIC MEDIA CORPORATION
          </p>
          <p className="text-xs text-gray-600 mb-2">
            All content satirical. Not financial advice. Do not attempt.
          </p>
          <div className="flex justify-center gap-4 text-xs text-cyan-400">
            <a href="#" className="hover:text-cyan-300">[ TWITTER ]</a>
            <a href="#" className="hover:text-cyan-300">[ TELEGRAM ]</a>
            <a href="#" className="hover:text-cyan-300">[ PUMP.FUN ]</a>
            <a href="#" className="hover:text-cyan-300">[ DISCLAIMER ]</a>
          </div>
        </div>
      </footer>

      {/* Article Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 backdrop-blur"
          onClick={() => setSelectedArticle(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-auto border-4 border-cyan-500 shadow-2xl shadow-cyan-500/50">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 bg-red-600 text-white p-3 font-bold hover:bg-red-500 z-10 border-2 border-red-400"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="bg-black p-2">
              <img 
                src={selectedArticle.imageUrl}
                alt={selectedArticle.headline}
                className="w-full border-2 border-green-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
      `}</style>
    </div>
  );
}
