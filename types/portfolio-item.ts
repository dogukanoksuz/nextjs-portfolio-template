export interface PortfolioItem {
    id: string;
    name: string;
    thumbnail: string;
    description: string;
    category: keyof PortfolioCategories;
    details: {
        [key: string]: string;
    };
    images: string[];
}

export interface PortfolioCategories {
    [key: string]: string;
}