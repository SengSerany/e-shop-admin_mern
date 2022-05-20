import ProductForm from '../components/ProductForm';
import ProductsCard from '../components/ProductsCard';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Store() {
  const { products } = useSelector((state) => state.product);

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
