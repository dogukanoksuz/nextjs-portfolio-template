import ImageCarousel from "@/components/image-carousel";
import getPortfolioItems, {
  getPortfolioCategories,
  getPortfolioItemById,
} from "@/lib/portfolio-api";
import { PortfolioItem as IPortfolioItem } from "@/types/portfolio-item";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return getPortfolioItems().map(({ id }: IPortfolioItem) => ({ id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const item = getPortfolioItemById(params.id);

  if (!item) {
    return {};
  }

  return {
    title: item.name,
    description: item.description,
  };
}

export default function PortfolioItem({ params }: { params: { id: string } }) {
  const item = getPortfolioItemById(params.id);

  if (!item) {
    return <div>Not found</div>;
  }

  const readableCategories = getPortfolioCategories();

  return (
    <div className="max-w-4xl mx-auto my-20">
      <div className="mb-10">
        <Link
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          href="/portfolio/all"
        >
          <ChevronLeftIcon className="mr-1.5 h-4 w-4" />
          Back to portfolio
        </Link>
      </div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-1">{item.name}</h1>
        <p className="text-lg text-gray-600 mb-2">{item.description}</p>
        <Link href={`/portfolio/${item.category}`}>
          <span className="rounded-2xl bg-gray-200 p-2 text-xs font-semibold py-1">
            {readableCategories[item.category]}
          </span>
        </Link>
      </header>

      <ImageCarousel images={item.images} />

      <div className="grid grid-cols-3 text-center mt-12">
        {Object.keys(item.details).map((key) => (
          <div key={key}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              {key}
            </h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {item.details[key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
