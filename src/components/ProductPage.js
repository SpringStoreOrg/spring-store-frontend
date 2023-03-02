import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Typography from "@mui/material/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { Carousel } from "react-carousel-minimal";
import { addProductToCart } from "../../src/redux/actions/cartActions";
import {
  addProductToFavoritesLocal,
  removeProductfromFavoritesLocal,
} from "../../src/redux/actions/favoriteLocalProductActions";
import { addProductToLocalCart } from "../../src/redux/actions/cartLocalActions";
import {
  addProductToFavorites,
  removeProductFromFavorites,
} from "../../src/redux/actions/favoriteProductActions";
import { red } from "@mui/material/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    flexDirection: "column",
    alignItems: "left",
    margin: theme.spacing(0.1, 8, 3),
  },
  submit: {
    margin: theme.spacing(1, 4.7, 1),
  },
}));

const ProductPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(
    (state) => state.favoriteProduct.products
  );
  const favoriteLocalProducts = useSelector(
    (state) => state.favoriteLocalProduct.products
  );
  const productsInCart = useSelector((state) => state.cart.entries);
  const productsInCartLocal = useSelector((state) => state.cartLocal.products);
  const product = useSelector((state) => state.product);
  const token = localStorage.getItem("token");
  const [clicked, setClicked] = useState(false);
  const [clickedLocal, setClickedLocal] = useState(false);
  const [cartClicked, setCartClicked] = useState(false);
  const [cartClickedLocal, setCartClickedLocal] = useState(false);

  useEffect(() => {
    if (token) {
      if (favoriteProducts.some((p) => p.name === product.name)) {
        setClicked(true);
      } else {
        setClicked(false);
      }
    } else {
      if (favoriteLocalProducts.some((p) => p.name === product.name)) {
        setClickedLocal(true);
      } else {
        setClickedLocal(false);
      }
    }
  }, [token, favoriteLocalProducts, favoriteProducts, product.name]);

  useEffect(() => {
    if (token) {
      if (productsInCart.some((p) => p.productName === product.name)) {
        setCartClicked(true);
      } else {
        setCartClicked(false);
      }
    } else {
      if (productsInCartLocal.some((p) => p.name === product.name)) {
        setCartClickedLocal(true);
      } else {
        setCartClickedLocal(false);
      }
    }
  }, [token, productsInCartLocal, productsInCart, product.name]);

  const handleFavoriteClick = () => {
    if (token) {
      if (!clicked) {
        setClicked(true);
        dispatch(addProductToFavorites(product.name));
      } else {
        setClicked(false);
        dispatch(removeProductFromFavorites(product.name));
      }
    } else {
      if (!clickedLocal) {
        setClickedLocal(true);
        dispatch(addProductToFavoritesLocal(product));
      } else {
        setClickedLocal(false);
        dispatch(removeProductfromFavoritesLocal(product));
      }
    }
  };

  const handleClickCart = () => {
    if (token) {
      if (cartClicked === false) {
        setCartClicked(true);
        dispatch(addProductToCart(product.name, 1));
      }
    } else {
      if (cartClickedLocal === false) {
        setCartClickedLocal(true);
        dispatch(addProductToLocalCart(product, 1));
      }
    }
  };

  const data = [
    {
      image: "https://source.unsplash.com/featured/720x480/?{chair yellow}",
    },
    {
      image: "https://source.unsplash.com/featured/720x480/?{chair pink}",
    },
    {
      image: "https://source.unsplash.com/featured/720x480/?{chair green}",
    },
  ];

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <Container fixed="false" maxWidth="md">
      <Paper>
        <Divider />
        <CssBaseline />

        <Carousel
          data={data}
          time={2000}
          width="800px"
          height="450px"
          captionStyle={captionStyle}
          radius="10px"
          slideNumber={true}
          slideNumberStyle={slideNumberStyle}
          captionPosition="bottom"
          automatic={false}
          dots={true}
          pauseIconColor="white"
          pauseIconSize="40px"
          slideBackgroundColor="darkgrey"
          slideImageFit="cover"
          thumbnails={true}
          thumbnailWidth="100px"
          style={{
            textAlign: "center",
            maxWidth: "750px",
            maxHeight: "500px",
            margin: "30px auto",
          }}
        />
        <div className={classes.paper}>
          <Grid container spacing={1}>
            <Typography component="h1">{product.name}</Typography>
            <Typography component="h3">Description:</Typography>
            <Typography>{product.description}</Typography>
            <Typography component="h3">Price: {product.price}</Typography>
          </Grid>
        </div>
        <Grid container spacing={5}>
          <div className={classes.paper}>
            {token ? (
              !clicked ? (
                <Button
                  onClick={() => handleFavoriteClick()}
                  className={classes.submit}
                  variant="contained"
                  style={{
                    maxWidth: "300px",
                    maxHeight: "30px",
                    minWidth: "30px",
                    minHeight: "30px",
                    fontSize: "11px",
                    backgroundColor: "#eeeeee",
                  }}
                  startIcon={<FavoriteBorderIcon />}
                >
                  {" "}
                  {"Add to Favorites"}
                </Button>
              ) : (
                <Button
                  onClick={() => handleFavoriteClick()}
                  className={classes.submit}
                  variant="contained"
                  style={{
                    maxWidth: "300px",
                    maxHeight: "30px",
                    minWidth: "30px",
                    minHeight: "30px",
                    fontSize: "11px",
                    backgroundColor: "#eeeeee",
                  }}
                  startIcon={<FavoriteIcon sx={{ color: red[500] }} />}
                >
                  {" "}
                  {"Added to Favorites"}
                </Button>
              )
            ) : !clickedLocal ? (
              <Button
                onClick={() => handleFavoriteClick()}
                className={classes.submit}
                variant="contained"
                style={{
                  maxWidth: "300px",
                  maxHeight: "30px",
                  minWidth: "30px",
                  minHeight: "30px",
                  fontSize: "11px",
                  backgroundColor: "#eeeeee",
                }}
                startIcon={<FavoriteBorderIcon />}
              >
                {" "}
                {"Add to Favorites"}
              </Button>
            ) : (
              <Button
                onClick={() => handleFavoriteClick()}
                className={classes.submit}
                variant="contained"
                style={{
                  maxWidth: "300px",
                  maxHeight: "30px",
                  minWidth: "30px",
                  minHeight: "30px",
                  fontSize: "11px",
                  backgroundColor: "#eeeeee",
                }}
                startIcon={<FavoriteIcon sx={{ color: red[500] }} />}
              >
                {" "}
                {"Added to Favorites"}
              </Button>
            )}
            {token ? (
              !cartClicked ? (
                <Button
                  onClick={() => handleClickCart()}
                  className={classes.submit}
                  variant="contained"
                  style={{
                    maxWidth: "300px",
                    maxHeight: "30px",
                    minWidth: "30px",
                    minHeight: "30px",
                    fontSize: "11px",
                    backgroundColor: "#eeeeee",
                  }}
                  startIcon={<AddShoppingCartIcon />}
                >
                  {" "}
                  {"Add to Cart"}
                </Button>
              ) : (
                <Button
                  className={classes.submit}
                  variant="contained"
                  style={{
                    maxWidth: "300px",
                    maxHeight: "30px",
                    minWidth: "30px",
                    minHeight: "30px",
                    fontSize: "11px",
                    backgroundColor: "#3f51b5",
                    color: "#FFFFFF",
                  }}
                  startIcon={<ShoppingCartIcon />}
                >
                  {" "}
                  {"Prod. in Cart"}
                </Button>
              )
            ) : !cartClickedLocal ? (
              <Button
                onClick={() => handleClickCart()}
                className={classes.submit}
                variant="contained"
                style={{
                  maxWidth: "300px",
                  maxHeight: "30px",
                  minWidth: "30px",
                  minHeight: "30px",
                  fontSize: "11px",
                  backgroundColor: "#eeeeee",
                }}
                startIcon={<AddShoppingCartIcon />}
              >
                {" "}
                {"Add to Cart"}
              </Button>
            ) : (
              <Button
                className={classes.submit}
                variant="contained"
                style={{
                  maxWidth: "300px",
                  maxHeight: "30px",
                  minWidth: "30px",
                  minHeight: "30px",
                  fontSize: "11px",
                  backgroundColor: "#3f51b5",
                  color: "#FFFFFF",
                }}
                startIcon={<ShoppingCartIcon />}
              >
                {" "}
                {"Prod. in Cart"}
              </Button>
            )}
          </div>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductPage;
