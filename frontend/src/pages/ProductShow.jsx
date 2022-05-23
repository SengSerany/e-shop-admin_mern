import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

function ProductShow() {
  const params = useParams();
  const { products } = useSelector((state) => state.product);

  const currentProduct = products.find((product) => product._id === params.id);

  function priceWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  return (
    <div>
      <Row className="justify-content-center">
        <Col md="auto">
          <img
            src={currentProduct.image}
            alt={currentProduct.title}
            className="img-show-product"
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Row>
            <Col>
              <h1 className="h1-show-product">
                {currentProduct.title}{' '}
                <em className="h1-em-author">by {currentProduct.author}</em>
              </h1>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={4}>
              <h5>{currentProduct.medium}</h5>
            </Col>
            <Col md={{ span: 4, offset: 4 }} className="text-on-right">
              <h6>{`Format : ${currentProduct.format[0]} x ${currentProduct.format[1]} x ${currentProduct.format[2]} mm`}</h6>
            </Col>
          </Row>
          <p>{currentProduct.description}</p>
          <Row>
            <Col md={4}>
              <Link to={`/product/${currentProduct._id}/edit`}>
                <Button
                  className="space-right"
                  variant="outline-warning"
                  size="sm"
                >
                  Edit
                </Button>
              </Link>
              <Button variant="outline-danger" size="sm">
                Delete
              </Button>
            </Col>
            <Col className="text-on-right" md={{ span: 4, offset: 4 }}>
              <p>
                Price: <strong>{priceWithSpaces(currentProduct.price)}€</strong>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Link to={`/store`}>
        <Button variant="outline-dark" size="sm">
          <FaArrowLeft /> Back
        </Button>
      </Link>
    </div>
  );
}

export default ProductShow;
