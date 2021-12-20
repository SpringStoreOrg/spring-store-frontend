import * as React from 'react';
import { useState, useEffect } from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from "../redux/actions/productActions";
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addProductToFavorites } from '../../src/redux/actions/favoriteProductActions';
import { removeProductFromFavorites } from '../../src/redux/actions/favoriteProductActions';
import { addProductToCart } from '../../src/redux/actions/cartActions';
import { removeProductFromCart } from '../../src/redux/actions/cartActions';



import { red } from '@mui/material/colors';

import styled, { ThemeProvider } from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import { grey, indigo } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(220),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 2),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {

    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


const customTheme = createTheme({
  palette: {
    primary: {
      main: grey[50],
      secondary: indigo[500],
    },
  },
});

const StyledCard = styled(Card)`
  ${({ theme }) => `
  cursor: pointer;
  background-color: ${theme.palette.primary.main};
  transition: ${theme.transitions.create(['background-color', 'transform'], {
  duration: theme.transitions.duration.standard,
})};
  &:hover {
    background-color: ${theme.palette.primary.main};
    transform: scale(1.07);
  }
  `}
`;

const Product = (product) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();
  const { productPhotoLink, productName, productDescription, productPrice } = product;
  const favoriteProducts = useSelector((state) => state.favoriteProduct.productList);
  const productsInCart = useSelector((state) => state.cart.productsInCartList);
  const [clicked, setClicked] = useState(false)
  const [cartClicked, setCartClicked] = useState(false)


  const handleProductPage = () => {
    dispatch(setProduct(product));
    history.push(`/productPage`);

  }

  useEffect(() => {
    if (productsInCart.some(p => (p.productName === product.productName))) {
      setCartClicked(true);
    }
    else {
      setCartClicked(false)
    }  
}, [productsInCart, product.productName]);




  useEffect(() => {
    if (favoriteProducts.some(p => (p.productName === product.productName))) {
      setClicked(true);
    }
    else {
      setClicked(false)
    }
  }, [favoriteProducts, product.productName]);


  const handleClick = () => {
    if (clicked === false) {
      setClicked(true)
      dispatch(
        addProductToFavorites(product.productName)
      );
    } else {
      setClicked(false)
      dispatch(
        removeProductFromFavorites(product.productName)
      );
    }

  };

  const handleClickCart = () => {
    if (cartClicked === false) {
      setCartClicked(true)
      dispatch(
        addProductToCart(product.productName, 1)
      );
    }
  };

  return (




    <Grid item xs={12} sm={6} md={4}>

      <NoSsr>
        <MuiThemeProvider theme={customTheme}>
          <ThemeProvider theme={customTheme}>
            <StyledCard className={classes.card} >
              <CardMedia
                className={classes.cardMedia}
                image={productPhotoLink}
                onClick={() => handleProductPage()}
              />
              <CardContent className={classes.cardContent} onClick={() => handleProductPage()} >
                <Typography gutterBottom variant="h5" component="h2">
                  {productName}
                </Typography>
                <Typography>
                  {`Description: ${productDescription}`}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  {`Product price:  ${productPrice}`}
                </Typography>
              </CardContent>
              <CardActions>





                {cartClicked === true && (
                  <IconButton color="default" onClick={() => handleClickCart()}  >
                    <ShoppingCartIcon />
                  </IconButton>
                )}
                {cartClicked !== true && (
                  <IconButton color="default" onClick={() => handleClickCart()}  >
                    <AddShoppingCartIcon />
                  </IconButton>

                )}


                {clicked === true && (
                  <IconButton color="default" onClick={() => handleClick()}  >
                    <FavoriteIcon style={{ color: red[500] }} />
                  </IconButton>
                )}
                {clicked !== true && (
                  <IconButton color="default" onClick={() => handleClick()}  >
                    <FavoriteBorderIcon />
                  </IconButton>

                )}



              </CardActions>
            </StyledCard>
          </ThemeProvider>
        </MuiThemeProvider>
      </NoSsr>

    </Grid>



  )
}

export default Product;