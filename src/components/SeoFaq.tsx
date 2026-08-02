import { useEffect, useState } from "react";

export type SeoFaqItem = { question: string; answer: string };

export default function SeoFaq({ items, dark = false }: { items: SeoFaqItem[]; dark?: boolean }) {
  const [open, setOpen] = useState(0);
  useEffect(() => {
    document.getElementById("campin-faq-jsonld")?.remove();
    const script = document.createElement("script");
    script.id = "campin-faq-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) });
    document.head.appendChild(script);
    return () => document.getElementById("campin-faq-jsonld")?.remove();
  }, [items]);
  return <section className={dark ? "bg-forest text-white" : "bg-white text-forest"} aria-labelledby="faq-heading"><div className="mx-auto max-w-4xl px-4 py-14 sm:px-6"><p className="text-sm font-black uppercase tracking-[0.18em] text-orange">CampIn answers</p><h2 id="faq-heading" className="mt-2 text-3xl font-black">Frequently asked questions</h2><div className="mt-7 divide-y divide-current/10 rounded-lg border border-current/10">{items.map((item, index) => <div key={item.question}><button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-black"><span>{item.question}</span><span className="text-xl text-orange">{open === index ? "-" : "+"}</span></button>{open === index && <p className="px-5 pb-5 text-sm leading-7 opacity-75">{item.answer}</p>}</div>)}</div></div></section>;
}
