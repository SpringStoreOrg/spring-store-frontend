import axios from "axios";
import jwtDecode from "jwt-decode";
import {toast} from "react-toastify";
import { getCartByUserEmail } from "./cartActions";


const PRODUCT_FAVORITES = "PRODUCT_FAVORITES";

const PRODUCT_FAVORITES_SIGN_OUT = "PRODUCT_FAVORITES_SIGN_OUT";


export const addProductToFavorites = (product) => {
    return (dispatch, getState) => {

        const token = getState().auth.token;

        if (token) {
            const user = jwtDecode(token);
            axios.put(process.env.REACT_APP_ADD_PRODUCT_TO_USER_FAVORITES + user.sub +"/"+ product,{},
             {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then((response) => {
                dispatch({
                    type: PRODUCT_FAVORITES,
                    id: response.data.id,
                    productList: response.data.favoriteProductList,
                });
                toast.success("Product Added To Favorites!",{ position: "top-right"})
            })
        } else return null;
    };
};

export const removeProductFromFavorites = (product) => {
    return (dispatch, getState) => {

        const token = getState().auth.token;
        if (token) {
            const user = jwtDecode(token);
            axios.put(process.env.REACT_APP_REMOVE_PRODUCT_FROM_USER_FAVORITES + user.sub + "/" + product,{},
             {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then((response) => {
                dispatch({
                    type: PRODUCT_FAVORITES,
                    id: response.data.id,
                    productList: response.data.favoriteProductList,          
                });
                toast.error("Product removed from Favorites!",{ position: "top-right"})
            })
        } else return null;
    };
};

export const getAllProductsFromUserFavorites = () => {
    return (dispatch, getState) => {

        const token = getState().auth.token;
        console.log('TKKKNNNN',token);
        if (token) {
            const user = jwtDecode(token);
            axios.get(process.env.REACT_APP_GET_ALL_PRODUCTS_FROM_USER_FAVORITES + user.sub,
             {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then((response) => {

                console.log('initial fav prod',response.data);
                dispatch({
                    type: PRODUCT_FAVORITES,
                    id: response.data.id,
                    productList: response.data,
                });
            })
        } else return null;
    };
};

// TODO testing
//export const getExample = () => {
//     return async (dispatch, getState) => {
//         const token = getState().auth.token;
//         console.log('TKKKNNNN',token);
//         if (token) {
//             const user = jwtDecode(token);
//             const response = await axios.get(`https://spring-store-zuul-service.herokuapp.com/user/getAllProductsFromUserFavorites/${user.sub}`,
//             {
//                 headers: {
//                     'Content-type': 'application/json',
//                     'Authorization': localStorage.getItem('token')
//                 }
//             })
//             console.log('initial fav prod',response.data);
//                 dispatch({
//                     type: PRODUCT_FAVORITES,
//                     id: response.data.id,
//                     productList: response.data,
//                 });

//             await dispatch(getCartByUserEmail());
//         }
//     }
// }



export const signOutProductFavorites = () => {
    return (dispatch) => {
        dispatch({
            type: PRODUCT_FAVORITES_SIGN_OUT,
        });
    };
};

const initialState = {
    id: null,
    productList: [],
};



const favoriteProductActions = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_FAVORITES:
            return {
                ...initialState,
                id: action.id,
                productList: action.productList,
            };
            case PRODUCT_FAVORITES_SIGN_OUT:   
                return {
                    id: null,
                    productList: []
                };    
        default:
            return state;
    }
};

export default favoriteProductActions;