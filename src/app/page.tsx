import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="text-center z-10 max-w-5xl mx-auto px-6">
        {/* Main title */}
        <h1 className="text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Bachelors
        </h1>
        <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white">
          Battleground
        </h2>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl text-gray-300 mb-16 font-light leading-relaxed max-w-4xl mx-auto">
          Navigate the chaos of Nepali college life in this strategic
          deck-building adventure
        </p>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
              🎓
            </div>
            <h3 className="font-bold text-2xl mb-3 text-white">Study Cards</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Boost your GPA and academic performance with strategic study
              choices
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
              💰
            </div>
            <h3 className="font-bold text-2xl mb-3 text-white">Money Cards</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Manage your finances and resources to survive college life
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
              🎯
            </div>
            <h3 className="font-bold text-2xl mb-3 text-white">Strategy</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Balance GPA, Money, Stress & Social life for the perfect college
              experience
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/game"
          className="group inline-flex items-center px-16 py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-3xl font-bold rounded-3xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700"
        >
          <span className="mr-4">🚀</span>
          Start Your Journey
          <span className="ml-4 group-hover:translate-x-2 transition-transform duration-300">
            →
          </span>
        </Link>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 text-5xl animate-bounce opacity-30">
          📚
        </div>
        <div className="absolute top-40 right-20 text-4xl animate-pulse opacity-30">
          💸
        </div>
        <div className="absolute bottom-32 left-20 text-4xl animate-bounce delay-1000 opacity-30">
          🎉
        </div>
        <div className="absolute bottom-20 right-10 text-5xl animate-pulse delay-500 opacity-30">
          ⚡
        </div>
      </div>
    </div>
  );
}
