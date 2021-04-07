import React, { useEffect } from 'react';
import { clearErrors, deleteOrder, deleteOrderReset, getAllOrders } from '../../store/actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import Loader from '../common/Loader';
import { MDBDataTable } from 'mdbreact';
import MetaData from '../common/MetaData';
import Sidebar from './Sidebar';
import { useAlert } from 'react-alert';

const OrderList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders = [] } = useSelector((state) => state.allOrders);
    const { isDeleted } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getAllOrders());
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success('Order deleted succesfully!');
            history.push('/admin/orders');
            dispatch(deleteOrderReset());
        }
    }, [dispatch, alert, error, history, isDeleted]);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order id',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Num of Items',
                    field: 'numOfItems',
                    sort: 'asc',
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc',
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: [],
        };
        orders.forEach((order) => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: String(order?.orderStatus ?? '').includes('Delivered') ? (
                    <p style={{ color: 'green' }}>{order.orderStatus}</p>
                ) : (
                    <p style={{ color: 'red' }}>{order.orderStatus}</p>
                ),
                actions: (
                    <>
                        <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-eye"></i>
                        </Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
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
            <MetaData title="All orders" />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">All orders</h1>
                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable data={setOrders()} className="px-3" bordered striped hover />
                        )}
                    </>
                </div>
            </div>
        </>
    );
};

export default OrderList;