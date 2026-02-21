import { Wrench, Clock, Mail, Phone } from 'lucide-react';

export default function Maintenance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-600 rounded-2xl mb-6 animate-pulse">
            <Wrench className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-black text-white mb-4">
            ABT MEKATRONİK
          </h1>
        </div>

        {/* Main Message */}
        <div className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-3xl p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500/20 rounded-full mb-6">
            <Clock className="w-10 h-10 text-yellow-500" />
          </div>
          
          <h2 className="text-4xl font-black text-white mb-4">
            Bakımdayız
          </h2>
          
          <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
            Web sitemiz şu anda bakım çalışması nedeniyle geçici olarak kapalıdır. 
            En kısa sürede tekrar hizmetinizdeyiz.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

          {/* Contact Info */}
          <div className="space-y-4">
            <p className="text-zinc-400 text-sm mb-6">
              Acil durumlar için bize ulaşabilirsiniz:
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+905373197281" 
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300 text-white hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                <span className="font-semibold">+90 537 319 72 81</span>
              </a>
              
              <a 
                href="mailto:info@abtmekatronik.com" 
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300 text-white hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                <span className="font-semibold">info@abtmekatronik.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-zinc-500 text-sm mt-8">
          Anlayışınız için teşekkür ederiz.
        </p>
      </div>
    </div>
  );
}
