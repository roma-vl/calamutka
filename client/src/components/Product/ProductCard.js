import { Card, CardContent, CardMedia, Typography, makeStyles, IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    maxWidth: '100%',
    height: 260,
    transition: 'transform 0.5s, height 0.5s', // Додано анімацію зміни висоти і перетворення
    '&:hover': {
      zIndex: 1,
      width: 270,
      position: 'absolute',
      transform: 'translateY(-100px)', // Зсув вверх при наведенні
      height: 450,

    },
  },
  media: {
    height: 140,
  },
  content: {
    flex: '1 0 auto',
  },
  actions: {
    position: 'relative',
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
    // transform: 'translateY(100%)',
    '& $root:hover &': {
      transform: 'translateY(0)',
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

        <div className={classes.actions}>
          <IconButton aria-label="save">
            <SaveIcon/>
          </IconButton>
          <IconButton aria-label="add to cart">
            <AddShoppingCartIcon/>
          </IconButton>
        </div>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
        <Typography variant="h5" color="textSecondary" component="p">
          Категорія
        </Typography>
        <Typography variant="h5" color="textSecondary" component="p">
          Тег
        </Typography>
      </CardContent>

    </Card>
  );
};

export default ProductCard;
