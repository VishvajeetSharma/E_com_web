import NavMegaMenu from "@/Pages/seller/components/SellerHeader";
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Truck,
  Megaphone,
  Ban,
  Eye,
  Mail,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/Pages/seller/components/animated-testimonials";
import { Footer } from "@/components/layout/Footer";

const categories = [
  "Sell Sarees Online",
  "Sell Jewellery Online",
  "Sell Tshirts Online",
  "Sell Shirts Online",
  "Sell Watches Online",
  "Sell Electronics Online",
  "Sell Clothes Online",
  "Sell Socks Online",
];
const features = [
  {
    icon: Truck,
    title: "Efficient Shipping",
    desc: "Deliver across India with fast and affordable logistics.",
  },
  {
    icon: Megaphone,
    title: "Ads to Grow",
    desc: "Boost visibility and increase product sales easily.",
  },
  {
    icon: TrendingUp,
    title: "Next Day Dispatch",
    desc: "Faster shipping with priority dispatch programs.",
  },
  {
    icon: Eye,
    title: "Business Insights",
    desc: "Track performance with smart analytics & reports.",
  },
];

const benefits = [
  {
    icon: Sparkles,
    title: "Zero Commission",
    desc: "Keep 100% of your profits with no hidden fees.",
  },
  {
    icon: ShieldCheck,
    title: "No Penalties",
    desc: "Sell stress-free without cancellation charges.",
  },
  {
    icon: TrendingUp,
    title: "Grow Faster",
    desc: "Scale your brand from local to global audience.",
  },
  {
    icon: Truck,
    title: "Easy Fulfillment",
    desc: "Smooth shipping & fast delivery experience.",
  },
];

const steps = [
  {
    title: "Create Account",
    desc: "Sign up with basic details and start your seller journey.",
  },
  {
    title: "List Products",
    desc: "Upload your products easily through seller dashboard.",
  },
  {
    title: "Get Orders",
    desc: "Start receiving orders from customers across India.",
  },
  {
    title: "Affordable Shipping",
    desc: "Enjoy low-cost and reliable delivery services.",
  },
  {
    title: "Receive Payments",
    desc: "Get payments directly in your bank account quickly.",
  },
];

const rewards = [
  {
    icon: Megaphone,
    title: "₹600 Free Visibility",
    desc: "Boost your products and reach more buyers instantly.",
  },
  {
    icon: Ban,
    title: "No Cancellation Fees",
    desc: "Cancel orders without worrying about penalties.",
  },
];

const testimonial = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Home = () => {
  return (
    <div className="overflow-x-clip">
      <NavMegaMenu />
      <div className="max-w-7xl mx-auto text-center  z-10 mt-15">
        <h2 className="text-4xl md:text-5xl font-black text-zinc-900 ">
          Our Happy{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#812D3A] to-[#812D3A]">
            Sellers
          </span>
        </h2>
      </div>
      <AnimatedTestimonials testimonials={testimonial} />
      <section className="relative  px-6 overflow-hidden bg-linear-to-br from-[#FAF7F2] via-white to-[#FAF7F2]">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#C6A46A]/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#C6A46A]/30 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">

  {/* ── Why Sellers Love ── */}
  <div className="grid md:grid-cols-2 gap-16 items-center">
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-[#C6A46A] mb-3 font-google">
        Why choose us
      </p>
      <h2 className="text-4xl md:text-5xl font-black text-zinc-900 leading-tight font-google">
        Why Sellers Love{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A46A] via-[#C6A46A] to-[#812D3A]">
          Darling Desire
        </span>
      </h2>
      <p className="mt-5 text-zinc-400 max-w-md text-sm md:text-base leading-relaxed font-google">
        Everything you need to grow your fashion business — from zero
        commission to seamless logistics and faster payouts.
      </p>
      <div className="mt-8 flex items-center gap-6">
        <div>
          <p className="text-2xl font-black text-zinc-900 font-google">4,800+</p>
          <p className="text-xs text-zinc-400 mt-0.5 font-google">Active sellers</p>
        </div>
        <div className="w-px h-10 bg-zinc-100" />
        <div>
          <p className="text-2xl font-black text-zinc-900 font-google">₹0</p>
          <p className="text-xs text-zinc-400 mt-0.5 font-google">Commission fee</p>
        </div>
        <div className="w-px h-10 bg-zinc-100" />
        <div>
          <p className="text-2xl font-black text-zinc-900 font-google">48h</p>
          <p className="text-xs text-zinc-400 mt-0.5 font-google">Payout cycle</p>
        </div>
      </div>
    </div>

    <div className="grid sm:grid-cols-2 gap-4">
      {benefits.map((b, i) => (
        <div
          key={i}
          className="group p-5 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
        >
          {/* soft icon bg instead of heavy gradient */}
          <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#FAF7F2] text-[#C6A46A] mb-4 group-hover:bg-[#E8D9C9] transition-colors">
            <b.icon className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-zinc-800 font-google">{b.title}</h4>
          <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-google">{b.desc}</p>
        </div>
      ))}
    </div>
  </div>

  {/* ── Divider ── */}
  <div className="my-20 h-px bg-gradient-to-r from-transparent via-zinc-100 to-transparent" />

  {/* ── Exclusive Seller Rewards ── */}
  <div className="grid md:grid-cols-3 gap-10 items-start">
    <div className="md:sticky md:top-28">
      <p className="text-xs font-bold uppercase tracking-widest text-[#C6A46A] mb-3 font-google">
        Perks for you
      </p>
      <h3 className="text-3xl font-black text-zinc-900 leading-tight font-google">
        Exclusive Seller Rewards
      </h3>
      <p className="text-zinc-400 mt-3 text-sm leading-relaxed font-google">
        Special perks for your first 30 days on Darling Desire
      </p>
      {/* soft outline button instead of filled gradient */}
      <button className="mt-6 px-5 py-2.5 border border-[#E8D9C9] text-[#812D3A] bg-[#FAF7F2] hover:bg-[#E8D9C9] text-xs font-bold rounded-xl transition font-google">
        Claim rewards →
      </button>
    </div>

    <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
      {rewards.map((r, i) => (
        <div
          key={i}
          className="group p-5 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
        >
          <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#FAF7F2] text-[#C6A46A] mb-4 group-hover:bg-[#FAF7F2] group-hover:text-[#C6A46A] transition-all">
            <r.icon className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-zinc-800 font-google">{r.title}</h4>
          <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-google">{r.desc}</p>
        </div>
      ))}
    </div>
  </div>

</div>
      </section>
      <section className="relative py-24 px-6 bg-white overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-125 h-50 bg-[#E8D9C9]/30 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 mb-16">
            How it{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#812D3A] to-[#812D3A]">
              works
            </span>
          </h2>

          <div className="relative">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-linear-to-r from-[#C6A46A] to-[#812D3A]" />

            <div className="grid md:grid-cols-5 gap-10">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div
                    className="z-10 w-12 h-12 flex items-center justify-center rounded-full 
                bg-linear-to-r from-[#812D3A] to-[#812D3A] text-white font-bold shadow-lg"
                  >
                    {i + 1}
                  </div>

                  <div className="mt-6 p-5 rounded-2xl bg-white/70 backdrop-blur-xl border border-zinc-200 shadow-lg hover:shadow-xl transition-all">
                    <h4 className="font-semibold text-zinc-900">
                      {step.title}
                    </h4>
                    <p className="text-sm text-zinc-500 mt-2">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-24 px-6 bg-linear-to-br from-zinc-50 via-white to-[#FAF7F2] overflow-hidden">
        <div className="absolute left-0 top-10 w-72 h-72 bg-[#C6A46A]/20 blur-[120px] rounded-full" />
        <div className="absolute right-0 bottom-10 w-72 h-72 bg-[#C6A46A]/20 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          {/* LEFT TEXT */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 leading-tight">
              Grow Your Business With{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#812D3A] to-[#812D3A]">
                Darling Desire
              </span>
            </h2>

            <p className="mt-6 text-zinc-600 max-w-md">
              Powerful tools and smart features to help you scale your online
              business faster and smarter.
            </p>
          </div>

          {/* RIGHT CARDS */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((item, i) => (
              <div
                key={i}
                className="group p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                {/* ICON */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-r from-[#812D3A] to-[#812D3A] text-white mb-4">
                  <item.icon className="w-6 h-6" />
                </div>

                {/* TEXT */}
                <h4 className="font-bold text-lg text-zinc-900">
                  {item.title}
                </h4>

                <p className="text-sm text-zinc-500 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-linear-to-br from-white via-zinc-50 to-[#FAF7F2] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-zinc-900">
              Popular Categories to Sell Online
            </h2>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  className="cursor-pointer text-sm font-medium text-zinc-600 hover:text-[#812D3A] transition"
                >
                  {cat}
                </div>
              ))}
            </div>

            <button className="mt-6 flex items-center justify-center mx-auto text-[#812D3A] font-semibold hover:underline">
              View More <ArrowRight className="ml-1 w-4 h-4" />
            </button>
          </div>

          <div
            className="grid md:grid-cols-2 gap-12 items-center 
        bg-white/70 backdrop-blur-xl border border-zinc-200 rounded-3xl p-10 shadow-xl"
          >
            <div>
              <h3 className="text-3xl font-bold text-zinc-900">
                24/7 Seller Support
              </h3>
              <p className="mt-4 text-zinc-600">
                Our support team is always ready to help you before and after
                you start your selling journey.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-r from-[#812D3A] to-[#812D3A] text-white">
                <Mail className="w-5 h-5" />
              </div>

              <div>
                <p className="text-sm text-zinc-500">Contact us at</p>
                <p className="font-semibold text-[#812D3A]">
                  support@darlingdesire.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="dd-home dd-home-footer"><Footer /></div>
    </div>
  );
};

export default Home;
