import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { appBarFalse, appBarTrue } from "../redux/actions/secondaryAppBar";
import { setOrderCreditCardInfo } from "../redux/actions/orderCreditCardInfoActions";
import { setOrderStep } from "../redux/actions/orderStepActions";

const OrderPaymentPage = () => {
  const dispatch = useDispatch();

  const validationSchema = yup.object({});

  const formik = useFormik({
    initialValues: {
      nameOnCard: "Test User",
      cardNumber: "0983 1219 3120 3123",
      expiryDate: "02/29",
      cvv: "test",
    },
    onSubmit: (values) => {
      dispatch(
        setOrderCreditCardInfo(
          values.nameOnCard,
          values.cardNumber,
          values.expiryDate,
          values.cvv
        )
      );
      dispatch(setOrderStep(2));
    },
    validationSchema: validationSchema,
  });

  useEffect(() => {
    dispatch(appBarFalse());
    return () => {
      dispatch(appBarTrue());
    };
  }, [dispatch]);

  const handleBackOrderStep = () => {
    dispatch(setOrderStep(0));
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              disabled
              name="nameOnCard"
              variant="filled"
              //variant="outlined"
              fullWidth
              id="nameOnCard"
              label="Name on card*"
              autoFocus
              value={"Test Name"}
              //value={formik.values.nameOnCard}
              onChange={formik.handleChange}
              error={
                formik.touched.nameOnCard && Boolean(formik.errors.nameOnCard)
              }
              helperText={formik.touched.nameOnCard && formik.errors.nameOnCard}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              disabled
              name="cardNumber"
              variant="filled"
              //variant="outlined"
              fullWidth
              id="cardNumber"
              label="Card number*"
              autoFocus
              value={"1111-2222-3333-4444"}
              //value={formik.values.cardNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
              }
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              disabled
              name="expiryDate"
              variant="filled"
              //variant="outlined"
              fullWidth
              id="expiryDate"
              label="Expiry date*"
              autoFocus
              value={"01/27"}
              //value={formik.values.expiryDate}
              onChange={formik.handleChange}
              error={
                formik.touched.expiryDate && Boolean(formik.errors.expiryDate)
              }
              helperText={formik.touched.expiryDate && formik.errors.expiryDate}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              disabled
              name="cvv"
              variant="filled"
              //variant="outlined"
              fullWidth
              id="cvv"
              label="CVV*"
              autoFocus
              value={999}
              //value={formik.values.cvv}
              onChange={formik.handleChange}
              error={formik.touched.cvv && Boolean(formik.errors.cvv)}
              helperText={formik.touched.cvv && formik.errors.cvv}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveCard" value="yes" />
              }
              label="Remember credit card details for next time"
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button sx={{ mt: 3, ml: 1 }} onClick={handleBackOrderStep}>
            Back
          </Button>
          <Button
            type="submit"
            sx={{ mt: 3, ml: 1 }}
            variant="contained"
            style={{ backgroundColor: "#3f51b5", color: "#FFFFFF" }}
          >
            Next
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
};
export default OrderPaymentPage;
