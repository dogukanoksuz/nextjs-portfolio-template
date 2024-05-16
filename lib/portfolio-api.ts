import path from "path";
import fs from "fs";
import { PortfolioCategories, PortfolioItem } from "@/types/portfolio-item";

const portfolio = path.join(process.cwd(), "_portfolio");

function getPortfolioItem(
  item: "items" | "categories",
  lang: "tr" | "en" = "tr"
) {
  return fs.readFileSync(path.join(portfolio, `${item}_${lang}.json`), "utf-8");
}

export default function getPortfolioItems(lang: "tr" | "en" = "tr"): PortfolioItem[] {
  return JSON.parse(getPortfolioItem("items", lang));
}

export function getPortfolioCategories(lang: "tr" | "en" = "tr"): PortfolioCategories {
  return JSON.parse(getPortfolioItem("categories", lang));
}

export function getPortfolioItemById(id: string, lang: "tr" | "en" = "tr"): PortfolioItem | undefined {
  return getPortfolioItems(lang).find((item: PortfolioItem) => item.id === id);
}
