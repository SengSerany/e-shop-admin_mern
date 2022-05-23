import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';

function ProductsCard({ product }) {
  const [active, setActive] = useState(false);

  const handleMouseEnter = () => {
    setActive(true);
  };

  const handleMouseLeave = () => {
    setActive(false);
  };

  function priceWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  return (
    <Col md="auto">
      <Link to={`/product/${product._id}`}>
        <Card
          className="index-product-image rounded-3"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="index-product-image">
            <Card.Img variant="top" src={product.image} />
          </div>

          <div className={`${!active && 'd-none'} product-card-body`}>
            <Card.Body className={``}>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                {`Artist : ${product.author}`}
                <br />
                {`Medium : ${product.medium}`}
                <br />
                {`Format : ${product.format[0]} x ${product.format[1]} x ${product.format[2]} mm`}
                <br />
                {`Price : ${priceWithSpaces(product.price)}€`}
                <br />
                Description: ...
              </Card.Text>
            </Card.Body>
          </div>
        </Card>
      </Link>
    </Col>
  );
}

export default ProductsCard;
