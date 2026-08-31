import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { homeCategories } from "../../data/homeCategories";
import { mediaRegistry } from "../../data/mediaRegistry";
import { categoryHref } from "../../lib/exploreFilters";

export default function CategoryExplorer() {
  return (
    <section
      className="overflow-hidden border-b border-[#173525]/10 bg-[#fffaf0] py-16 sm:py-24"
      aria-labelledby="category-explorer-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-10">
        <div className="flex max-w-4xl items-end justify-between gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#A94F08]">Find your kind of outdoors</p>
            <h2
              id="category-explorer-heading"
              className="mt-3 font-serif text-4xl font-black tracking-[-0.045em] text-[#173525] sm:text-6xl"
            >
              Start with how you want to camp
            </h2>
          </div>
          <p className="hidden max-w-xs pb-2 text-sm font-medium leading-7 text-[#5f5f5f] md:block">
            Six useful ways into the same growing directory of camping places across India.
          </p>
        </div>

        <div className="no-scrollbar -mx-4 mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-8 sm:gap-6 sm:px-8 lg:mx-0 lg:mt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12 lg:overflow-visible lg:px-0 lg:pb-0">
          {homeCategories.map((category) => (
            <Link
              key={category.id}
              to={categoryHref(category.id)}
              className="light-surface-focus group min-w-[82%] snap-start sm:min-w-[46%] lg:min-w-0"
            >
              <article>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-[#dce9e1]">
                  <img
                    src={mediaRegistry[category.mediaKey].src}
                    alt={category.alt}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a1e14]/24 to-transparent" />
                </div>

                <div className="flex min-h-36 items-start justify-between gap-5 border-b border-[#173525]/18 py-5">
                  <div>
                    <h3 className="font-serif text-2xl font-bold leading-tight tracking-[-0.025em] text-[#173525] transition-colors group-hover:text-[#A94F08] group-focus-visible:text-[#A94F08] sm:text-3xl">
                      {category.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm font-medium leading-6 text-[#5f5f5f]">
                      {category.description}
                    </p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#173525]/30 text-[#173525] transition duration-300 group-hover:border-[#A94F08] group-hover:bg-[#A94F08] group-hover:text-white group-focus-visible:border-[#A94F08] group-focus-visible:bg-[#A94F08] group-focus-visible:text-white">
                    <ArrowUpRight aria-hidden="true" focusable="false" size={18} strokeWidth={2.25} />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
