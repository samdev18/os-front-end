import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { createProduct, deleteProduct, listProducts, } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';
import { Container, IconButton, Typography, Fab, makeStyles } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';

import Table from '../components/Table';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
    },
  },
  backButton: {
    fontSize: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  submitButton: {
    fontSize: theme.spacing(2),
  },
  pageName: {
    marginTop: theme.spacing(3)
  },
  fab: { float: 'right' }
}));

export default function ProductListScreen(props) {
  const classes = useStyles();
  const { pageNumber = 1 } = useParams();

  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts({ seller: sellerMode ? userInfo._id : '', pageNumber })
    );
  }, [
    createdProduct,
    dispatch,
    props.history,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Container>
        <Typography className={classes.pageName} variant="h4" component="h1">
          Products
        </Typography>
      </Container>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>

          <Container>
            <Table
              tableHeaderColor="black"
              tableHead={["Imagem", "Name", "Price", "Category", 'Brand', 'Actions']}
              tableData={products.map(
                (product) => {
                  return [
                    <>
                      <img className="small" alt={product.name} src={product.image} />
                    </>,
                    product.name, product.price, product.category, product.brand,
                    <>
                      <IconButton onClick={() =>
                        props.history.push(`/product/${product._id}/edit`)
                      }>
                        <EditIcon color="primary" />
                      </IconButton>
                      <IconButton onClick={() => deleteHandler(product)}>
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    </>
                  ]
                }
              )}
            />

          </Container>
          <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? 'active' : ''}
                key={x + 1}
                to={`/productlist/pageNumber/${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
      <Container>

        <Fab   onClick={createHandler} color="primary" className={classes.fab} aria-label="add">
          <AddIcon className={classes.submitButton} />
        </Fab>
      </Container>
    </>
  );
}
