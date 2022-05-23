import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductForm from '../components/ProductForm';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

function ProductEdit() {
  const params = useParams();
  const { products } = useSelector((state) => state.product);

  const { image, title, author, medium, price, format, description } =
    products.find((product) => product._id === params.id);

  return (
    <>
      <h1 className="h1-show-product text-center">Edit : {title}</h1>
      <br />
      <ProductForm
        initImage={image}
        initTitle={title}
        initAuthor={author}
        initMedium={medium}
        initPrice={price}
        initFormat={format}
        initDescription={description}
      />
      <Link to={`/product/${params.id}`}>
        <Button variant="outline-dark" size="sm">
          <FaArrowLeft /> Back
        </Button>
      </Link>
    </>
  );
}

export default ProductEdit;
