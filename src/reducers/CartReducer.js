import { toast } from "react-toastify";
toast.configure();

const CartReducer = (state, action) => {
  const { shoppingCart, totalPrice, totalQty } = state;

  let product;
  let index;
  let updatedPrice;
  let updatedQty;

  switch (action.type) {
    case "ADD_TO_CART": {
      const newProduct = shoppingCart.find(
        (product) => product.id === action.id
      );
      if (newProduct) {
        product = action.data;
        toast.info(`${product.name} ya se encuentra en el carrito!`, {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          type: "warning",
        });
        return state;
      } else {
        product = action.data;
        product["qty"] = 1;
        product["totalProductPrice"] = product.price * product.qty;
        updatedQty = totalQty + 1;
        updatedPrice = totalPrice + parseInt(product.price);
        toast.info(`${product.name} añadida al carrito!`, {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          type: "success",
        });
        return {
          shoppingCart: [product, ...shoppingCart],
          totalPrice: updatedPrice,
          totalQty: updatedQty,
        };
      }
    }

    case "INC": {
      product = action.data;
      product.qty = product.qty + 1;
      product.totalProductPrice = product.price * product.qty;
      updatedQty = totalQty + 1;
      updatedPrice = totalPrice + parseInt(product.price);
      index = shoppingCart.findIndex((cart) => cart.id === action.id);
      shoppingCart[index] = product;

      return {
        shoppingCart: [...shoppingCart],
        totalPrice: updatedPrice,
        totalQty: updatedQty,
      };
    }

    case "DEC": {
      product = action.data;
      if (product.qty > 1) {
        product.qty = product.qty - 1;
        product.totalProductPrice = product.qty * product.price;
        updatedPrice = totalPrice - product.price;
        updatedQty = totalQty - 1;
        index = shoppingCart.findIndex((cart) => cart.id === action.id);
        shoppingCart[index] = product;
        return {
          shoppingCart: [...shoppingCart],
          totalPrice: updatedPrice,
          totalQty: updatedQty,
        };
      } else {
        return state;
      }
    }
    case "DELETE": {
      const filtered = shoppingCart.filter(
        (product) => product.id !== action.id
      );
      product = action.data;
      updatedQty = totalQty - product.qty;
      updatedPrice = totalPrice - product.qty * product.price;
      return {
        shoppingCart: [...filtered],
        totalPrice: updatedPrice,
        totalQty: updatedQty,
      };
    }
    case "EMPTY": {
      return {
        shoppingCart: [],
        totalPrice: 0,
        totalQty: 0,
      };
    }

    default:
      return state;
  }
};

export default CartReducer;
