import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { getCartByUserEmail } from "../actions/cartActions";
import {
  getAllProductsFromUserFavorites,
  addProductsToFavorites,
} from "../actions/favoriteProductActions";
import {
  clearProductsFromFavoritesLocal,
} from "../actions/favoriteLocalProductActions";
import {
  addProductsToCartFavorites,
} from "../actions/cartActions";
import {
  clearProductsFromLocalCart,
} from "../actions/cartLocalActions";

const SIGN_IN = "SIGN_IN";
const SIGN_UP = "SIGN_UP";
const USER_LOADED = "USER_LOADED";
const SIGN_OUT = "SIGN_OUT";

export const signUp =
    (firstName, lastName, email, phoneNumber, deliveryAddress, password, formik) =>
        () => {
          return axios.post(process.env.REACT_APP_USER_PATH, {
                firstName,
                lastName,
                email,
                phoneNumber,
                deliveryAddress,
                password,
              }).then(res => {
                toast.success("Succesfully signed Up! Please confirm your Email!", {
                  position: "top-right",
                  toastId: "signUpMsg"
                });

                return Promise.resolve();
              }).catch((error) => {
                console.log("Signup error:" + error.response.data);
                if (error.response.data.messages) {
                  error.response.data.messages.forEach((message) => {
                        formik.setFieldError(message.fieldKey, message.message)
                      }
                  );
                }

               return Promise.reject();
              });
        };

export const signIn = (email, password) => async (dispatch, getState) => {
  try {
    const responseLogin = await axios.post(process.env.REACT_APP_LOGIN, {
      email,
      password,
    });
    localStorage.setItem("token", responseLogin.headers.authorization);
    dispatch({
      type: SIGN_IN,
      token: responseLogin.headers.authorization,
      err: null,
    });
  } catch (e) {
    dispatch({
      type: SIGN_IN,
      err: e.message,
    });
    console.log("Token setup failed!");
  }


  //Load user data only if login was successful
  if(localStorage.getItem("token")){
    try {
      const response = await axios.get(
          process.env.REACT_APP_USER_PATH + `?email=${email}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
      );
      dispatch({
        type: SIGN_IN,
        token: localStorage.getItem("token"),
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
        deliveryAddress: response.data.deliveryAddress,
        userFavorites: response.data.userFavorites,
        err: null,
      });
    } catch (e) {
      console.log("Login failed!");
    }

    try {
      const favoriteLocalProducts = JSON.parse(
          JSON.stringify(getState().favoriteLocalProduct.products)
      ).map(({ name }) => name);

      dispatch(addProductsToFavorites(favoriteLocalProducts));
    } catch (e) {
      console.log("Products could not be updated by login!");
    }

    try {
      dispatch(clearProductsFromFavoritesLocal());
    } catch (e) {
      console.log("clear Products To Favorites Local failed!");
    }

    try {
      dispatch(getAllProductsFromUserFavorites());
    } catch (e) {
      console.log("get All Products From User Favorites failed!");
    }

    try {
      const productsInCartLocal = JSON.parse(
          JSON.stringify(getState().cartLocal.products));

      dispatch(addProductsToCartFavorites(productsInCartLocal));
    } catch (e) {
      console.log("Cart could not be updated on login!");
    }

    try {
      dispatch(clearProductsFromLocalCart());
    } catch (e) {
      console.log("clear Products from Cart Local failed!");
    }

    try {
      dispatch(getCartByUserEmail());
    } catch (e) {
      console.log("get Cart By User Email failed!");
    }
  }
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: SIGN_OUT,
    });
  };
};

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (token) {
    const user = jwtDecode(token);
    const response = await axios.get(
      process.env.REACT_APP_USER_PATH + `?email=${user.sub}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: USER_LOADED,
      id: response.data.id,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      email: response.data.email,
      phoneNumber: response.data.phoneNumber,
      deliveryAddress: response.data.deliveryAddress,
      userFavorites: response.data.userFavorites,
      err: null,
    });
  } else return null;
};

const initialState = {
  token: localStorage.getItem("token"),
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  phoneNumber: null,
  deliveryAddress: null,
  userFavorites: [],
  err: null,
};

const authActions = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
    case SIGN_UP:
    case USER_LOADED:
      return {
        ...initialState,
        token: localStorage.getItem("token"),
        id: action.id,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        phoneNumber: action.phoneNumber,
        deliveryAddress: action.deliveryAddress,
        userFavorites: action.userFavorites,
        err: action.err,
      };
    case SIGN_OUT:
      localStorage.removeItem("token");
      return {
        token: null,
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        deliveryAddress: null,
        userFavorites: [],
        err: null,
      };
    default:
      return state;
  }
};

export default authActions;
