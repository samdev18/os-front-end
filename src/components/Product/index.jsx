import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating';
import {Card,CardHeader,CardMedia,CardContent,CardActions,IconButton,Typography} from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useStyles} from './styles'


export default function Product(props) {
  const classes = useStyles();
  const { product } = props;
  return (
    <>
      <Card className={classes.root} key={product._id}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            
            <Typography variant="h4"  component="h2" >
              <Link className={classes.tituloProduto} to={`/product/${product._id}`}>
               {product.name}
              </Link>
            </Typography>
          }
          subheader={<Link className={classes.brand} to={`/seller/${product.seller._id}`}>
            {product.seller.seller.name}
          </Link>}
        />
        <Link to={`/product/${product._id}`}>
          <CardMedia
            className={classes.media}
            image={product.image}
            title={product.name}
          />
        </Link>
        <CardContent>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <div className="price">R${product.price}</div>

        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>

      </Card>

    </>
  );
}
