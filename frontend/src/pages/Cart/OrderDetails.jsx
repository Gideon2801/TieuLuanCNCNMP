import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../components/layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, clearErrors, cancelOrder } from "../../actions/orderAction";
import Loader from "../../components/layout/Loader/Loader";
import { useAlert } from "react-alert";
import { dolaSymbol } from "../../constants/constants";
import Button from '../../components/user/Button';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const alert = useAlert();
  const params = useParams();

  const {
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.order);

  const [status, setStatus] = useState('Cancel');

  const updateStatussOrder = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('status', status);

    dispatch(cancelOrder(params.id, myForm));
  };
  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('Cập nhật trạng thái đơn hàng thành công');
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(params.id));
  }, [alert, dispatch, error, isUpdated, updateError, params.id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Chi tiết đơn hàng`} />

          <div className="h-auto py-24">
            <div className="w-[90%] mx-auto">
              <div>
                <p className="heading">Thông tin giao hàng</p>
              </div>
              <div className="headingData">
                <div className="flex gap-3 ">
                  <p>Tên: </p>
                  <span className="text-slate-600">
                    {order.user && order.shippingInfo.fullname}
                  </span>
                </div>
                <div className="flex gap-3 ">
                  <p>SĐT: </p>
                  <span className="text-slate-600">
                    {order.user && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div className="flex gap-3 ">
                  <p>Địa chỉ: </p>
                  <span className="text-slate-600">
                    {order.user &&
                      `${order.shippingInfo.fullname} - ${order.shippingInfo.address}, ${order.shippingInfo.city} `}
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <p className="heading">Chi tiết thanh toán</p>
                <div className="headingData">
                  <div className="flex gap-3">
                    <p>Thanh toán: </p>
                    <p
                      className={`${
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "text-green-500"
                          : "text-red-500"
                      }  `}
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "Đã thanh toán"
                        : "Chưa thanh toán"}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <p>Số tiền: </p>
                    <span className="text-slate-600">
                      {dolaSymbol}
                      {order.totalPrice && order.totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <p className="heading">Trạng thái đơn hàng</p>
                <div className="headingData">
                  <div className="flex gap-3">
                    <p className="flex gap-3">
                      Đơn hàng:{" "}
                      <p
                        className={`${
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "text-green-500"
                            : "text-red-500"
                        }  `}
                      >
                        {order.orderStatus && order.orderStatus === "Delivered"
                          ? "Đã giao hàng"
                          : order.orderStatus === "Shipped"
                          ? "Đang vận chuyển"
                          : order.orderStatus === "Cancel"
                          ? "Đã hủy"
                          : "Đang xử lí"}
                      </p>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <p className="heading">Chi tiết đơn hàng: </p>
                <div className="headingData">
                  {order.orderItems &&
                    order.orderItems.map((item, index) => {
                      console.log(order.orderItems);
                      return (
                        <div
                          key={index}
                          className="flex gap-x-7 mt-3 items-center"
                        >
                          <img
                            className="w-[10vmax] md:w-[5vmax]"
                            src={item.image}
                            alt="Product"
                          />
                          <Link
                            className="capitalize"
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                          <span>
                            {item.quantity} X {dolaSymbol}
                            {item.price} ={" "}
                            <b>
                              {dolaSymbol}
                              {item.price * item.quantity}
                            </b>
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          {order.orderStatus == 'Processing' && (
            <form onSubmit={updateStatussOrder}>
              <Button id="btn-signup" label="Hủy đơn hàng"
            />
            </form>
           
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
