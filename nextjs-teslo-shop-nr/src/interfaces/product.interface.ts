export interface Product {
  id: string
  title: string;
  description: string;
  inStock: number;
  price: number;
  slug: string;
  gender: Category | String;  
  categoryId?: String;
  sizes: Size[];
  tags: string[];
  images: string[];
  // type: Type;
  // gender: "men" | "women" | "kid" | "unisex";
}

export type Category = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Type = "shirts" | "pants" | "hoodies" | "hats";
