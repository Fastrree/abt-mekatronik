import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Settings, Cog, PenTool, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// Import Generated Assets
import heroBg from "@assets/generated_images/dark_industrial_factory_hero_background.png";
import conveyorImg from "@assets/generated_images/industrial_conveyor_belt_system.png";
import textileImg from "@assets/generated_images/textile_fabric_opening_machine.png";
import steelImg from "@assets/generated_images/heavy_steel_construction_frame.png";
import siteImg1 from "@assets/generated_images/industrial_warehouse_steel_structure_site.png";
import automationImg from "@assets/generated_images/robotic_automation_detail.png";

const contactSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir email adresi giriniz"),
  message: z.string().min(10, "Mesajınız en az 10 karakter olmalıdır"),
});

export default function Home() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof contactSchema>) {
    toast({
      title: "Mesajınız Alındı",
      description: "En kısa sürede sizinle iletişime geçeceğiz.",
    });
    form.reset();
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-red-900 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Industrial Factory" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/40" />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-block mb-4 px-3 py-1 bg-red-600/20 border border-red-600/50 text-red-500 font-bold text-xs tracking-widest uppercase rounded-sm backdrop-blur-sm">
              Endüstriyel Mükemmellik
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter">
              GÜÇLÜ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">MÜHENDİSLİK</span> <br />
              <span className="text-red-600">KUSURSUZ</span> GELECEK
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10 font-light leading-relaxed border-l-4 border-red-600 pl-6">
              Burhan Topal liderliğinde; konveyör sistemlerinden tekstil makinelerine, endüstriyel geleceği inşa ediyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-6 rounded-none skew-x-[-10deg] border-2 border-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all">
                <span className="skew-x-[10deg]">ÇÖZÜMLERİMİZ</span>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-500 text-slate-200 hover:bg-slate-800 hover:text-white font-bold text-lg px-8 py-6 rounded-none skew-x-[-10deg] backdrop-blur-sm">
                <span className="skew-x-[10deg]">PROJELERİMİZ</span>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Kaydır</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent"></div>
        </motion.div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-24 bg-slate-950 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            {...fadeIn}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <h3 className="text-red-500 font-bold tracking-widest uppercase mb-2">Ürün Gruplarımız</h3>
              <h2 className="text-4xl md:text-5xl font-black text-white">ÜRETİM ALANLARI</h2>
            </div>
            <p className="text-slate-400 max-w-md text-right md:text-left leading-relaxed">
              Yüksek kapasiteli tesisler için özel olarak tasarlanmış, dayanıklı ve verimli endüstriyel çözümler.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative h-[500px] overflow-hidden bg-slate-900 border border-slate-800"
            >
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img src={conveyorImg} alt="Lojistik & Taşıma" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-90 z-20" />
              
              <div className="absolute bottom-0 left-0 p-8 z-30 w-full">
                <div className="w-12 h-1 bg-red-600 mb-4 transition-all duration-300 group-hover:w-24"></div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">Lojistik & Taşıma</h3>
                <p className="text-slate-400 mb-6 line-clamp-2 group-hover:line-clamp-none transition-all">Ağır hizmet tipi konveyör bant ve yükleme sistemleri.</p>
                <a href="#" className="inline-flex items-center text-white font-semibold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                  Detayları İncele <ChevronRight className="ml-1 w-4 h-4 text-red-500" />
                </a>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative h-[500px] overflow-hidden bg-slate-900 border-t-4 border-red-600"
            >
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img src={textileImg} alt="Tekstil Mekatroniği" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-90 z-20" />
              
              <div className="absolute bottom-0 left-0 p-8 z-30 w-full">
                <div className="w-12 h-1 bg-red-600 mb-4 transition-all duration-300 group-hover:w-24"></div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">Tekstil Mekatroniği</h3>
                <p className="text-slate-400 mb-6 line-clamp-2 group-hover:line-clamp-none transition-all">Denim dok silindirleri ve yüksek verimli kumaş açma makineleri.</p>
                <a href="#" className="inline-flex items-center text-white font-semibold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                  Detayları İncele <ChevronRight className="ml-1 w-4 h-4 text-red-500" />
                </a>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative h-[500px] overflow-hidden bg-slate-900 border border-slate-800"
            >
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img src={steelImg} alt="Çelik Konstrüksiyon" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-90 z-20" />
              
              <div className="absolute bottom-0 left-0 p-8 z-30 w-full">
                <div className="w-12 h-1 bg-red-600 mb-4 transition-all duration-300 group-hover:w-24"></div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">Çelik Konstrüksiyon</h3>
                <p className="text-slate-400 mb-6 line-clamp-2 group-hover:line-clamp-none transition-all">Fabrika içi ağır metal yapılar ve özel şase üretimleri.</p>
                <a href="#" className="inline-flex items-center text-white font-semibold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                  Detayları İncele <ChevronRight className="ml-1 w-4 h-4 text-red-500" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ENGINEERING / ABOUT SECTION */}
      <section id="engineering" className="py-24 bg-slate-900 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-800/20 skew-x-12 transform translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 border border-slate-700 rounded-full opacity-20 -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h3 className="text-red-500 font-bold tracking-widest uppercase mb-4">Mühendislik Vizyonu</h3>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8">ÖZEL MAKİNE TASARIMI & <br />MEKATRONİK ENTEGRASYON</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
                    <Settings className="text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Özel Tasarım Çözümler</h4>
                    <p className="text-slate-400 leading-relaxed">
                      İhtiyaca yönelik projelendirme ve üretim süreçlerinde tam özelleştirme. Standart dışı problemlere mühendislik çözümleri.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
                    <Cog className="text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Yüksek Hassasiyet</h4>
                    <p className="text-slate-400 leading-relaxed">
                      Mikron seviyesinde hassasiyet gerektiren mekanik parçalar ve montaj kalitesi.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
                    <PenTool className="text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Anahtar Teslim Projeler</h4>
                    <p className="text-slate-400 leading-relaxed">
                      Tasarım aşamasından montaj ve devreye almaya kadar uçtan uca proje yönetimi.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5 }}
                 className="space-y-4 mt-8"
               >
                 <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                    <img src={siteImg1} alt="Engineering Site" className="w-full h-48 object-cover rounded shadow-lg opacity-80 hover:opacity-100 transition-opacity" />
                 </div>
                 <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                    <span className="block text-3xl font-black text-white">15+</span>
                    <span className="text-xs uppercase tracking-wider text-slate-400">Yıllık Tecrübe</span>
                 </div>
               </motion.div>
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5, delay: 0.2 }}
                 className="space-y-4"
               >
                 <div className="bg-red-600 p-4 rounded-lg text-center shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                    <span className="block text-3xl font-black text-white">200+</span>
                    <span className="text-xs uppercase tracking-wider text-white/80">Tamamlanan Proje</span>
                 </div>
                 <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                    <img src={automationImg} alt="Automation Detail" className="w-full h-64 object-cover rounded shadow-lg opacity-80 hover:opacity-100 transition-opacity" />
                 </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div {...fadeIn}>
              <h3 className="text-red-500 font-bold tracking-widest uppercase mb-4">Bize Ulaşın</h3>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8">PROJENİZİ <br />BİRLİKTE TASARLAYALIM</h2>
              <p className="text-slate-400 mb-8 max-w-lg">
                Endüstriyel ihtiyaçlarınız için profesyonel çözümler sunuyoruz. Teklif almak veya detaylı bilgi için formu doldurun.
              </p>
              
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/10 rounded-bl-full -mr-4 -mt-4"></div>
                <div className="relative z-10">
                    <h4 className="text-xl font-bold text-white mb-4">WhatsApp Destek Hattı</h4>
                    <Button className="bg-[#25D366] hover:bg-[#20bd5a] text-white w-full py-6 font-bold text-lg">
                        WhatsApp ile Hızlı İletişim
                    </Button>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-slate-900 p-8 md:p-10 border border-slate-800 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Teklif Formu</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-400">Ad Soyad</FormLabel>
                        <FormControl>
                          <Input placeholder="Adınız Soyadınız" {...field} className="bg-slate-950 border-slate-800 focus:border-red-600 h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-400">E-Posta</FormLabel>
                        <FormControl>
                          <Input placeholder="ornek@sirket.com" {...field} className="bg-slate-950 border-slate-800 focus:border-red-600 h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-400">Mesajınız</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Proje detayları veya talebiniz..." {...field} className="bg-slate-950 border-slate-800 focus:border-red-600 min-h-[120px]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 uppercase tracking-wide">
                    GÖNDER
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
