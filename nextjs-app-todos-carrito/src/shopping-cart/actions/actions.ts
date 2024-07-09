import { getCookie, hasCookie, setCookie } from "cookies-next";

// 'use client'
export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie("cart")) {
    const cookieCart = JSON.parse(getCookie("cart") ?? "{}");
    return cookieCart;
  }
  return {};
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (cookieCart[id]) {
    cookieCart[id] += 1;
  } else {
    cookieCart[id] = 1;
  }

  setCookie("cart", JSON.stringify(cookieCart));
};

export const removeProductToCart = (id: string) => {
  /*const cookieCart = getCookieCart()

  if(!cookieCart[id]) return

  const filteredCart = Object.entries(cookieCart).filter(([a,b],i) => a !== id)
  const newCart = Object.fromEntries(filteredCart)
  setCookie('cart', JSON.stringify(newCart))*/

  const cookieCart = getCookieCart();
  delete cookieCart[id];
  setCookie("cart", JSON.stringify(cookieCart));
};

export const removeSingleItemFromCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (!cookieCart[id]) return;

  if (cookieCart[id] === 1) {
    delete cookieCart[id];
  } else {
    cookieCart[id] -= 1;
  }
  setCookie("cart", JSON.stringify(cookieCart));
};
