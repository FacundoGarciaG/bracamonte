import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
} from "../types";

import bracamole from "../assets/statics/images/base-bracamole.jpg";
import bracamonte from "../assets/statics/images/base-bracamonte.jpg";
import megamonte from "../assets/statics/images/base-megamonte.jpg";
import especial from "../assets/statics/images/base-especial.jpg";
import especialDoble from "../assets/statics/images/base-especial-doble.jpg";
import especialVegana from "../assets/statics/images/base-especial-vegana.jpg";
import napolitana from "../assets/statics/images/base-napolitana.jpg";
import napolitanaDoble from "../assets/statics/images/base-napolitana-doble.jpg";
import montana from "../assets/statics/images/base-montana.jpg";

export const initialState = {
  products: [
    {
      id: 1,
      name: "Bracamole",
      description:
        "Pan de calabaza - Medallón de porotos negros y zanahoria - Guacamole Bracamonte - Lechuga - Cheddar",
      vegan: false,
      price: 550,
      img: bracamole,
    },
    {
      id: 2,
      name: "Bracamonte",
      description:
        "Pan de calabaza - Pepinos - Lechuga - Tomate - Medallon de lentejas al romero - Cheddar - Salsa Bracamonte",
      vegan: false,
      price: 500,
      img: bracamonte,
    },
    {
      id: 3,
      name: "Bracamonte",
      description:
        "Pan de calabaza - Pepinos - Lechuga - Tomate - Medallon de lentejas al romero - Cheddar vegano - Salsa Bracamonte",
      vegan: true,
      price: 500,
      img: bracamonte,
    },
    {
      id: 4,
      name: "Megamonte",
      description:
        "Pan de calabaza - Salsa Bracamonte - Medallón de cebolla caramelizada, mascabo y cúrcuma - Cheddar - Medallón de calabaza y muzzarella - Lechuga - Tomate ",
      vegan: false,
      price: 550,
      img: megamonte,
    },
    {
      id: 5,
      name: "Especial",
      description:
        "Pan de remolacha - Salsa BigMac - Medallón de lentejas al romero - Doble cheddar - Tomate - Lechuga",
      vegan: false,
      price: 500,
      img: especial,
    },
    {
      id: 6,
      name: "Especial Doble",
      description:
        "Pan de remolacha - Salsa Big Mac - Doble medallón de lentejas al romero - Doble cheddar - Tomate - Lechuga",
      vegan: false,
      price: 550,
      img: especialDoble,
    },
    {
      id: 7,
      name: "Especial",
      description:
        "Pan de calabaza - Medallón de lentejas y romero - Salsa Big Mac vegana - Cebolla morada -Lechuga - Cheddar vegano",
      vegan: true,
      price: 500,
      img: especialVegana,
    },
    {
      id: 8,
      name: "Napolitana",
      description:
        "Pan de romolacha - Veganesa - Lechuga - Medallón de remolacha y yamaní - Doble cheddar - Pepinos agridulces",
      vegan: false,
      price: 500,
      img: napolitana,
    },
    {
      id: 9,
      name: "Napolitana doble",
      description:
        "Pan de romolacha - Veganesa - Lechuga - Doble medallón de remolacha y yamaní - Doble cheddar - Pepinos agridulces",
      vegan: false,
      price: 550,
      img: napolitanaDoble,
    },
    {
      id: 10,
      name: "Montana",
      description:
        "Pan de calabaza - Medallon de remolacha y yamani - Medallon de lentejas al romero - Cheddar - Cebolla - Lechuga - Tomate - Salsa secreta",
      vegan: false,
      price: 550,
      img: montana,
    },
  ],
  cart: [],
};

export function ShoppingReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      let newItem = state.products.find(
        (product) => product.id === action.payload
      );
      let itemInCart = state.cart.find((item) => item.id === newItem.id);

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }
        : { ...state, cart: [...state.cart, { ...newItem, quantity: 1 }] };
    }
    case REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item.id === action.payload);
      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
          };
    }
    case REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }
    case CLEAR_CART:
      return initialState;
    default:
      return state;
  }
}
