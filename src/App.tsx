/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Cake, 
  Cookie, 
  MapPin, 
  Instagram, 
  Mail, 
  ChevronRight, 
  Star, 
  Heart, 
  Clock,
  ArrowRight
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const FadeInWhenVisible = ({ children, delay = 0, duration = 0.8, direction = "up" }: any) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { duration, delay, ease: [0.215, 0.61, 0.355, 1] }
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).tagName === 'A') {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor hidden lg:block"
      animate={{
        x: position.x - 10,
        y: position.y - 10,
        scale: isHovering ? 2 : 1,
        backgroundColor: isHovering ? "rgba(197, 160, 35, 0.1)" : "transparent",
      }}
      transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.5 }}
    />
  );
};

const ImageOrPlaceholder = ({ src, alt, className, delay = 0 }: { src?: string, alt?: string, className?: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.5, delay, ease: "easeOut" }}
    className={`relative overflow-hidden ${className} group`}
  >
    {src ? (
      <img 
        src={src} 
        alt={alt || "Bakehouse creation"} 
        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
        referrerPolicy="no-referrer"
      />
    ) : (
      <div className="w-full h-full bg-gradient-to-br from-blush/40 via-gold/10 to-espresso/5 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700">
        <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
        <div className="absolute inset-0 mesh-gradient opacity-60"></div>
      </div>
    )}
    <div className="absolute inset-0 bg-espresso/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay"></div>
  </motion.div>
);

export default function App() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={targetRef} className="relative min-h-screen selection:bg-gold/30 scroll-smooth">
      <CustomCursor />
      <div className="noise" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 md:px-16" aria-label="Main Navigation">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-gold font-serif text-xl tracking-[0.2em] font-medium"
        >
          TFB
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex gap-8 items-center"
        >
          <a href="#about" className="hidden md:block text-espresso/60 hover:text-gold transition-colors text-xs uppercase tracking-widest font-medium">Legacy</a>
          <a href="#specialties" className="hidden md:block text-espresso/60 hover:text-gold transition-colors text-xs uppercase tracking-widest font-medium">Bespoke</a>
          <a href="#contact" className="px-6 py-2.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-medium hover:bg-burgundy transition-all duration-500 rounded-full">
            Inquire
          </a>
        </motion.div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-ivory">
          <motion.div 
            style={{ scale: heroScale, opacity: heroOpacity }}
            className="absolute inset-0 z-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1920&auto=format&fit=crop"
              alt="Luxury Patisserie display with elegant tiered cakes and warm lighting"
              className="w-full h-full object-cover opacity-15 grayscale-[50%]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ivory/80 via-transparent to-ivory" />
          </motion.div>

        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[80vw] h-[80vh] rounded-t-full border border-gold/10 flex items-center justify-center">
            <div className="w-[60vw] h-[60vh] rounded-t-full border border-gold/5" />
          </div>
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-gold uppercase tracking-[0.4em] text-xs mb-8"
          >
            Artisanal Maryland Patisserie
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl text-espresso mb-10 leading-[1.1] font-light"
          >
            TheFinest<br />
            <span className="italic relative">
              Bakehouse
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1.8 }}
                className="absolute -bottom-2 left-0 h-[1px] bg-gold/30"
              />
            </span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="max-w-md mx-auto"
          >
            <p className="text-espresso/60 font-medium leading-relaxed tracking-wide mb-12">
              Baked with intention. Served with love. Every bite, a blessing for yours.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-4 text-espresso font-semibold uppercase tracking-widest text-xs group"
            >
              <span className="w-12 h-[1px] bg-gold group-hover:w-16 transition-all duration-500" />
              Order Now
              <ChevronRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[1px] h-12 bg-espresso"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-ivory overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <FadeInWhenVisible direction="right">
                <div className="relative z-10 aspect-[3/4] rounded-tr-[100px]">
                  <ImageOrPlaceholder 
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop"
                    alt="Sydni, Founder of TheFinestBakehouse"
                    className="w-full h-full rounded-tr-[100px] shadow-2xl" 
                  />
                </div>
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                  className="absolute -bottom-10 -left-10 w-64 h-64 border border-gold/20 -z-10 rounded-full" 
                />
              </FadeInWhenVisible>
            </div>
            
            <div className="lg:col-span-7 lg:pl-16">
              <FadeInWhenVisible>
                <div className="inline-flex items-center gap-2 mb-6">
                  <Heart className="w-4 h-4 text-gold" />
                  <span className="text-gold uppercase tracking-widest text-[10px] font-bold">Our Legacy</span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl text-espresso mb-8 leading-tight">
                  From the heart of NYC to the <span className="italic">purpose</span> of Maryland.
                </h2>
                <div className="space-y-6 text-espresso/70 leading-relaxed font-medium">
                  <p>
                    I relocated with a vision led by faith and a passion fueled by purpose. For years, I baked for the ones I love, perfecting the chemistry of joy and the art of intention.
                  </p>
                  <p>
                    Today, TheFinestBakehouse is more than a bakery—it's a formal declaration of love through dough and flour. Every creation is handled with the precision of a New York patisserie and the warmth of a Maryland home.
                  </p>
                </div>
                <div className="mt-12 flex flex-col sm:flex-row gap-12">
                  <div className="flex flex-col gap-2">
                    <span className="font-serif text-4xl text-gold italic">Sydni</span>
                    <span className="text-[10px] uppercase tracking-widest text-espresso/40">Founder & Head Baker</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-espresso/50 italic max-w-[200px]">
                      "Baking is my ministry; witnessing your celebrations is my greatest blessing."
                    </p>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section id="specialties" className="py-32 bg-ivory">
        <div className="container mx-auto px-6">
          <FadeInWhenVisible>
            <div className="text-center mb-24">
              <span className="text-gold uppercase tracking-[0.4em] text-[10px] block mb-4">The Selection</span>
              <h2 className="font-serif text-4xl md:text-6xl text-espresso">Our Bespoke Specialties</h2>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 max-w-7xl mx-auto">
            {/* Specialty 1 */}
            <div className="group relative">
              <FadeInWhenVisible delay={0.1}>
                <div className="aspect-[4/5] mb-8 overflow-hidden relative">
                  <ImageOrPlaceholder 
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop"
                    alt="Elegant custom wedding cake by TheFinestBakehouse with intricate floral details and luxury finish"
                    className="w-full h-full" 
                  />
                  <div className="absolute inset-0 bg-espresso/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                    <button className="bg-ivory text-espresso text-[10px] uppercase tracking-widest px-8 py-3 font-bold hover:bg-gold hover:text-ivory transition-colors">View Details</button>
                  </div>
                </div>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="font-serif text-3xl text-espresso">Custom Cakes</h3>
                  <div className="h-[1px] flex-grow mx-4 bg-gold/20 mb-2 invisible group-hover:visible transition-all" />
                  <Cake className="w-5 h-5 text-gold/40 group-hover:text-gold transition-colors" />
                </div>
                <p className="text-espresso/60 text-sm leading-relaxed mb-6">
                  Sophisticated designs tailored to your grandest narratives. From minimal elegance to floral overloads.
                </p>
              </FadeInWhenVisible>
            </div>

            {/* Specialty 2 */}
            <div className="group relative md:-translate-y-12">
              <FadeInWhenVisible delay={0.2}>
                <div className="aspect-[4/5] mb-8 overflow-hidden relative">
                  <ImageOrPlaceholder 
                    src="https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=800&auto=format&fit=crop"
                    alt="Gourmet cupcakes with silk-like frosting and artisanal toppings from TheFinestBakehouse Maryland"
                    className="w-full h-full" 
                  />
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-espresso/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-ivory/80 text-[10px] uppercase tracking-[0.3em]">Pricing Tier</span>
                    <p className="text-ivory font-serif text-lg">$35 / Dozen</p>
                    <p className="text-ivory/60 text-[10px] mt-1 italic">Per color & flavor selection</p>
                  </div>
                </div>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="font-serif text-3xl text-espresso">Cupcakes</h3>
                  <Star className="w-5 h-5 text-gold/40 group-hover:text-gold transition-colors" />
                </div>
                <p className="text-espresso/60 text-sm leading-relaxed mb-6">
                  Gourmet treats defined by silk-like frosting and intentional flavor profiles. $35 per dozen.
                </p>
              </FadeInWhenVisible>
            </div>

            {/* Specialty 3 */}
            <div className="group relative">
              <FadeInWhenVisible delay={0.3}>
                <div className="aspect-[4/5] mb-8 overflow-hidden relative">
                  <ImageOrPlaceholder 
                    src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop"
                    alt="Handcrafted artisanal cookies for luxury gifting and refined events"
                    className="w-full h-full" 
                  />
                </div>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="font-serif text-3xl text-espresso">Cookies</h3>
                  <Cookie className="w-5 h-5 text-gold/40 group-hover:text-gold transition-colors" />
                </div>
                <p className="text-espresso/60 text-sm leading-relaxed mb-6">
                  Refined recipes that bridge the gap between comfort and luxury. Perfect for gifting or intimate gatherings.
                </p>
              </FadeInWhenVisible>
            </div>
          </div>
        </div>
      </section>

      {/* Occasions Section */}
      <section className="py-32 bg-espresso text-ivory relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <FadeInWhenVisible direction="right">
                <span className="text-gold uppercase tracking-[0.4em] text-[10px] block mb-6">Versatility</span>
                <h2 className="font-serif text-5xl md:text-6xl mb-8 leading-tight">For every <span className="italic">blessed</span> occasion.</h2>
                <p className="text-ivory/60 leading-relaxed max-w-md mb-12">
                  Life's biggest moments deserve the finest details. We curate flavors and aesthetics for all chapters of your journey.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  {[
                    "Weddings", "Birthdays", "Baby Showers", 
                    "Anniversaries", "Corporate", "Holidays"
                  ].map((item, i) => (
                    <motion.div 
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 group cursor-default"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                      <span className="text-xs uppercase tracking-widest font-medium group-hover:text-gold transition-colors">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </FadeInWhenVisible>
            </div>
            <div className="relative">
              <FadeInWhenVisible>
                <div className="grid grid-cols-2 gap-4">
                  <div className="pt-12">
                    <ImageOrPlaceholder 
                      src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop"
                      alt="Luxury wedding cake centerpiece at a high-end celebration"
                      className="aspect-[3/4] rounded-full gold-glow mb-4" 
                    />
                    <p className="text-[10px] uppercase tracking-widest text-gold text-right pr-4">Weddings</p>
                  </div>
                  <div>
                    <ImageOrPlaceholder 
                      src="https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=800&auto=format&fit=crop"
                      alt="Seasonal luxury holiday treats and bespoke bakes for festive Maryland events"
                      className="aspect-[3/4] rounded-full gold-glow mb-4" 
                    />
                    <p className="text-[10px] uppercase tracking-widest text-gold pl-4">Holidays</p>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-ivory">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto rounded-[40px] bg-white border border-gold/10 p-8 md:p-20 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/5 via-gold to-gold/5" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                <FadeInWhenVisible direction="right">
                  <h2 className="font-serif text-5xl text-espresso mb-8">Begin your <span className="italic">order</span>.</h2>
                  <p className="text-espresso/60 leading-relaxed mb-10">
                    Share your vision with us. We thrive on the details that make your occasion unique. Delivery is available throughout Maryland for all custom commissions.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center group-hover:bg-gold transition-colors duration-500">
                        <MapPin className="w-4 h-4 text-espresso group-hover:text-ivory" />
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-espresso/40">Location</span>
                        <span className="text-sm font-medium">Maryland, USA</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center group-hover:bg-gold transition-colors duration-500">
                        <Clock className="w-4 h-4 text-espresso group-hover:text-ivory" />
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-espresso/40">Lead Time</span>
                        <span className="text-sm font-medium">2-4 Weeks Recommended</span>
                      </div>
                    </div>
                  </div>
                </FadeInWhenVisible>
              </div>

              <div>
                <FadeInWhenVisible>
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/60">Your Name</label>
                        <input type="text" className="w-full bg-ivory border-none p-4 text-sm focus:ring-1 focus:ring-gold outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/60">Occasion</label>
                        <input type="text" className="w-full bg-ivory border-none p-4 text-sm focus:ring-1 focus:ring-gold outline-none transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/60">Message / Vision</label>
                      <textarea rows={4} className="w-full bg-ivory border-none p-4 text-sm focus:ring-1 focus:ring-gold outline-none transition-all resize-none"></textarea>
                    </div>
                    <button className="w-full bg-espresso text-ivory text-[10px] uppercase tracking-[0.3em] font-bold py-6 group relative overflow-hidden transition-all duration-500 hover:shadow-2xl">
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        Submit Inquiry <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </span>
                      <motion.div 
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-gold"
                      />
                    </button>
                  </form>
                </FadeInWhenVisible>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="py-20 bg-ivory border-t border-gold/10">
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-12"
          >
            <h2 className="font-serif text-3xl text-espresso mb-4">TheFinestBakehouse</h2>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold">The finest, for yours.</p>
          </motion.div>
          
          <div className="flex justify-center gap-12 mb-16">
            <a href="#" className="text-espresso/40 hover:text-gold transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-espresso/40 hover:text-gold transition-colors"><Mail className="w-5 h-5" /></a>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-espresso/60">Maryland, USA</span>
              <div className="w-8 h-[1px] bg-gold/30" />
              <p className="text-[10px] italic text-gold">Let your light shine before others. — Matthew 5:16</p>
            </div>
            
            <p className="text-[9px] uppercase tracking-[0.2em] text-espresso/30 mt-8">
              &copy; {new Date().getFullYear()} TheFinestBakehouse. Handcrafted for you.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
