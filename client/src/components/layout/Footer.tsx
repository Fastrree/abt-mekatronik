import { MapPin, Phone, Mail, Linkedin, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-black text-white mb-6">ABT <span className="text-primary">MEKATRONİK</span></h2>
            <p className="text-sm leading-relaxed mb-6">
              Burhan Topal liderliğinde; endüstriyel üretim teknolojilerinde geleceği inşa ediyoruz. Yüksek hassasiyet, güçlü mühendislik.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6">Hızlı Erişim</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Ana Sayfa</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Ürünler</a></li>
              <li><a href="#engineering" className="hover:text-primary transition-colors">Mühendislik</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors">Projeler</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">İletişim</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6">Ürün Grupları</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Konveyör Sistemleri</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Tekstil Makinaları</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Çelik Konstrüksiyon</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Özel Makine Tasarımı</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6">İletişim</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary shrink-0 mt-1" size={18} />
                <span>İstanbul Organize Sanayi Bölgesi,<br />34000 Başakşehir/İstanbul</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary shrink-0" size={18} />
                <span>+90 212 555 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary shrink-0" size={18} />
                <span>info@abtmekatronik.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 text-center text-xs uppercase tracking-widest font-medium">
          <p>&copy; 2026 ABT MEKATRONİK SAN. TİC. LTD. ŞTİ. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
