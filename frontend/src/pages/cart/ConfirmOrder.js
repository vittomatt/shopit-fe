import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CheckoutSteps from './CheckoutSteps';
import MetaData from '../../components/util/MetaData';

const ConfirmOrder = ({ history }) => {
    const { cartItems, shippingInfo } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingPrice = itemsPrice > 200 ? 0 : 25;
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const proceedToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice,
        };

        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        history.push('/payment');
    };

    return (
        <>
            <MetaData title="Confirm Order" />
            <CheckoutSteps shippingStep confirmOrderStep />

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">
                    <h4 className="mb-3">Shipping Info</h4>
                    <p>
                        <b>Name: </b>
                        {user?.name}
                    </p>
                    <p>
                        <b>Phone: </b> {shippingInfo.phoneNumber}
                    </p>
                    <p className="mb-4">
                        <b>Address: </b>{' '}
                        {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
                    </p>
                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>

                    {cartItems.map((item) => (
                        <div key={item.product}>
                            <hr />
                            <div className="cart-item my-1">
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.images[0].url} alt="Laptop" height="45" width="65" />
                                    </div>
                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>
                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>
                                            {item.quantity} x ${item.price} ={' '}
                                            <b>${(item.quantity * item.price).toFixed(2)}</b>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>
                            Subtotal: <span className="order-summary-values">${itemsPrice}</span>
                        </p>
                        <p>
                            Shipping: <span className="order-summary-values">${shippingPrice}</span>
                        </p>
                        <p>
                            Tax: <span className="order-summary-values">${taxPrice}</span>
                        </p>
                        <hr />
                        <p>
                            Total: <span className="order-summary-values">${totalPrice}</span>
                        </p>
                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={proceedToPayment}>
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmOrder;