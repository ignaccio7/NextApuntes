"use client"

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  currentTab?: number
  tabOptions? : number []
}

export const TabBar = ({ tabOptions=[1,2,3,4], currentTab = 1 } : Props) => {

  const [ selected, setSelected ] = useState(currentTab)

  const router = useRouter()

  const onTabSelected = (tab:number) => {
    setSelected(tab)

    // Para manejar las cookies desde el cliente
    // lo haremos con una dependencia
    // npm i cookies-next
    // de esta manera establecemos una cookie
    setCookie('selectedTab', tab.toString())
    router.refresh()
  }


  return (
    <ul className="flex flex-wrap gap-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      {tabOptions.map((tab) => {
        return (
          <li key={tab} className="me-2">
            <label
              onClick={() => onTabSelected(tab)}
              className={`inline-block px-4 py-3 text-white ${tab === selected ? 'bg-black' : 'bg-gray-400'} rounded-lg hover:bg-black cursor-pointer`}
              aria-current="page"
            >
              Tab {tab}
            </label>
          </li>
        );
      })}
    </ul>
  );
};
