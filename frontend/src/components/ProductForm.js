import { useState, useEffect } from 'react';
import { Button, Row, Col, Collapse, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../features/product/productSlice';
import { toast } from 'react-toastify';

function ProductForm() {
  const [open, setOpen] = useState(false);
  const [validated, setValidated] = useState(false);
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeigth] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [newProductData, setNewProductData] = useState({
    image: '',
    title: '',
    author: '',
    medium: '',
    format: [],
    price: '',
    description: '',
  });

  const dispatch = useDispatch();

  const { productLoading, productSuccess } = useSelector(
    (state) => state.product
  );
  const { image, title, author, medium, format, price, description } =
    newProductData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'length') {
      setLength(value);
      setNewProductData((prevNewProductData) => {
        return {
          ...prevNewProductData,
          format: [value, width, height],
        };
      });
    }

    if (name === 'width') {
      setWidth(value);
      setNewProductData((prevNewProductData) => {
        return {
          ...prevNewProductData,
          format: [length, value, height],
        };
      });
    }

    if (name === 'height') {
      setNewProductData((prevNewProductData) => {
        setHeigth(value);
        return {
          ...prevNewProductData,
          format: [length, width, value],
        };
      });
    }

    if (name === 'image') {
      previewImage(e.target.files[0]);
      setNewProductData((prevNewProductData) => {
        return {
          ...prevNewProductData,
          [name]: value,
        };
      });
    } else {
      setNewProductData((prevNewProductData) => {
        return {
          ...prevNewProductData,
          [name]: value,
        };
      });
    }
  };

  const previewImage = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    e.preventDefault();
    if (!selectedImage) {
      toast.error('You must add an image');
      return;
    }
    const newProductObject = {
      image: selectedImage,
      title,
      author,
      medium,
      format,
      price: parseInt(price),
      description,
    };

    dispatch(createProduct(newProductObject));
  };

  const resetForm = () => {
    setOpen(false);
    setValidated(false);
    setLength('');
    setWidth('');
    setHeigth('');
    setSelectedImage('');
    setNewProductData({
      image: '',
      title: '',
      author: '',
      medium: '',
      format: [],
      price: '',
      description: '',
    });
  };

  useEffect(() => {
    if (productSuccess) {
      resetForm();
    }
  }, [productSuccess]);

  return (
    <Row className="justify-content-center">
      <Col md="8">
        <Row className="justify-content-center">
          <Col md="auto">
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="collapse-new-product"
              aria-expanded={open}
              variant="outline-dark"
              size="sm"
            >
              Add a new art piece
            </Button>
          </Col>
        </Row>
        <br />
        <Collapse in={open}>
          <div id="collapse-new-product">
            <Row className="justify-content-center">
              <Col md="auto">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="new art piece"
                    className="image-selected"
                  />
                )}
              </Col>
            </Row>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  required
                  name="image"
                  type="file"
                  value={image}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  name="title"
                  type="text"
                  value={title}
                  placeholder="Enter title"
                  onChange={handleChange}
                />
              </Form.Group>

              <Row>
                <Col lg={6} md={12}>
                  <Form.Group className="mb-3" controlId="author">
                    <Form.Label>Artist</Form.Label>
                    <Form.Control
                      required
                      name="author"
                      type="text"
                      value={author}
                      placeholder="Enter the artist"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="medium">
                    <Form.Label>Medium</Form.Label>
                    <Form.Control
                      required
                      name="medium"
                      type="text"
                      value={medium}
                      placeholder="Enter the medium"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={12}>
                  <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price (in €)</Form.Label>
                    <Form.Control
                      required
                      name="price"
                      type="number"
                      min="0"
                      value={price}
                      placeholder="Enter price"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="length">
                    <Form.Label>Length (mm)</Form.Label>
                    <Form.Control
                      required
                      name="length"
                      type="number"
                      min="0"
                      value={length}
                      placeholder="Length"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="width">
                    <Form.Label>Width (mm)</Form.Label>
                    <Form.Control
                      required
                      name="width"
                      type="number"
                      min="0"
                      value={width}
                      placeholder="Width"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="height">
                    <Form.Label>height (mm)</Form.Label>
                    <Form.Control
                      required
                      name="height"
                      type="number"
                      min="0"
                      value={height}
                      placeholder="Height"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                name="description"
                value={description}
                placeholder="Describe the art piece here.."
                onChange={handleChange}
                style={{ height: '100px' }}
              />
              <br />

              <Row className="justify-content-center">
                <Col md="auto">
                  <Button variant="primary" type="submit">
                    {productLoading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Collapse>
      </Col>
    </Row>
  );
}

export default ProductForm;
