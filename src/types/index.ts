export interface Product {
  productName: string;
  description: string;
  pros: string[];
  cons: string[];
  alibabaSearchKeywords: string[];
  imageBase64: string; // Nuevo campo para la imagen generada por IA
}

export interface ProductResponse {
  products: Product[];
}