import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getSummaryInformation: () => {
    subTotal:number
    tax:number
    total:number
    itemsInCart: number
  }

  getTotalItems: () => number;

  addProductToCart: (product: CartProduct) => void;

  updateProductInCart: (product: CartProduct, quantity: number) => void;

  removeProductInCart: (product: CartProduct) => void;
  
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      //Methods

      getSummaryInformation: () => {
        const { cart } = get()

        const subTotal = cart.reduce((subtotal, product)=>{
          return subtotal + (product.quantity * product.price)
        },0)

        const tax = subTotal * 0.15
        const total = subTotal + tax

        const itemsInCart = cart.reduce((total, product)=>{
          return total + (product.quantity)
        },0)

        return {
          subTotal,
          itemsInCart,
          tax,
          total
        }
      },

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => {
          return total + item.quantity;
        }, 0);
      },

      addProductToCart: (product: CartProduct) => {
        console.log("Producto es:");
        console.log(product);

        const { cart } = get();

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some((item) => {
          return item.id === product.id && item.size === product.size;
        });

        if (!productInCart) {
          console.log("Entra primera vez");
          set({ cart: [...cart, product] });
          return;
        }

        //2. Sabemos que el producto existe por talla INCREMENTAR
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        console.log(updatedCartProducts);

        set({ cart: updatedCartProducts });
      },

      updateProductInCart: (product, quantity) => {
        const { cart } = get();
        const newCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            item.quantity = quantity;
          }
          return item;
        });

        set({
          cart: newCart,
        });
      },

      removeProductInCart: (product) => {
        const { cart } = get();
        const newCart = cart.filter((item) => {
          return (item.id !== product.id) || (item.size !== product.size);
        });

        set({
          cart: newCart,
        });
      },

      clearCart() {
        set({
          cart: []
        })
      },
    }),

    {
      name: "shopping-cart",
    }
  )
);
