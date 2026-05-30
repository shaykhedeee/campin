import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle, Clock, ExternalLink, Search, Shield } from "lucide-react";
import { getBlogPost, getRelatedBlogPosts } from "../data/blogPosts";

export default function BlogPost() {
  const { slug = "" } = useParams();
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-offwhite pt-28">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <p className="font-black text-orange">Post not found</p>
          <h1 className="mt-3 text-4xl font-black text-forest">This CampIn article is not live yet.</h1>
          <Link
            to="/blog"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-orange px-5 py-3 font-black text-white"
          >
            Back to blog
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    );
  }

  const related = getRelatedBlogPosts(post.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: "CampIn" },
    publisher: { "@type": "Organization", name: "CampIn" },
    mainEntityOfPage: `/blog/${post.slug}`,
  };

  return (
    <article className="min-h-screen bg-offwhite pt-28">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <header className="border-b border-forest/10 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-black text-forest hover:text-orange">
            <ArrowLeft size={17} />
            CampIn Journal
          </Link>
          <p className="mt-6 inline-flex rounded-lg bg-orange/10 px-3 py-2 text-sm font-black text-orange">
            {post.category}
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight text-forest sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-textgrey">{post.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-bold text-textgrey">
            <span className="inline-flex items-center gap-2">
              <Calendar size={16} />
              {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock size={16} />
              {post.readTime}
            </span>
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <img src={post.heroImage} alt={post.title} className="aspect-[16/8] w-full rounded-2xl object-cover shadow-lg border border-forest/5" />
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <div className="min-w-0">
          <section className="rounded-2xl border border-orange/20 bg-orange/5 p-6 sm:p-8 backdrop-blur-sm">
            <p className="flex items-center gap-2.5 font-black text-forest">
              <Shield size={20} className="text-orange" />
              Quick Takeaway
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-forest/90">{post.directAnswer}</p>
          </section>

          <section className="mt-6 rounded-2xl border border-forest/10 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-black text-forest tracking-tight">Key Takeaways</h2>
            <div className="mt-4 space-y-3">
              {post.takeaways.map((takeaway) => (
                <div key={takeaway} className="flex gap-3">
                  <CheckCircle size={19} className="mt-1 shrink-0 text-orange" />
                  <p className="text-sm font-semibold leading-relaxed text-forest">{takeaway}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8 space-y-8">
            {post.sections.map((section) => (
              <section key={section.heading} className="scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-black leading-tight text-forest tracking-tight">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm sm:text-base leading-relaxed text-textgrey">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c2419] to-[#0a1e14] p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-orange/5 blur-2xl pointer-events-none" />
            <p className="text-xs font-black uppercase tracking-wider text-orange">CampIn Trust Policy</p>
            <h3 className="mt-2 text-xl font-black tracking-tight">CampIn Insights</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">{post.campinAngle}</p>
            
            <div className="mt-6 border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs leading-relaxed text-white/60 max-w-md">{post.cta.text}</p>
              <Link
                to={post.cta.href}
                className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-orange hover:bg-orange-dark px-5 py-3 text-sm font-black text-white transition-all shadow-[0_10px_20px_rgba(230,126,34,0.15)]"
              >
                {post.cta.label}
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl sm:text-3xl font-black text-forest tracking-tight">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-4">
              {post.faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-forest/10 bg-white p-5 sm:p-6 shadow-sm">
                  <h3 className="font-extrabold text-forest text-base sm:text-lg">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-textgrey">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-black text-forest tracking-tight">Verified References</h2>
            <div className="mt-4 grid gap-3">
              {post.sources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target={source.url.startsWith("http") ? "_blank" : undefined}
                  rel={source.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between gap-3 rounded-xl border border-forest/10 bg-white p-4 text-xs sm:text-sm font-bold text-forest hover:border-orange hover:text-orange transition-colors"
                >
                  <span className="truncate">{source.label}</span>
                  <ExternalLink size={15} className="shrink-0 text-orange" />
                </a>
              ))}
            </div>
          </section>
        </div>

        <aside className="min-w-0">
          <div className="sticky top-28 space-y-5">
            <div className="rounded-2xl border border-forest/10 bg-white p-5">
              <h2 className="font-black text-forest tracking-tight">Verified Parameters</h2>
              <div className="mt-4 space-y-3.5 text-xs text-textgrey">
                <div className="flex gap-2">
                  <span className="text-orange text-base">✓</span>
                  <div>
                    <strong className="text-forest">Explicit Host Permission</strong>
                    <p className="mt-0.5">We check local landholder agreements before publication.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-orange text-base">✓</span>
                  <div>
                    <strong className="text-forest">Washroom & Water Checks</strong>
                    <p className="mt-0.5">Physical confirmation of functional toilets and safe water.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-orange text-base">✓</span>
                  <div>
                    <strong className="text-forest">Local Caretaker Support</strong>
                    <p className="mt-0.5">24/7 on-ground assistance is mandatory for all camper corridors.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-forest/10 bg-white p-5">
              <h2 className="font-black text-forest tracking-tight">Related Articles</h2>
              <div className="mt-4 space-y-2.5">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/blog/${item.slug}`}
                    className="block rounded-xl bg-offwhite hover:bg-orange/5 p-3.5 text-xs font-extrabold leading-snug text-forest hover:text-orange transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(date));
}
