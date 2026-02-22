import { Clock, Mail, Phone, Moon, Sun, ChevronDown, MoreVertical, X } from 'lucide-react';
import { useI18n, languages, getFlagSrc } from '@/lib/i18n';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Maintenance() {
  const { language, setLanguage, t } = useI18n();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Memoize particle positions to prevent re-render issues
  const darkParticles = useState(() => 
    Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5
    }))
  )[0];

  const lightParticles = useState(() => 
    Array.from({ length: 10 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 4
    }))
  )[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen relative overflow-hidden flex items-center justify-center px-4 sm:px-6 transition-colors duration-700 ${
      isDark ? 'bg-zinc-950' : 'bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isDark ? (
          <>
            {/* Dark Theme - Red/Gray rotating orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] animate-[spin_25s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-red-600/20 rounded-full blur-[120px]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-rose-600/15 rounded-full blur-[120px]" />
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[120px]" />
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-zinc-600/20 rounded-full blur-[120px]" />
            </div>
            
            {/* Floating particles - Memoized positions */}
            {darkParticles.map((particle, i) => (
              <div
                key={`dark-${i}`}
                className="absolute w-1 h-1 bg-red-400/30 rounded-full animate-float"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`
                }}
              />
            ))}

            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
          </>
        ) : (
          <>
            {/* Light Theme - Elegant red/slate gradients */}
            <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-red-200/40 to-rose-300/30 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-slate-300/50 to-slate-400/40 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-red-100/30 to-rose-200/20 rounded-full blur-[120px]" />
            
            {/* Subtle grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
            
            {/* Floating light particles - Memoized positions */}
            {lightParticles.map((particle, i) => (
              <div
                key={`light-${i}`}
                className="absolute w-2 h-2 bg-red-300/20 rounded-full animate-float"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Desktop Controls */}
      <div className="hidden sm:flex fixed top-6 right-6 items-center gap-3 z-50" dir="ltr">
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`group p-3 backdrop-blur-xl border rounded-xl transition-all duration-500 hover:scale-110 active:scale-95 min-w-[48px] min-h-[48px] relative overflow-hidden ${
              isDark 
                ? 'bg-zinc-900/80 border-zinc-700 hover:border-red-500/50 hover:bg-red-500/10' 
                : 'bg-white/80 border-slate-300 hover:border-red-500/50 hover:bg-red-50 shadow-lg shadow-slate-200/50'
            }`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity ${
              isDark ? 'from-red-500/20 to-rose-500/20' : 'from-red-100 to-rose-100'
            }`} />
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400 relative z-10 group-hover:rotate-180 transition-transform duration-700" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            )}
          </button>
        )}

        <div className="relative">
          <button 
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className={`group p-3 pr-4 backdrop-blur-xl border rounded-xl transition-all duration-500 hover:scale-105 active:scale-95 flex items-center gap-3 min-w-[48px] min-h-[48px] overflow-hidden ${
              isDark 
                ? 'bg-zinc-900/80 border-zinc-700 hover:border-red-500/50 hover:bg-red-500/10' 
                : 'bg-white/80 border-slate-300 hover:border-red-500/50 hover:bg-red-50 shadow-lg shadow-slate-200/50'
            }`}
            aria-label="Select language"
            aria-expanded={isLanguageOpen}
            aria-haspopup="true"
          >
            <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity ${
              isDark ? 'from-red-500/10 to-rose-500/10' : 'from-red-100 to-rose-100'
            }`} />
            <img 
              src={getFlagSrc(language)} 
              alt="" 
              className={`w-6 h-4 object-cover rounded shadow-lg ring-1 transition-all relative z-10 ${
                isDark 
                  ? 'ring-white/10 group-hover:ring-red-500/50' 
                  : 'ring-slate-300 group-hover:ring-red-500/50'
              }`}
              aria-hidden="true"
            />
            <span className={`text-sm font-bold uppercase relative z-10 transition-colors ${
              isDark 
                ? 'text-zinc-300 group-hover:text-red-400' 
                : 'text-slate-700 group-hover:text-red-600'
            }`}>{language}</span>
            <ChevronDown className={`w-4 h-4 relative z-10 transition-all duration-300 ${
              isLanguageOpen 
                ? isDark ? 'rotate-180 text-red-400' : 'rotate-180 text-red-600'
                : isDark ? 'text-zinc-500 group-hover:text-red-400' : 'text-slate-500 group-hover:text-red-600'
            }`} />
          </button>
          
          {isLanguageOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsLanguageOpen(false)}
                aria-hidden="true"
              />
              <div 
                className={`absolute right-0 top-full mt-3 backdrop-blur-2xl border rounded-2xl min-w-[220px] overflow-hidden z-50 animate-[slideDown_0.3s_ease-out] ${
                  isDark 
                    ? 'bg-zinc-900/95 border-zinc-700 shadow-2xl shadow-red-500/10' 
                    : 'bg-white/95 border-slate-300 shadow-2xl shadow-slate-400/20'
                }`}
                role="menu"
                aria-label="Language selection"
              >
                <div className="p-2 space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full px-4 py-3 rounded-xl text-left transition-all duration-300 flex items-center gap-3 group/item hover:translate-x-1 ${
                        language === lang.code 
                          ? isDark
                            ? 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                            : 'bg-gradient-to-r from-red-100 to-rose-100 border border-red-300 shadow-lg shadow-red-200/50'
                          : isDark
                            ? 'hover:bg-zinc-800/50 border border-transparent'
                            : 'hover:bg-slate-100 border border-transparent'
                      }`}
                      role="menuitem"
                      aria-label={`Switch to ${lang.name}`}
                      aria-current={language === lang.code ? 'true' : 'false'}
                    >
                      <img 
                        src={getFlagSrc(lang.code)} 
                        alt="" 
                        className={`w-6 h-4 object-cover rounded transition-all ${
                          language === lang.code 
                            ? isDark ? 'ring-2 ring-red-500 scale-110' : 'ring-2 ring-red-600 scale-110'
                            : 'grayscale group-hover/item:grayscale-0'
                        }`}
                        aria-hidden="true"
                      />
                      <span className={`text-sm font-medium ${
                        language === lang.code 
                          ? isDark ? 'text-red-400' : 'text-red-600'
                          : isDark ? 'text-zinc-400 group-hover/item:text-white' : 'text-slate-600 group-hover/item:text-slate-900'
                      }`}>{lang.name}</span>
                      {language === lang.code && (
                        <span className={`ml-auto w-2 h-2 rounded-full animate-pulse ${
                          isDark 
                            ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' 
                            : 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]'
                        }`} aria-hidden="true" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden fixed top-4 right-3 z-50" dir="ltr">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`p-2.5 backdrop-blur-xl border rounded-xl active:scale-95 transition-all duration-300 min-w-[40px] min-h-[40px] flex items-center justify-center ${
            isDark 
              ? 'bg-zinc-900/90 border-zinc-700 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
              : 'bg-white/90 border-slate-300 hover:border-red-500/50 shadow-lg shadow-slate-200/50 hover:shadow-red-200/50'
          }`}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className={`w-4 h-4 ${isDark ? 'text-zinc-300' : 'text-slate-700'}`} />
          ) : (
            <MoreVertical className={`w-4 h-4 ${isDark ? 'text-zinc-300' : 'text-slate-700'}`} />
          )}
        </button>

        {isMobileMenuOpen && (
          <>
            <div 
              className={`fixed inset-0 backdrop-blur-sm z-40 animate-[fadeIn_0.15s_ease-out] ${
                isDark ? 'bg-black/60' : 'bg-slate-900/40'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            
            <div className={`absolute right-0 top-full mt-2 backdrop-blur-2xl border rounded-2xl shadow-2xl min-w-[260px] overflow-hidden z-50 animate-[slideDown_0.3s_ease-out] ${
              isDark 
                ? 'bg-zinc-900/98 border-zinc-700' 
                : 'bg-white/98 border-slate-300 shadow-slate-400/20'
            }`}>
              {mounted && (
                <button
                  onClick={() => { 
                    setTheme(theme === 'dark' ? 'light' : 'dark'); 
                    setIsMobileMenuOpen(false); 
                  }}
                  className={`w-full px-5 py-4 text-left transition-all duration-200 flex items-center gap-3 border-b active:bg-opacity-80 ${
                    isDark 
                      ? 'border-zinc-800 hover:bg-zinc-800/50' 
                      : 'border-slate-200 hover:bg-slate-100'
                  }`}
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? (
                    <>
                      <div className="p-2 bg-amber-400/20 rounded-lg">
                        <Sun className="w-4 h-4 text-amber-400" />
                      </div>
                      <span className="text-sm font-medium text-zinc-300">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <div className="p-2 bg-slate-200 rounded-lg">
                        <Moon className="w-4 h-4 text-slate-600" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">Dark Mode</span>
                    </>
                  )}
                </button>
              )}
              
              <div className="p-2">
                <div className={`px-3 py-2 text-xs font-bold uppercase tracking-widest ${
                  isDark ? 'text-zinc-500' : 'text-slate-500'
                }`}>
                  {t('nav.selectLanguage')}
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { 
                      setLanguage(lang.code as any); 
                      setIsMobileMenuOpen(false); 
                    }}
                    className={`w-full px-3 py-3 rounded-xl text-left transition-all duration-200 flex items-center gap-3 mb-1 ${
                      language === lang.code 
                        ? isDark
                          ? 'bg-red-500/20 border border-red-500/30'
                          : 'bg-red-100 border border-red-300'
                        : isDark
                          ? 'border border-transparent hover:bg-zinc-800/50 active:bg-zinc-700'
                          : 'border border-transparent hover:bg-slate-100 active:bg-slate-200'
                    }`}
                    aria-label={`Switch to ${lang.name}`}
                    aria-current={language === lang.code ? 'true' : 'false'}
                  >
                    <img 
                      src={getFlagSrc(lang.code)} 
                      alt="" 
                      className={`w-5 h-4 object-cover rounded transition-all ${
                        language === lang.code 
                          ? isDark ? 'ring-2 ring-red-400' : 'ring-2 ring-red-600'
                          : ''
                      }`}
                      aria-hidden="true"
                    />
                    <span className={`text-sm font-medium ${
                      language === lang.code 
                        ? isDark ? 'text-red-400' : 'text-red-600'
                        : isDark ? 'text-zinc-400' : 'text-slate-600'
                    }`}>
                      {lang.name}
                    </span>
                    {language === lang.code && (
                      <span className={`ml-auto w-1.5 h-1.5 rounded-full ${
                        isDark 
                          ? 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]' 
                          : 'bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]'
                      }`} aria-hidden="true" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-xl w-full mx-auto">
        {/* Logo */}
        <div className="text-center mb-10 group">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-3 transition-all duration-500 group-hover:scale-105 ${
            isDark 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-white to-zinc-100 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 drop-shadow-[0_2px_10px_rgba(15,23,42,0.15)]'
          }`}>
            {language === 'tr' ? 'ABT MEKATRONİK' : 'ABT MECHATRONICS'}
          </h1>
          <div className={`h-1 w-28 mx-auto rounded-full transition-all duration-500 ${
            isDark 
              ? 'bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.8)]' 
              : 'bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_2px_10px_rgba(220,38,38,0.4)]'
          }`} />
        </div>

        {/* Main Card */}
        <div className="relative group">
          {/* Glow border */}
          <div className={`absolute -inset-0.5 rounded-3xl blur transition-all duration-1000 ${
            isDark 
              ? 'bg-gradient-to-r from-red-600 via-rose-500 to-red-600 opacity-30 group-hover:opacity-60 animate-gradient-xy' 
              : 'bg-gradient-to-r from-red-400 via-rose-400 to-red-400 opacity-40 group-hover:opacity-70'
          }`} />
          
          <div className={`relative backdrop-blur-3xl border rounded-3xl p-10 sm:p-12 text-center shadow-2xl overflow-hidden transition-all duration-500 ${
            isDark 
              ? 'bg-zinc-900/60 border-zinc-700/50 group-hover:border-red-500/30' 
              : 'bg-white/70 border-slate-300/50 group-hover:border-red-400/50 shadow-slate-300/50'
          }`}>
            {/* Inner gradient */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${
              isDark 
                ? 'bg-gradient-to-br from-red-500/5 via-transparent to-rose-500/5' 
                : 'bg-gradient-to-br from-red-100/50 via-transparent to-rose-100/50'
            }`} />
            
            {/* Corner accents */}
            <div className={`absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 rounded-tl-3xl transition-colors ${
              isDark ? 'border-red-500/40' : 'border-red-400/50'
            }`} />
            <div className={`absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 rounded-tr-3xl transition-colors ${
              isDark ? 'border-red-500/40' : 'border-red-400/50'
            }`} />
            <div className={`absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 rounded-bl-3xl transition-colors ${
              isDark ? 'border-red-500/40' : 'border-red-400/50'
            }`} />
            <div className={`absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 rounded-br-3xl transition-colors ${
              isDark ? 'border-red-500/40' : 'border-red-400/50'
            }`} />
            
            {/* Status Badge */}
            <div className="relative mb-8">
              <div className={`inline-flex items-center gap-2 px-5 py-2.5 border rounded-full transition-all ${
                isDark 
                  ? 'bg-red-500/10 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]' 
                  : 'bg-red-100 border-red-300 shadow-lg shadow-red-200/50'
              }`}>
                <span className={`w-2.5 h-2.5 rounded-full animate-ping ${
                  isDark ? 'bg-red-500' : 'bg-red-600'
                }`} />
                <span className={`text-sm font-bold uppercase tracking-widest ${
                  isDark ? 'text-red-400' : 'text-red-700'
                }`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                  {t('maintenance.statusBadge')}
                </span>
              </div>
            </div>

            {/* Icon with orbit */}
            <div className="relative mb-8 flex justify-center">
              <div className={`absolute w-28 h-28 border rounded-full animate-[spin_12s_linear_infinite] ${
                isDark ? 'border-red-500/20' : 'border-red-400/30'
              }`} />
              <div className={`absolute w-36 h-36 border rounded-full animate-[spin_18s_linear_infinite_reverse] ${
                isDark ? 'border-red-500/10' : 'border-red-300/20'
              }`} />
              <div className={`relative w-20 h-20 border rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-500 ${
                isDark 
                  ? 'bg-gradient-to-br from-zinc-800 to-black border-zinc-600' 
                  : 'bg-gradient-to-br from-white to-slate-100 border-slate-300 shadow-slate-300/50'
              }`}>
                <Clock className={`w-10 h-10 ${isDark ? 'text-red-500' : 'text-red-600'}`} />
              </div>
            </div>
            
            {/* Title */}
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight mb-4 ${
              isDark ? 'text-white drop-shadow-lg' : 'text-slate-900'
            }`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {t('maintenance.title')}
            </h2>
            
            {/* Description */}
            <p className={`text-base leading-relaxed mb-3 ${
              isDark ? 'text-zinc-400' : 'text-slate-600'
            }`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {t('maintenance.description')}
            </p>

            <p className={`text-sm mb-10 ${
              isDark ? 'text-zinc-500' : 'text-slate-500'
            }`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {t('maintenance.thankYou')}
            </p>

            {/* Divider */}
            <div className="relative h-px mb-10 overflow-hidden">
              <div className={`absolute inset-0 animate-shimmer ${
                isDark 
                  ? 'bg-gradient-to-r from-transparent via-red-500/50 to-transparent' 
                  : 'bg-gradient-to-r from-transparent via-red-400/50 to-transparent'
              }`} />
            </div>

            {/* Contact Buttons */}
            <div className="relative space-y-5">
              <p className={`text-xs font-bold uppercase tracking-[0.3em] mb-6 ${
                isDark ? 'text-zinc-500' : 'text-slate-500'
              }`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {t('maintenance.contactText')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+905373197281" 
                  className={`group/btn relative inline-flex items-center justify-center gap-3 px-7 py-4 border-2 rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 ${
                    isDark 
                      ? 'bg-transparent border-zinc-600 hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]' 
                      : 'bg-white border-slate-300 hover:border-red-500 shadow-lg shadow-slate-200/50 hover:shadow-red-200/50'
                  }`}
                >
                  <div className={`absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500 ${
                    isDark 
                      ? 'bg-gradient-to-r from-red-500/10 to-rose-500/10' 
                      : 'bg-gradient-to-r from-red-100 to-rose-100'
                  }`} />
                  <Phone className={`w-5 h-5 relative z-10 group-hover/btn:rotate-12 transition-transform ${
                    isDark ? 'text-red-400' : 'text-red-600'
                  }`} />
                  <span className={`font-bold relative z-10 transition-colors ${
                    isDark 
                      ? 'text-zinc-300 group-hover/btn:text-white' 
                      : 'text-slate-700 group-hover/btn:text-slate-900'
                  }`}>+90 537 319 72 81</span>
                </a>
                
                <a 
                  href="mailto:info@abtmekatronik.com" 
                  className={`group/btn relative inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 ${
                    isDark 
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]' 
                      : 'bg-gradient-to-r from-red-600 to-rose-600 shadow-lg shadow-red-300/50 hover:shadow-red-400/60'
                  }`}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity ${
                    isDark 
                      ? 'bg-gradient-to-r from-rose-600 to-red-600' 
                      : 'bg-gradient-to-r from-rose-700 to-red-700'
                  }`} />
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.2)_50%,transparent_70%)] translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                  <Mail className="w-5 h-5 text-white relative z-10 group-hover/btn:scale-110 transition-transform" />
                  <span className="font-bold text-white relative z-10">info@abtmekatronik.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full animate-bounce ${
                isDark ? 'bg-red-500/40' : 'bg-red-600/50'
              }`} 
              style={{ animationDelay: `${i * 0.15}s` }} 
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-20px); opacity: 0.6; }
        }
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-shimmer { animation: shimmer 3s infinite; }
        .animate-gradient-xy { background-size: 200% 200%; animation: gradient-xy 8s ease infinite; }
      `}</style>
    </div>
  );
}