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
  ArrowRight,
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  CheckCircle2
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  perUnit?: string;
  isCustom?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: "cakes",
    name: "Custom Cakes",
    price: 0,
    isCustom: true,
    description: "Sophisticated designs tailored to your grandest narratives. From minimal elegance to floral overloads.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
    category: "Bespoke"
  },
  {
    id: "cupcakes",
    name: "Gourmet Cupcakes",
    price: 35,
    perUnit: "dozen",
    description: "Gourmet treats defined by silk-like frosting and intentional flavor profiles.",
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=800&auto=format&fit=crop",
    category: "Treats"
  },
  {
    id: "cookies",
    name: "Artisanal Cookies",
    price: 24,
    perUnit: "dozen",
    description: "Refined recipes that bridge the gap between comfort and luxury. Perfect for gifting.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop",
    category: "Treats"
  },
  {
    id: "brownies",
    name: "Luxury Brownies",
    price: 28,
    perUnit: "half-dozen",
    description: "Deep, rich espresso-infused chocolate brownies with a crackle top and fudgy heart.",
    image: "https://images.unsplash.com/photo-1464305795204-6f5bdf7f8740?q=80&w=800&auto=format&fit=crop",
    category: "Treats"
  },
  {
    id: "macarons",
    name: "French Macarons",
    price: 32,
    perUnit: "dozen",
    description: "Delicate almond meringue shells with seasonal ganache fillings. A Parisian classic.",
    image: "https://images.unsplash.com/photo-1569864358642-9d1619702683?q=80&w=800&auto=format&fit=crop",
    category: "Specialties"
  },
  {
    id: "loaf-cakes",
    name: "Signature Loaf Cakes",
    price: 18,
    perUnit: "loaf",
    description: "Dense, moist, and deeply flavored. Perfect for high-tea or elegant morning gatherings.",
    image: "https://images.unsplash.com/photo-1558485940-02206775f0a0?q=80&w=800&auto=format&fit=crop",
    category: "Specialties"
  }
];

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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedMessage, setAddedMessage] = useState<string | null>(null);

  const targetRef = useRef(null);

  const addToCart = (product: Product) => {
    if (product.isCustom) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    setAddedMessage(product.name);
    setTimeout(() => setAddedMessage(null), 3000);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
      
      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-espresso/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full max-w-md bg-ivory z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-8 flex justify-between items-center border-b border-gold/10">
                <h2 className="font-serif text-2xl text-espresso tracking-wide">Your Selection</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gold/10 rounded-full transition-colors">
                  <X className="w-5 h-5 text-espresso" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                    <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
                    <p className="font-serif text-xl">Your basket is empty</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-xs uppercase tracking-widest font-bold text-gold"
                    >
                      Return to Gallery
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div 
                      layout
                      key={item.id} 
                      className="flex gap-6 group"
                    >
                      <div className="w-24 h-24 flex-shrink-0 bg-blush rounded-sm overflow-hidden">
                        <img src={item.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-serif text-lg text-espresso">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1">
                            <Trash2 className="w-4 h-4 text-burgundy" />
                          </button>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-espresso/40 mb-4">${item.price} per {item.perUnit}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gold/20 rounded-full px-3 py-1 scale-90 -ml-2">
                            <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-gold transition-colors"><Minus className="w-3 h-3" /></button>
                            <span className="w-8 text-center text-xs font-medium tabular-nums">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-gold transition-colors"><Plus className="w-3 h-3" /></button>
                          </div>
                          <span className="text-xs font-bold text-espresso ml-auto tracking-wide">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 border-t border-gold/10 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs uppercase tracking-widest font-bold text-espresso/40">Subtotal</span>
                    <span className="font-serif text-2xl text-espresso tracking-tight">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-espresso text-ivory text-[10px] uppercase tracking-[0.3em] font-bold py-6 group relative overflow-hidden flex items-center justify-center gap-3"
                  >
                    Proceed to Inquiry
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                  </button>
                  <p className="text-[9px] text-center mt-4 text-espresso/30 italic">Delivery within Maryland available. All items baked with intention.</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Added to Cart Notification */}
      <AnimatePresence>
        {addedMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[150] bg-espresso text-ivory px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 border border-gold/20"
          >
            <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-ivory" />
            </div>
            <span className="text-xs font-bold tracking-widest uppercase">{addedMessage} Added</span>
          </motion.div>
        )}
      </AnimatePresence>
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
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-espresso hover:text-gold transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-ivory text-[8px] flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
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
      <section id="specialties" className="py-32 bg-white relative">
        <div className="absolute inset-0 mesh-gradient opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <FadeInWhenVisible>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div className="max-w-2xl">
                <span className="text-gold uppercase tracking-[0.4em] text-[10px] block mb-4">The Collection</span>
                <h2 className="font-serif text-5xl md:text-7xl text-espresso">Bespoke Creations</h2>
              </div>
              <p className="text-espresso/50 text-sm max-w-xs leading-relaxed italic">
                Explore our artisanal selection. Each item is handcrafted to order with the finest ingredients.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 max-w-7xl mx-auto">
            {PRODUCTS.map((product, idx) => (
              <div key={product.id} className="group relative">
                <FadeInWhenVisible delay={idx * 0.1}>
                  <div className="aspect-[4/5] mb-8 overflow-hidden relative rounded-sm">
                    <ImageOrPlaceholder 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full" 
                    />
                    <div className="absolute inset-0 bg-espresso/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center gap-4">
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-ivory text-espresso text-[10px] uppercase tracking-[0.2em] px-8 py-3.5 font-bold hover:bg-gold hover:text-ivory transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                      >
                        {product.isCustom ? "Inquire Now" : "Add to Basket"}
                      </button>
                    </div>
                    {!product.isCustom && (
                      <div className="absolute top-4 right-4 bg-ivory/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                        <span className="text-[10px] font-bold text-espresso tracking-tighter">${product.price}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-gold uppercase tracking-[0.2em] text-[9px] font-bold block mb-1">{product.category}</span>
                      <h3 className="font-serif text-3xl text-espresso group-hover:text-gold transition-colors duration-500">{product.name}</h3>
                    </div>
                    {product.isCustom ? (
                      <div className="p-2 border border-gold/10 rounded-full">
                        <Star className="w-4 h-4 text-gold/30" />
                      </div>
                    ) : (
                      <ShoppingBag className="w-5 h-5 text-gold/20 group-hover:text-gold transition-colors" />
                    )}
                  </div>
                  <p className="text-espresso/60 text-sm leading-relaxed mb-6 font-medium">
                    {product.description}
                  </p>
                </FadeInWhenVisible>
              </div>
            ))}
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
                        <input type="text" className="w-full bg-ivory border-none p-4 text-sm focus:ring-1 focus:ring-gold outline-none transition-all" placeholder="e.g. Wedding, Birthday" />
                      </div>
                    </div>
                    {cart.length > 0 && (
                      <div className="bg-blush/30 p-6 rounded-lg pointer-events-none">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-gold block mb-4">Your Basket Selection</span>
                        <div className="space-y-2">
                          {cart.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-xs">
                              <span className="text-espresso/80 font-medium">{item.name} x {item.quantity}</span>
                              <span className="text-gold font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="pt-4 border-t border-gold/10 flex justify-between items-center font-bold">
                            <span className="text-espresso uppercase tracking-widest text-[10px]">Total Inquiry</span>
                            <span className="text-espresso">${cartTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/60">Message / Vision</label>
                      <textarea rows={4} className="w-full bg-ivory border-none p-4 text-sm focus:ring-1 focus:ring-gold outline-none transition-all resize-none" placeholder={cart.length > 0 ? "Tell us more about your event details and preferences..." : "Describe your vision, flavor preferences, and event date..."}></textarea>
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
