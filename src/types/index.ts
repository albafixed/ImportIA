export interface Product {
  productName: string;
  description: string;
  pros: string[];
  cons: string[];
  alibabaSearchKeywords: string[];
  imageUrl: string;
}

export interface ProductResponse {
  products: Product[];
}

export interface EnrichedProductResponse {
    products: Product[];
}
