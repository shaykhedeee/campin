import { Link } from "react-router-dom";
import { ArrowRight, Camera, CreditCard, Heart, Mail, MapPin, Shield, Smartphone, Users, Zap } from "lucide-react";

const supportMethods = [
  {
    title: "Razorpay",
    desc: "One-time support through UPI, card, or wallet once the payment link is connected.",
    icon: CreditCard,
    action: "Coming soon",
    disabled: true,
  },
  {
    title: "Monthly backer",
    desc: "A small recurring contribution for verification, route mapping, and community tools.",
    icon: Heart,
    action: "Email to back",
    disabled: false,
  },
  {
    title: "UPI direct",
    desc: "Direct UPI support can be added after the business account and Razorpay are ready.",
    icon: Smartphone,
    action: "Coming soon",
    disabled: true,
  },
];

const whatSupportEnables = [
  {
    icon: Shield,
    title: "Host verification",
    desc: "Phone calls, pin checks, photo review, and first-stay supervision.",
  },
  {
    icon: MapPin,
    title: "Road-stop mapping",
    desc: "Finding safe parking, water, washrooms, and hosts along major Indian routes.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "WhatsApp groups, meetup coordination, beginner education, and feedback loops.",
  },
  {
    icon: Camera,
    title: "Real listing proof",
    desc: "Collecting useful photos of the actual pitch, washroom, parking, and approach.",
  },
];

export default function Support() {
  return (
    <div className="min-h-screen bg-offwhite pt-28 pb-20">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-forest p-6 text-white sm:p-10 lg:p-12">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=1800&q=80"
              alt="Desert camp under open sky"
              className="h-full w-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-forest/78" />
          </div>
          <div className="relative max-w-3xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange text-white">
              <Heart size={26} />
            </div>
            <p className="mt-6 font-bold text-orange">Support CampIn</p>
            <h1 className="mt-2 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Help build India's camping trust layer.
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/78">
              Early support should fund the work that makes the marketplace possible: host calls, route research, real
              listing proof, community operations, and a lean product that gets campers outside safely.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        {supportMethods.map((method) => (
          <div key={method.title} className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-offwhite text-orange">
              <method.icon size={24} />
            </div>
            <h2 className="mt-5 text-xl font-extrabold text-forest">{method.title}</h2>
            <p className="mt-2 min-h-20 text-sm leading-6 text-textgrey">{method.desc}</p>
            {method.disabled ? (
              <button
                type="button"
                disabled
                className="mt-5 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-forest/40 px-4 py-3 font-bold text-white"
              >
                {method.action}
              </button>
            ) : (
              <a
                href="mailto:support@campin.co.in?subject=Support%20CampIn%20-%20Monthly%20backer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-forest px-4 py-3 font-bold text-white transition-colors hover:bg-forest-light"
              >
                {method.action}
                <ArrowRight size={17} />
              </a>
            )}
          </div>
        ))}
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-bold text-orange">Transparency</p>
            <h2 className="mt-2 text-3xl font-extrabold text-forest sm:text-4xl">What early support should pay for.</h2>
            <p className="mt-4 text-base leading-7 text-textgrey">
              Support money should not disappear into vague brand spend. It should buy concrete trust work and help
              CampIn reach the proof points in the operating plan.
            </p>
            <div className="mt-6 rounded-2xl bg-sky-mist p-5">
              <p className="flex items-center gap-2 font-bold text-forest">
                <Zap size={19} className="text-orange" />
                First proof target
              </p>
              <p className="mt-2 text-sm leading-6 text-textgrey">
                300 camper signups, 30 host applications, and 3 manual booking attempts before building the full booking
                engine.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whatSupportEnables.map((item) => (
              <div key={item.title} className="rounded-2xl border border-forest/10 bg-white p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-offwhite text-orange">
                  <item.icon size={22} />
                </div>
                <h3 className="mt-4 font-extrabold text-forest">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-textgrey">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="font-bold text-orange">Want to help without money?</p>
            <h2 className="mt-2 text-3xl font-extrabold text-forest">Send one host lead or one road-stop lead.</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-textgrey">
              The most valuable early contribution is a real landowner, dhaba, farm, homestay, or route-side property
              that can become a reviewed CampIn place.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <a
              href="mailto:support@campin.co.in"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-5 py-3 font-bold text-white transition-colors hover:bg-forest-light"
            >
              <Mail size={18} />
              Send a lead
            </a>
            <Link
              to="/host-your-land"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-offwhite px-5 py-3 font-bold text-forest hover:text-orange"
            >
              Host form
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
