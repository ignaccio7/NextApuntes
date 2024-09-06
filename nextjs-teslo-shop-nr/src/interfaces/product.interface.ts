export interface Product {
  id: string
  title: string;
  description: string;
  inStock: number;
  price: number;
  slug: string;
  gender: Category | string;  
  categoryId?: string;
  sizes: Size[] | any;
  tags: string[] | any;
  images: string[];
  // type: Type;
  // gender: "men" | "women" | "kid" | "unisex";
}

export interface CartProduct {
  id:string
  slug:string
  title:string
  price: number
  quantity: number
  size: Size
  image: string
}

export interface ProductImage {
  id:number
  url:string
  productId?: string
}

type Category = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL" | undefined;
export type Type = "shirts" | "pants" | "hoodies" | "hats";

// export type Gender = "men" | "women" | "kid" | "unisex";
export enum Gender {
  Men = "men",
  Women = "women",
  Kid = "kid",
  Unisex = "unisex"
}