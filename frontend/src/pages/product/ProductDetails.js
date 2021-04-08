import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import ListReviews from '../review/ListReviews';
import Loader from '../../components/util/Loader';
import MetaData from '../../components/util/MetaData';

import { addItemToCart } from '../../store/actions/cartActions';
import { clearErrors, getProductDetails, newReview, newReviewReset } from '../../store/actions/productAction';

const ProductDetails = ({ match }) => {
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();
    const alert = useAlert();

    const { user } = useSelector((state) => state.auth);
    const { loading, error, product } = useSelector((state) => state.productDetails);
    const { error: reviewError, success } = useSelector((state) => state.newReview);

    const decreaseQty = () => {
        const count = document.querySelector('.count');
        if (count.valueAsNumber <= 1) {
            return;
        }

        setQuantity((current) => current - 1);
    };

    const increaseQty = () => {
        const count = document.querySelector('.count');
        if (count.valueAsNumber >= product.stock) {
            return;
        }

        setQuantity((current) => current + 1);
    };

    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity));
        alert.success('Item added to cart!');
    };

    const setUserRatings = () => {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.starValue = index + 1;

            star.addEventListener('click', function (event) {
                stars.forEach((star, index) => {
                    if (index < this.starValue) {
                        star.classList.add('orange');
                        setRating(this.starValue);
                    } else {
                        star.classList.remove('orange');
                    }
                });
            });

            star.addEventListener('mouseover', function (event) {
                stars.forEach((star, index) => {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow');
                    }
                });
            });

            star.addEventListener('mouseout', function (event) {
                stars.forEach((star, index) => {
                    star.classList.remove('yellow');
                });
            });
        });
    };

    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', match.params.id);

        dispatch(newReview(formData));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
            return;
        }
        if (reviewError) {
            alert.error(error);
            dispatch(clearErrors());
            return;
        }
        if (success) {
            alert.success('Review posted succesfully!');
            dispatch(newReviewReset());
        }
        dispatch(getProductDetails(match.params.id));
    }, [dispatch, alert, error, reviewError, success, match.params.id]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title={product.name} />
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause="hover">
                                {product.images &&
                                    product.images.map((image) => (
                                        <Carousel.Item key={image.public_id}>
                                            <img className="d-block w-100" src={image.url} alt={product.title} />
                                        </Carousel.Item>
                                    ))}
                            </Carousel>
                        </div>
                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Product # {product._id}</p>
                            <hr />
                            <div className="rating-outer">
                                <div
                                    className="rating-inner"
                                    style={{ width: `${(product.ratings / 5) * 100}%` }}
                                ></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                            <hr />
                            <p id="product_price">${product.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>
                                    -
                                </span>
                                <input
                                    type="number"
                                    className="form-control count d-inline"
                                    value={quantity}
                                    readOnly
                                />
                                <span className="btn btn-primary plus" onClick={increaseQty}>
                                    +
                                </span>
                            </div>
                            <button
                                type="button"
                                id="cart_btn"
                                className="btn btn-primary d-inline ml-4"
                                disable={product.stock === 0}
                                onClick={addToCart}
                            >
                                Add to Cart
                            </button>
                            <hr />
                            <p>
                                Status:{' '}
                                <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'}>
                                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </p>
                            <hr />
                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-3">
                                Sold by: <strong>{product.seller}</strong>
                            </p>
                            {user ? (
                                <button
                                    id="review_btn"
                                    type="button"
                                    className="btn btn-primary mt-4"
                                    data-toggle="modal"
                                    data-target="#ratingModal"
                                    onClick={setUserRatings}
                                >
                                    Submit Your Review
                                </button>
                            ) : (
                                <div className="alert alert-danger mt-5" type="alert">
                                    Login to post your review.
                                </div>
                            )}

                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">
                                    <div
                                        className="modal fade"
                                        id="ratingModal"
                                        tabIndex="-1"
                                        role="dialog"
                                        aria-labelledby="ratingModalLabel"
                                        aria-hidden="true"
                                    >
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">
                                                        Submit Review
                                                    </h5>
                                                    <button
                                                        type="button"
                                                        className="close"
                                                        data-dismiss="modal"
                                                        aria-label="Close"
                                                    >
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <ul className="stars">
                                                        <li className="star">
                                                            <i className="fa fa-star"></i>
                                                        </li>
                                                        <li className="star">
                                                            <i className="fa fa-star"></i>
                                                        </li>
                                                        <li className="star">
                                                            <i className="fa fa-star"></i>
                                                        </li>
                                                        <li className="star">
                                                            <i className="fa fa-star"></i>
                                                        </li>
                                                        <li className="star">
                                                            <i className="fa fa-star"></i>
                                                        </li>
                                                    </ul>
                                                    <textarea
                                                        name="review"
                                                        id="review"
                                                        className="form-control mt-3"
                                                        value={comment}
                                                        onChange={(event) => setComment(event.target.value)}
                                                    ></textarea>
                                                    <button
                                                        className="btn my-3 float-right review-btn px-4 text-white"
                                                        data-dismiss="modal"
                                                        aria-label="Close"
                                                        onClick={reviewHandler}
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {product.reviews?.length > 0 && <ListReviews reviews={product.reviews} />}
                </>
            )}
        </>
    );
};

export default ProductDetails;