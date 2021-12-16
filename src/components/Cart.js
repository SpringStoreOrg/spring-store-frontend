import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProduct } from "../redux/actions/productActions";
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeProductFromCart } from '../redux/actions/cartActions';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Cart = (product) => {
  
  const dispatch = useDispatch();
  let history = useHistory();
  const { productPhotoLink, productName, productPrice } = product;


  const handleProductPage = () => {
    dispatch(setProduct(product));
    history.push(`/productPage`);

  }

  const handleClick = () => {
    dispatch(
      removeProductFromCart(product.productName)
    );
  };



  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>

      <Grid container spacing={2} style={{ border: "1px solid grey" }}  >
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }} onClick={() => handleProductPage()}>
            <Img alt="complex" src={productPhotoLink} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={3}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div" style={{ fontWeight: 600 }}>
                Product
              </Typography>
              <Typography variant="body2" gutterBottom>
                {productName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Product price: {productPrice}
              </Typography>
              <IconButton color="default" onClick={() => history.push('/cartPage')} >
                <ShoppingCartIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => handleClick()}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>


  );
}

export default Cart;