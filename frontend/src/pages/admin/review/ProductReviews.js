import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from '../Sidebar';
import MetaData from '../../../components/util/MetaData';

import { clearErrors, deleteReview, deleteReviewReset, getProductReviews } from '../../../store/actions/productAction';

const ProductReviews = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const [productId, setProductId] = useState('');

    const { error, reviews = [] } = useSelector((state) => state.productReviews);
    const { isDeleted, error: deleteError } = useSelector((state) => state.review);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success('Review deleted succesfully!');
            dispatch(deleteReviewReset());
        }

        if (productId !== '') {
            dispatch(getProductReviews(productId));
        }
    }, [dispatch, alert, error, history, productId, isDeleted, deleteError]);

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId));
    };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(getProductReviews(productId));
    };

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review id',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc',
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc',
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: [],
        };
        reviews.forEach((review) => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,
                actions: (
                    <>
                        <button
                            className="btn btn-danger py-1 px-2 ml-2"
                            onClick={() => deleteReviewHandler(review._id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                ),
            });
        });
        return data;
    };

    return (
        <>
            <MetaData title="Product reviews" />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <>
                        <div className="row justify-content-center mt-5">
                            <div className="col-5">
                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <label htmlFor="productId_field">Enter Product ID</label>
                                        <input
                                            type="text"
                                            id="productId_field"
                                            className="form-control"
                                            value={productId}
                                            onChange={(event) => setProductId(event.target.value)}
                                        />
                                    </div>

                                    <button id="search_button" type="submit" className="btn btn-primary btn-block py-2">
                                        SEARCH
                                    </button>
                                </form>
                            </div>
                        </div>

                        {reviews && reviews.length > 0 ? (
                            <MDBDataTable data={setReviews()} className="px-3" bordered striped hover />
                        ) : (
                            <p className="mt-5 text-center">No reviews</p>
                        )}
                    </>
                </div>
            </div>
        </>
    );
};

export default ProductReviews;
