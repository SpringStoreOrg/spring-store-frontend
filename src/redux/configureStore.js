import { combineReducers} from "redux";
import productsReducer from "./actions/productsActions";
import productReducer from "./actions/productActions";
import appBarReducer from "./actions/secondaryAppBar";
import authReducer from "./actions/authActions";
import cartReducer from "./actions/cartActions";
import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist' 
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import favoriteProductReducer from './actions/favoriteProductActions';


const reducers = combineReducers({
    products: productsReducer,
    product: productReducer,
    secondaryAppBar:appBarReducer,
    cart:cartReducer,
    auth:authReducer,
    favoriteProduct: favoriteProductReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
    persistedReducer,
    composeWithDevTools( // pass the persisted reducer instead of rootReducer to createStore
    applyMiddleware(thunk)) // add any middlewares here
)



const  persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

export {store, persistor}