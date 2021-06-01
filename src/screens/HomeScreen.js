import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner/index';
import {Container} from '@material-ui/core'
export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;
const imgList = [
  {url:'/images/logo1.png'},
  {url:'/images/logo2.png'},
  {url:'/images/banner.png'},
  {url:'/images/banner.jpg'},
]
  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <Container maxWidth="lg">

        {loadingSellers ? (
          <LoadingBox></LoadingBox>
        ) : errorSellers ? (
          <MessageBox variant="danger">{errorSellers}</MessageBox>
        ) : (
          <>
            {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
            <Carousel showArrows autoPlay showThumbs={false}>
              {imgList.map((img) => (
                <div style={{backgroundImage:`url(${img.url})`,backgroundSize:'contain',backgroundRepeat:'no-repeat',width:'100%',height:'400px',backgroundPositionX: 'center', backgroundPositionY:'center'}}>

                </div>
              ))}
            </Carousel>
          </>
        )}

      <Container>
        <div className="row center">
          <h2>Produtos recentes</h2>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            <div className="containerProdutos">

              <div className="gridProducts">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
            </div>
          </>
        )}
      </Container>
    </Container>
  );
}
