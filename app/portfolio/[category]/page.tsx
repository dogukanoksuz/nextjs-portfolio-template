import getPortfolioItems, { getPortfolioCategories } from "@/lib/portfolio-api";
import { Metadata } from "next";
import Link from "next/link";

const portfolioCategories = getPortfolioCategories();

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  return {
    title: portfolioCategories[params.category] || "Portfolio",
    description: "Check out my portfolio!",
  };
}

export async function generateStaticParams() {
  return Object.keys(getPortfolioCategories()).map((category) => ({
    category: category,
  }));
}

export default function Portfolio({
  params,
}: {
  params: { category: string };
}) {
  const portfolioCategories = getPortfolioCategories();
  const selectedCategory = params.category || "all";
  const items = getPortfolioItems().filter((item) => {
    if (selectedCategory === "all") {
      return true;
    }
    return item.category === selectedCategory;
  });

  return (
    <div className="mx-auto max-w-4xl my-20">
      <ul className="space-x-2 flex items-center mb-5">
        {Object.keys(portfolioCategories).map((category) => (
          <li key={category}>
            <Link
              className={`relative inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 ${
                selectedCategory === category ? "bg-gray-100 text-gray-900" : ""
              }`}
              href={`/portfolio/${category}`}
            >
              {portfolioCategories[category]}
            </Link>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-3 gap-6">
        {items.map((item) => (
          <Link key={item.id} href={`/portfolio/item/${item.id}`}>
            <div className="relative group overflow-hidden rounded-lg">
              <img
                alt={item.name}
                className="object-cover w-full h-60 group-hover:opacity-50 transition-opacity"
                height={300}
                src={item.thumbnail}
                style={{
                  aspectRatio: "400/300",
                  objectFit: "cover",
                }}
                width={400}
              />
              <div className="bg-white p-4">
                <h3 className="font-semibold text-lg md:text-xl">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {portfolioCategories[item.category]}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
