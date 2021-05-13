import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import CartItem from './CartItem';
import { addToCart, getCartItems, removeCartItem } from '../../redux/actions';

import './style.css';
import { MaterialButton } from '../../components/MaterialUI';
import PriceDetails from '../../components/PriceDetails';

const CartPage = (props) => {

    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    // const cartItems = cart.cartItems;
    const [cartItems, setCartItems] = useState(cart.cartItems);
    const dispatch = useDispatch();

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    useEffect(() => {
        if(auth.authenticate){
            dispatch(getCartItems());
        }
    }, [auth.authenticate]);

    const onQuantityIncrement = (id, qty) => {
        // console.log(_id, qty);
        const { _id, name, price, img, type, variantId } = cartItems[id]
        if(variantId){
            console.log(variantId, _id, 'okokok');
            dispatch(addToCart({ _id, name, price, img, type, variantId }, 1));
        }else{
            dispatch(addToCart({ _id, name, price, img }, 1));
        }
    }

    const onQuantityDecrement = (id, qty) => {
        const { _id, name, price, img, type, variantId } = cartItems[id]
        if(variantId){
            dispatch(addToCart({ _id, name, price, img, type, variantId }, -1));
        }else{
            dispatch(addToCart({ _id, name, price, img }, -1));
        }
    }

    const onRemoveCartItem = (_id, variantId) => {
        if(variantId){
            dispatch(removeCartItem({ productId: _id, variantId: variantId }));
        }else{
            dispatch(removeCartItem({ productId: _id }));
        }
    };
    
    if(props.onlyCartItems){
        return (
            <>
            {
                Object.keys(cartItems).map((key, index) => 
                    <CartItem 
                        key={index}
                        cartItem={cartItems[key]}
                        onQuantityInc={onQuantityIncrement}
                        onQuantityDec={onQuantityDecrement}
                    />
                )
            }
            </>
        )
    }

    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems: 'flex-start' }}>
                <Card
                    headerLeft={`My Cart`}
                    headerRight={<div>Deliver to</div>}
                    style={{ width: 'calc(100% - 400px', overflow: 'hidden'}}
                >
                    {
                        Object.keys(cartItems).map((key, index) => 
                            <CartItem 
                                key={index}
                                cartItem={cartItems[key]}
                                onQuantityInc={onQuantityIncrement}
                                onQuantityDec={onQuantityDecrement}
                                onRemoveCartItem={onRemoveCartItem}
                            />
                        )
                    }

                    <div style={{
                        width: '100%',
                        display: 'flex',
                        background: '#fff',
                        justifyContent: 'flex-end',
                        boxShadow: '0 0 10px 10px #eee',
                        boxSizing: 'border-box'
                    }}>
                        <div style={{ width: '250px' }}>
                            <MaterialButton
                                title="PLACE ORDER" 
                                onClick={() => props.history.push('/checkout')}
                            />
                        </div>
                    </div>
                    
                </Card>
                <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                        return qty + cart.cartItems[key].qty;
                    }, 0)}
                    totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const { price, qty } = cart.cartItems[key];
                        return totalPrice + price * qty;
                    }, 0)}
                />
            </div>
        </Layout>
    )
}

export default CartPage
