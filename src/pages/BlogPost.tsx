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
            <span className="inline-flex items-center gap-2">
              <Search size={16} />
              {post.primaryKeyword}
            </span>
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <img src={post.heroImage} alt={post.title} className="aspect-[16/8] w-full rounded-lg object-cover" />
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <div className="min-w-0">
          <section className="rounded-lg border border-orange/20 bg-orange/10 p-5">
            <p className="flex items-center gap-2 font-black text-forest">
              <Shield size={19} className="text-orange" />
              Direct answer
            </p>
            <p className="mt-3 text-base leading-7 text-forest">{post.directAnswer}</p>
          </section>

          <section className="mt-6 rounded-lg border border-forest/10 bg-white p-5">
            <h2 className="text-2xl font-black text-forest">Key Takeaways</h2>
            <div className="mt-4 space-y-3">
              {post.takeaways.map((takeaway) => (
                <div key={takeaway} className="flex gap-3">
                  <CheckCircle size={19} className="mt-1 shrink-0 text-orange" />
                  <p className="text-sm font-semibold leading-6 text-forest">{takeaway}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8 space-y-8">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-3xl font-black leading-tight text-forest">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-textgrey">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-8 rounded-lg bg-forest p-6 text-white">
            <p className="font-black text-orange">CampIn take</p>
            <p className="mt-3 text-base leading-7 text-white/75">{post.campinAngle}</p>
            <Link
              to={post.cta.href}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-orange px-5 py-3 font-black text-white transition-colors hover:bg-orange-dark"
            >
              {post.cta.label}
              <ArrowRight size={17} />
            </Link>
            <p className="mt-3 text-sm leading-6 text-white/62">{post.cta.text}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-3xl font-black text-forest">FAQs</h2>
            <div className="mt-4 space-y-3">
              {post.faqs.map((faq) => (
                <div key={faq.question} className="rounded-lg border border-forest/10 bg-white p-5">
                  <h3 className="font-black text-forest">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-textgrey">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-black text-forest">Sources</h2>
            <div className="mt-4 grid gap-3">
              {post.sources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target={source.url.startsWith("http") ? "_blank" : undefined}
                  rel={source.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between gap-3 rounded-lg border border-forest/10 bg-white p-4 text-sm font-bold text-forest hover:border-orange hover:text-orange"
                >
                  <span>{source.label}</span>
                  <ExternalLink size={16} className="shrink-0" />
                </a>
              ))}
            </div>
          </section>
        </div>

        <aside className="min-w-0">
          <div className="sticky top-28 space-y-5">
            <div className="rounded-lg border border-forest/10 bg-white p-5">
              <h2 className="font-black text-forest">Article Brief</h2>
              <div className="mt-4 space-y-3 text-sm leading-6 text-textgrey">
                <p>
                  <span className="font-black text-forest">Intent:</span> {post.searchIntent}
                </p>
                <p>
                  <span className="font-black text-forest">Audience:</span> {post.audience}
                </p>
                <p>
                  <span className="font-black text-forest">Schema:</span> {post.schema.join(", ")}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-forest/10 bg-white p-5">
              <h2 className="font-black text-forest">Related Guides</h2>
              <div className="mt-4 space-y-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/blog/${item.slug}`}
                    className="block rounded-lg bg-offwhite p-3 text-sm font-bold leading-5 text-forest hover:text-orange"
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
