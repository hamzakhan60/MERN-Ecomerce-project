import React, { useState, useEffect, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { UserLoginContext } from "./context/userLoginContext";
import { UpdateCartContext } from "./context/updatedCartContext";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Loading from "./Loading";

function CartSlider({ open, setOpen }) {
    const [cartItems, setCartItems] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const { userLoginCredential } = useContext(UserLoginContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
    const [subTotal, setSubtotal] = useState();
    const [updatedCartData, setUpdatedCartData] = useState({});
    console.log(updateCart)

    const handleUpdateCart = () => {
        axios.put("http://localhost:8000/cart", updatedCartData, {
            params: userLoginCredential,
        }).then((d) => {
            setCartItems(d.data.cartData.items);
            setSubtotal(d.data.subTotal);
            setUpdateCart(false);
        }).catch((err) => {
            if (err.response) {
                alert(err.response.data);
            } else {
                alert("Server Not Found");
            }
            navigate("/login");
        });

        setUpdatedCartData({});
        setIsUpdated(true);
    };

    useEffect(() => {
        const getCart = () => {
            axios.get("http://localhost:8000/cart", {
                params: userLoginCredential,
            }).then((d) => {
                if (d.status === 204) {
                    setCartItems([]);
                } else {
                    setCartItems(d.data.cartData.items);
                    setSubtotal(d.data.subTotal);
                }
                setLoading(false);
                setUpdateCart(false);
            }).catch(err => {
                if (err.response) {
                    console.log(err.response.data);
                } else {
                    alert("Server Not Found");
                }
            });
        };

        if (userLoginCredential ) {
            getCart();
        } else if (!userLoginCredential) {
            setLoading(false);
        }

        return () => {
            setLoading(false);
        };
    }, [updateCart, userLoginCredential]);

    const handleRemoveItem = (itemsId) => {
        axios.delete(`http://localhost:8000/cart`, {
            params: {
                token: userLoginCredential.token,
                id: userLoginCredential.id,
                role: userLoginCredential.role,
                itemsId: itemsId
            },
        }).then((d) => {
            setCartItems(d.data.cartData.items);
            setSubtotal(d.data.subTotal);
            setUpdateCart(true);
        }).catch((err) => {
            if (err.response) {
                alert(err.response.data);
            } else {
                alert("Server Not Found");
            }
        });
    };

    const handleQuantityChange = (product, newQuantity) => {
        const data = {
            productId: product.productId,
            quantity: newQuantity,
            itemsId: product._id,
            size: product.size,
            color: product.color,
        };

        setCartItems(cartItems.map((d) => {
            if (d._id === product._id) {
                d.quantity = newQuantity;
            }
            return d;
        }));
        setUpdatedCartData(data);
        setIsUpdated(true);
    };

    return (
        <Transition.Root show={open} as={React.Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={React.Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={React.Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {cartItems && cartItems.length > 0 ? (
                                                            cartItems.map((product) => (
                                                                <li key={product._id} className="flex py-6">
                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                        <img
                                                                            src={((product.productId.clothId && product.productId.clothId.imgUrl) || (product.productId.fragranceId && product.productId.fragranceId.imgUrl))}
                                                                            alt="Loading..."
                                                                            className="h-full w-full object-cover object-center"
                                                                        />
                                                                    </div>

                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                <h3>
                                                                                    <Link to={`/details/${product.productId._id}`}>{product.productId.ProductName}</Link>
                                                                                </h3>
                                                                                <p className="ml-4">{product.productId.Price}</p>
                                                                            </div>
                                                                            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                                        </div>
                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                            <input
                                                                                type="number"
                                                                                min="1"
                                                                                value={product.quantity}
                                                                                onChange={(e) => handleQuantityChange(product, parseInt(e.target.value))}
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                className="text-black-600 hover:text-red-900"
                                                                                onClick={() => handleRemoveItem(product._id)}
                                                                            >
                                                                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))) : (<p className="text-center text-gray-500 mt-8">Your cart is empty</p>)}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Subtotal</p>
                                                <p>{subTotal}</p>
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                            <div className="mt-6">
                                                <Link to="orderHistory">
                                                    <button
                                                        disabled={cartItems.length === 0}
                                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 w-full py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                    >
                                                        Checkout
                                                    </button>
                                                </Link>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                    or{' '}
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        Continue Shopping
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
                                            </div>
                                            <div className="mt-6">
                                                <button
                                                    type="button"
                                                    className={`flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm ${isUpdated ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}
                                                    disabled={!isUpdated}
                                                    onClick={handleUpdateCart}
                                                >
                                                    Update Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default CartSlider;
