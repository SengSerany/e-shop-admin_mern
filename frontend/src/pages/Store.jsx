import ProductForm from '../components/ProductForm';
import ProductsCard from '../components/ProductsCard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getIndexProducts } from '../features/product/productSlice';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Store() {
  const dispatch = useDispatch();
  const { products, productLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getIndexProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (productLoading) {
    return (
      <Row className="justify-content-center">
        <Col md="auto">
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        </Col>
      </Row>
    );
  }

  return (
    <>
      <div>
        <h1 className="h1 text-center">Store</h1>
        <ProductForm />
        <br />
        <br />
        <Row className="justify-content-center">
          {products.length > 0 &&
            products.map((product) => (
              <ProductsCard key={`card-${product._id}`} product={product} />
            ))}
        </Row>
      </div>
    </>
  );
}

export default Store;
