import { Card, CardContent, CardMedia, Typography, makeStyles, IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    maxWidth: '100%',
    transition: 'transform 0.3s, height 0.3s', // Додано анімацію зміни висоти і перетворення
    '&:hover': {
      transform: 'translateY(-100px)', // Зсув вверх при наведенні
      height: 'calc(100% + 120px)', // Збільшення висоти картки на 20 пікселів
    },
  },
  media: {
    height: 140,
  },
  content: {
    flex: '1 0 auto',
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '8px',
    boxSizing: 'border-box',
    transition: 'transform 0.3s',
    transform: 'translateY(100%)',
    '& $root:hover &': {
      transform: 'translateY(100)',
    },
  },
});

const ProductCard = ({ product }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.image}
        title={product.name}
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
      </CardContent>
      <div className={classes.actions}>
        <IconButton aria-label="save">
          <SaveIcon />
        </IconButton>
        <IconButton aria-label="add to cart">
          <AddShoppingCartIcon />
        </IconButton>
      </div>
    </Card>
  );
};

export default ProductCard;
