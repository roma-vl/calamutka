import React, {useState} from 'react';
import {Grid, IconButton, Paper, Typography} from '@mui/material';
import {Card, CardContent} from "@material-ui/core";
import TextField from "@mui/material/TextField";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Close from "@mui/icons-material/Close";
import {connect, useDispatch} from "react-redux";
import {decreaseQuantity, increaseQuantity, removeFromCart} from "../../redux/actions/cartActions";


const Checkout = ({ products }) => {

  const dispatch = useDispatch();
  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleDeleteCard = (id) => {
    dispatch(removeFromCart(id));
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    promoCode: '',
    comment: '',
    agreement: false
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'agreement' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Додаткова логіка для обробки форми, наприклад, відправка даних на сервер
  };
  return (
    <Container>
      <Grid container spacing={2} style={{ paddingTop: 20 }}>
        {/* Ліва частина - контакти покупця */}
        <Grid item xs={4}>
          <Paper elevation={0}  style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>Контакти покупця</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                name="firstName"
                label="Ім'я"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <TextField
                name="lastName"
                label="Прізвище"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <TextField
                name="phone"
                label="Телефон"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <TextField
                name="promoCode"
                label="Промокод"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.promoCode}
                onChange={handleChange}
              />
              <TextField
                name="comment"
                label="Коментар"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={formData.comment}
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox color="primary" checked={formData.agreement} onChange={handleChange} name="agreement" />}
                label={
                  <Typography component="div">
                    Підтверджую замовлення я погоджуюсь з{' '}
                    <a href="/" style={{ textDecoration: 'none', color: 'red' }}>
                      умовами користувальницької угоди
                    </a>
                  </Typography>
                }
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!formData.agreement}
                sx={{ width: '100%', marginTop: '10px', backgroundColor: '#FFA500' }}
              >
                Оформити
              </Button>

            </form>
          </Paper>
        </Grid>
        {/* Права частина - список товарів */}
        <Grid item xs={8} sx={{ }}>
          <Paper elevation={0} style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>Список товарів</Typography>
            {
              products.map(product => (
                <Grid item xs={12} key={product.id} style={{ paddingBottom: 20 }}>
                  <Card>
                    <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={product.main_image}
                        alt="Товар"
                        style={{ width: 200, height: 200 }}
                      />
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="h6" sx={{ marginLeft: '30px' }}>{product.name}</Typography>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '15px', marginLeft: '20px' }}>
                            <IconButton onClick={() => handleDecreaseQuantity(product.id)}><RemoveIcon /></IconButton>
                            <TextField
                              type="number"
                              value={product.quantity}
                              variant="outlined"
                              inputProps={{ min: 1 }}
                              sx={{ width: '90px', padding: '5.5px 10px' }}
                              disabled
                            />
                            <IconButton onClick={() => handleIncreaseQuantity(product.id)}><AddIcon /></IconButton>
                          </div>
                        </Grid>
                        <Grid item>
                          <IconButton onClick={() => handleDeleteCard(product.id)} sx={{ position: 'relative', top: '-90px', right: '-10px' }}>
                            <Close />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            }
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.cart.products
  };
};

export default connect(mapStateToProps)(Checkout);
