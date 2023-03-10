import axios from "axios";
import { toast } from "react-toastify";

const GET_CART = "GET_CART";
const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
const CART_SIGN_OUT = "CART_SIGN_OUT";

export const getCartByUserEmail = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await axios.get(
      process.env.REACT_APP_CART_PATH,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: GET_CART,
      id: response.data.id,
      entries: response.data.entries,
      total: response.data.total,
    });
  }
};

export const addProductToCart = (productName, quantity) => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (token) {
    const response = await axios.post(
      process.env.REACT_APP_CART_PATH,
      {
        name: productName,
        quantity: quantity
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      id: response.data.id,
      entries: response.data.entries,
      total: response.data.total,
    });
    toast.success("Product Added To Cart!", { position: "top-right" });
  } else return null;
};

export const addProductsToCartFavorites = (products) => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (token && products?.length > 0) {
     await axios.put(
      process.env.REACT_APP_CART_PATH, products
      ,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  } else {
    return null;
  }
};

export const updateProductToCart = (product, quantity) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .put(
          process.env.REACT_APP_CART_PATH,
            [{
              name: product,
              quantity: quantity
            }],
          {
            headers: {
              "Content-type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          dispatch({
            type: REMOVE_PRODUCT_FROM_CART,
            entries: response.data.entries,
            total: response.data.total,
          });
          toast.info("Product Quantity updated!", { position: "top-right" });
        });
    } else return null;
  };
};

export const removeProductFromCart = (productName) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .delete(
          process.env.REACT_APP_CART_PATH + productName,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          dispatch({
            type: REMOVE_PRODUCT_FROM_CART,
            entries: response.data.entries,
            total: response.data.total,
          });
          toast.error("Product Removed from Cart!", { position: "top-right" });
        });
    } else return null;
  };
};
export const signOutCart = () => {
  return (dispatch) => {
    dispatch({
      type: CART_SIGN_OUT,
    });
  };
};

const initialState = {
  entries: [],
  total: 0,
};

const cartActions = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
    case ADD_PRODUCT_TO_CART:
    case REMOVE_PRODUCT_FROM_CART:
      return {
        ...initialState,
        entries: action.entries,
        total: action.total,
      };
    case CART_SIGN_OUT:
      return {
        entries: [],
        total: 0,
      };

    default:
      return state;
  }
};

export default cartActions;
