
"use client";
import { useState, useEffect } from "react";
import { Sparkles, Clock, Mail, ArrowRight, Heart } from "lucide-react";

export  function ComingSoon() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set launch date to 10 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 10);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#97cb4d] via-[#b8e986] to-[#7fb83d] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements - Lily Pads & Ripples */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl top-20 left-10 animate-pulse"></div>
        <div className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl bottom-32 right-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-80 h-80 bg-white/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating Lily Pads */}
        <div className="absolute w-32 h-32 bg-white/5 rounded-full top-1/4 left-1/4 animate-float"></div>
        <div className="absolute w-24 h-24 bg-white/5 rounded-full bottom-1/4 right-1/3 animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute w-40 h-40 bg-white/5 rounded-full top-2/3 left-2/3 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 max-w-5xl w-full">
        {/* Main Content */}
        <div className="text-center text-white">
          {/* Logo/Brand - Frog Theme */}
          <div className="mb-8 flex justify-center">
            <div className="relative animate-bounce-slow">
              <div className="text-8xl mb-4">🐸</div>
              <div className="absolute -top-4 -right-4 text-4xl animate-float">✨</div>
              <div className="absolute -bottom-2 -left-4 text-3xl animate-float" style={{ animationDelay: '1s' }}>💚</div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-4 animate-fade-in">
            <span className="text-white drop-shadow-lg">Ribbittt</span>
          </h1>
          
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-8 border-2 border-white/40">
            <p className="text-lg md:text-xl font-semibold">
              Kids Fashion That Makes You Hop with Joy! 🌟
            </p>
          </div>

          <p className="text-xl md:text-2xl mb-12 text-white/95 max-w-2xl mx-auto font-medium leading-relaxed">
            Get ready to leap into the world of adorable, comfortable, and 
            stylish clothing for your little ones. Something ribbiting is coming!
          </p>

          {/* Countdown Timer */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Clock className="w-7 h-7" />
              <span className="text-2xl font-bold">Hopping Live In</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/30 backdrop-blur-xl rounded-3xl p-6 md:p-8 border-2 border-white/50 shadow-2xl transform hover:scale-105 transition"
                >
                  <div className="text-5xl md:text-6xl font-bold mb-2 text-white drop-shadow-lg">
                    {item.value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm md:text-base text-white/90 font-semibold uppercase tracking-wide">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Subscription */}
          <div className="max-w-xl mx-auto mb-16">
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 border-2 border-white/40 shadow-2xl">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-6 h-6 fill-white" />
                <p className="text-xl font-bold">Be the First to Know!</p>
              </div>
              <p className="text-white/90 mb-6">
                Join our VIP list and get exclusive early access, special discounts, and ribbiting updates!
              </p>
              {subscribed ? (
                <div className="bg-white text-[#97cb4d] rounded-xl p-6 font-bold text-lg flex items-center justify-center gap-2 animate-fade-in">
                  <span className="text-2xl">🎉</span>
                  You're on the list! Get ready to hop into fashion!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 font-medium shadow-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-white text-[#97cb4d] rounded-xl font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Notify Me
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 border-2 border-white/30 hover:bg-white/30 transition transform hover:scale-105 shadow-xl">
              <div className="text-5xl mb-4">👶</div>
              <h3 className="font-bold text-xl mb-3">Comfort First</h3>
              <p className="text-white/90">
                Super soft, breathable fabrics that kids love to wear all day
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 border-2 border-white/30 hover:bg-white/30 transition transform hover:scale-105 shadow-xl">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="font-bold text-xl mb-3">Playful Designs</h3>
              <p className="text-white/90">
                Fun, colorful styles that spark imagination and creativity
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-8 border-2 border-white/30 hover:bg-white/30 transition transform hover:scale-105 shadow-xl">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="font-bold text-xl mb-3">Eco-Friendly</h3>
              <p className="text-white/90">
                Sustainable materials for a better tomorrow
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-12">
            <p className="mb-6 text-white/90 text-lg font-semibold">Follow Our Journey</p>
            <div className="flex justify-center gap-4">
              {[
                { icon: "f", label: "Facebook" },
                { icon: "𝕏", label: "Twitter" },
                { icon: "in", label: "LinkedIn" },
                { icon: "IG", label: "Instagram" }
              ].map((social, index) => (
                <button
                  key={index}
                  aria-label={social.label}
                  className="w-14 h-14 bg-white/30 backdrop-blur-xl rounded-full hover:bg-white/50 transition border-2 border-white/40 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-110"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Fun Footer Message */}
          <div className="mt-16 text-white/80 text-sm">
            <p>🐸 Ribbittt - Where Style Meets Play 🐸</p>
          </div>
        </div>
      </div>

      {/* Development Mode Indicator */}
      <div className="absolute bottom-6 right-6 bg-white text-[#97cb4d] px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-xl border-2 border-[#97cb4d]">
        <div className="w-2 h-2 bg-[#97cb4d] rounded-full animate-pulse"></div>
        Development Mode
      </div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}