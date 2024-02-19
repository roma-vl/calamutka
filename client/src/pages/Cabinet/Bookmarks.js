import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import EditIcon from '@material-ui/icons/Edit';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.54)',
    height: '100%',
  },
}));

const Bookmarks = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Збереженні</Typography>
      <Card sx={{display: 'flex', marginBottom: '20px'}}>
        <CardMedia
          component="img"
          sx={{width: 250}}
          image="https://picsum.photos/250"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Збереженні
          </Typography>
          <Typography variant="body2" >
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions sx={{justifyContent: 'flex-end', marginTop: 'auto'}}>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default Bookmarks;
