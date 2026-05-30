import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, Clock, Search, Shield, Sparkles, Tent } from "lucide-react";
import { blogPosts } from "../data/blogPosts";

const clusters = [
  "Own-Tent Camping",
  "Safe and Legal Camping",
  "Bangalore Camping",
  "Road Stops",
  "Comparisons",
  "Host Education",
];

export default function BlogIndex() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-offwhite pt-28">
      <section className="border-b border-forest/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-lg bg-orange/10 px-3 py-2 text-sm font-black text-orange">
              <BookOpen size={17} />
              CampIn Journal
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-forest sm:text-5xl">
              The practical guide to camping in India.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-textgrey">
              Safety-first, permission-first articles for own-tent campers, road travelers, families, hosts, and
              everyone trying to make camping in India less confusing.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {clusters.map((cluster) => (
                <span key={cluster} className="rounded-lg bg-offwhite px-3 py-2 text-sm font-bold text-forest">
                  {cluster}
                </span>
              ))}
            </div>
          </div>

          <Link
            to={`/blog/${featured.slug}`}
            className="group overflow-hidden rounded-lg border border-forest/10 bg-offwhite shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={featured.heroImage}
                alt={featured.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 rounded-lg bg-white px-3 py-1 text-sm font-black text-orange">
                Featured
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm font-black text-orange">{featured.category}</p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-forest">{featured.title}</h2>
              <p className="mt-3 text-sm leading-6 text-textgrey">{featured.summary}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-black text-forest group-hover:text-orange">
                Read guide
                <ArrowRight size={18} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-forest/10 bg-white p-5">
            <Search size={22} className="text-orange" />
            <h2 className="mt-4 font-black text-forest">Answer-first</h2>
            <p className="mt-2 text-sm leading-6 text-textgrey">Every post opens with a direct, useful answer.</p>
          </div>
          <div className="rounded-lg border border-forest/10 bg-white p-5">
            <Shield size={22} className="text-orange" />
            <h2 className="mt-4 font-black text-forest">Trust-labeled</h2>
            <p className="mt-2 text-sm leading-6 text-textgrey">Permission, safety, facilities, and unknowns stay visible.</p>
          </div>
          <div className="rounded-lg border border-forest/10 bg-white p-5">
            <Tent size={22} className="text-orange" />
            <h2 className="mt-4 font-black text-forest">CampIn-led</h2>
            <p className="mt-2 text-sm leading-6 text-textgrey">Each article points to waitlist, community, host, or road-stop validation.</p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-forest/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.heroImage}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-lg bg-white px-3 py-1 text-xs font-black text-orange">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-textgrey">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="mt-3 text-xl font-black leading-tight text-forest">{post.title}</h2>
                <p className="mt-3 line-clamp-4 text-sm leading-6 text-textgrey">{post.summary}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 font-black text-forest group-hover:text-orange">
                  Read post
                  <ArrowRight size={17} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-forest/10 bg-forest px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 font-black text-orange">
              <Sparkles size={18} />
              Want CampIn to verify a topic?
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
              Ask for a region, safety question, host guide, road-stop route, or comparison. The best questions become
              CampIn research and future pages.
            </p>
          </div>
          <Link
            to="/community"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange px-5 py-3 font-black text-white transition-colors hover:bg-orange-dark"
          >
            Join community
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(date));
}
