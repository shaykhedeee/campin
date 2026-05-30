import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Shield, Users, MapPin, Zap } from 'lucide-react';

const supportMethods = [
  {
    title: 'Razorpay',
    desc: 'One-time fuel via UPI, card, or wallet',
    icon: '💳',
    color: 'bg-blue-50 border-blue-100',
    action: 'Support via Razorpay'
  },
  {
    title: 'Patreon',
    desc: 'Monthly fuel and get exclusive access',
    icon: '🎨',
    color: 'bg-orange/5 border-orange/10',
    action: 'Become a Patron'
  },
  {
    title: 'UPI Direct',
    desc: 'Send fuel directly to campin@razorpay',
    icon: '📱',
    color: 'bg-forest/5 border-forest/10',
    action: 'Copy UPI ID'
  },
];

const whatSupportEnables = [
  {
    icon: MapPin,
    title: 'Manual Review',
    desc: 'We personally audit every listing and verify Google Pins to ensure absolute safety.'
  },
  {
    icon: Users,
    title: 'Community Meetups',
    desc: 'Organizing authentic campfire gatherings to reconnect displaced outdoor souls.'
  },
  {
    icon: Shield,
    title: 'Road Network',
    desc: 'Mapping and verifying every km of highway to build Indias first safe road stop network.'
  },
  {
    icon: Zap,
    title: 'Platform Tech',
    desc: 'Building the digital home for Indias outdoor identity, optimized for disconnection.'
  },
];

export default function Support() {
  return (
    <div className="min-h-screen bg-offwhite">
      {/* Hero */}
      <section className="bg-forest text-white pt-40 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-orange/20 mb-8 border border-orange/10 rotate-3">
            <Heart size={32} className="text-orange" />
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-8 leading-[0.85] uppercase italic">
            Support <br /> <span className="text-orange">CampIn</span>
          </h1>
          <p className="text-white/60 text-xl sm:text-2xl font-medium leading-relaxed max-w-2xl mx-auto italic">
            "You are not donating. You are fueling a movement to give India's outdoor soul a home."
          </p>
        </div>
      </section>

      {/* Support Methods */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {supportMethods.map(method => (
            <div key={method.title} className={`rounded-[2.5rem] p-10 border-4 ${method.color} shadow-2xl bg-white hover:-translate-y-2 transition-all duration-500`}>
              <div className="text-5xl mb-6">{method.icon}</div>
              <h3 className="font-black text-forest text-2xl mb-2 uppercase italic">{method.title}</h3>
              <p className="text-textgrey font-medium mb-8 leading-relaxed italic">"{method.desc}"</p>
              <button className="w-full bg-forest hover:bg-forest-light text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all italic text-sm">
                {method.action}
              </button>
            </div>
          ))}
        </div>

        {/* Enabling Section */}
        <div className="mt-40">
          <div className="text-center mb-24">
            <p className="text-orange font-black uppercase tracking-[0.4em] text-[10px] mb-8 italic">The Disconnection Fund</p>
            <h2 className="text-5xl sm:text-7xl font-black text-forest uppercase italic leading-[0.85]">What your <br /> fuel <span className="text-orange underline decoration-orange/20 decoration-8 underline-offset-8">Enables</span></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whatSupportEnables.map(item => (
              <div key={item.title} className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-50 hover:bg-forest transition-all duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-forest/5 flex items-center justify-center mb-6 text-orange group-hover:bg-white/10">
                  <item.icon size={28} />
                </div>
                <h3 className="font-black text-forest group-hover:text-white uppercase italic text-lg mb-3 tracking-tight">{item.title}</h3>
                <p className="text-textgrey group-hover:text-white/60 font-medium text-sm leading-relaxed italic">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Community Story */}
        <div className="mt-40 bg-forest rounded-[4rem] p-12 sm:p-24 text-center relative overflow-hidden shadow-2xl shadow-forest/30">
           <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <img src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1600&q=80" alt="" className="w-full h-full object-cover" />
            </div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-10 leading-tight uppercase italic">
              This is bigger than a <span className="text-orange">Startup</span>
            </h2>
            <div className="space-y-8 text-white/70 text-lg sm:text-xl font-medium leading-relaxed italic mb-16">
              <p>
                CampIn exists because we believe the best experiences in India happen outdoors — on farms, in forests, beside rivers, under stars. Not in crowded lobbies.
              </p>
              <p>
                By supporting CampIn, you are helping build the infrastructure that makes disconnection possible. Safe stops for road trippers. Verified hosts for families. A community that welcomes every displaced soul.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/signup"
                className="w-full sm:w-auto bg-orange hover:bg-orange-dark text-white px-12 py-6 rounded-[2rem] text-sm font-black uppercase tracking-widest transition-all duration-500 italic shadow-xl shadow-orange/20"
              >
                Join the Movement <ArrowRight size={20} />
              </Link>
              <Link
                to="/explore"
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border-2 border-white/20 px-12 py-6 rounded-[2rem] text-sm font-black uppercase tracking-widest transition-all duration-500 italic"
              >
                Explore Sanctuary <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
