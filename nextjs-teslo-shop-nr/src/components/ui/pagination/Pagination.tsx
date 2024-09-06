"use client";

import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

export function Pagination({ totalPages }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get("page") ?? 1
  let currentPage = isNaN(+pageString) ? 1 : +pageString;
  // if(currentPage < 1) currentPage = 1
  if (currentPage < 1 || isNaN(+pageString) ) {
    redirect( pathname );
  }

  console.log({currentPage, totalPages})
  let allPages = generatePaginationNumbers(currentPage, totalPages);
  console.log(allPages);

  if(!allPages) { allPages = [] }

  /*const [loaded,setLoaded]=useState(false)
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!loaded) return "cargando..."; // Esto para no tener problemas con la hidratacion ya que si es componente de cliente el servidor puede renderizar algo y el cliente otra cosa y ahi hay choque
  */

  console.log({ pathname, searchParams, currentPage });

  // esto es lo que pondremos en la url de los enlaces
  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") {
      return `${pathname}?${params.toString()}`;
    }

    if (+pageNumber <= 0) {
      return `${pathname}`; // href="/" o "/men" o "/women" o etc
    }

    if (+pageNumber > totalPages) {
      // Next >
      return `${pathname}?${params.toString()}`;
    }

    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center my-8">
      <div className="max-w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-center">
          <nav className="flex space-x-2" aria-label="Pagination">
            <Link
              href={createPageUrl(currentPage - 1)}
              className="relative inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-gray-700 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
            >
              <IoChevronBackOutline />
            </Link>

            {allPages.map((page, index) => {              
              let isActive = (page === currentPage)
              console.log({isActive})
              return (
                <Link
                  key={page}
                  href={ createPageUrl(page) }
                  className={
                    clsx(
                      "relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-300 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:shadow-outline-blue focus:border-blue-300",
                      {
                        "bg-blue-600 text-white": isActive
                      }
                    )
                  }
                >
                  {page}
                </Link>
              );
            })}

            <Link
              href={createPageUrl(currentPage + 1)}
              className="relative inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-gray-700 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
            >
              <IoChevronForwardOutline />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
