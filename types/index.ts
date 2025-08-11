
export interface Product {
  productName: string;
  description: string;
  pros: string[];
  cons: string[];
  alibabaSearchKeywords: string[];
}

export interface ProductResponse {
  products: Product[];
}
