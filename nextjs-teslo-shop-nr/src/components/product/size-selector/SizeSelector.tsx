'use client'

import { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize: Size
  availableSizes: Size[] // ['SX', 'M', 'XL', ...]
  onSizeChanged: (size:Size) => void
}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChanged }: Props) => {


  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>

      <div className="flex gap-1">
        {
          availableSizes.map(size => {
            
            return(
              <button 
                key={size} 
                onClick={ () => onSizeChanged(size) }
                className={
                  clsx(
                    "hover:underline text-lg p-1 w-auto h-auto",
                    {
                      "outline-dashed outline-1 outline-blue-400": size === selectedSize
                    }
                  )
                }>
                {size}
              </button>
            )
          })
        }
      </div>
    </div>
  );
};
