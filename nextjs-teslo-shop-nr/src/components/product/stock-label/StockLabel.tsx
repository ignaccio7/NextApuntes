"use client";
import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { sleep } from "@/utils";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export function StockLabel({ slug }: Props) {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getStock = async () => {
    await sleep(2);

    const inStock = await getStockBySlug(slug);
    console.log(inStock);

    setStock(inStock);
    setIsLoading(false);
  };

  useEffect(() => {
    getStock();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1 className={`${titleFont.className} animate-pulse bg-gray-300`}>
          &nbsp;
        </h1>
      ) : (
        <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
          Stock: {stock}
        </h1>
      )}
    </>
  );
}
