import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './cartItem';
import { products } from '../products';
import { toggleStatusTab } from '../stores/cart';

const CartTab = () => {
    const carts = useSelector(store => store.cart.items);
    const statusTab = useSelector(store => store.cart.statusTab);
    const dispatch = useDispatch();

    const handleCloseTabCart = () => {
        dispatch(toggleStatusTab());
    };

    // Calculate total amount
    const totalAmount = carts.reduce((total, item) => {
        const productDetail = products.find(product => product.id === item.productId);
        if (productDetail) {
            return total + (productDetail.price * item.quantity);
        }
        return total;
    }, 0);

    return (
        <div className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_auto] 
        transform transition-transform duration-500
        ${statusTab === false ? "translate-x-full" : ""}
        `}>
            <h2 className='p-5 text-white text-2xl'>Shopping Cart</h2>
            <div className='p-5 overflow-y-auto'>
                {carts.map((item, key) => 
                    <CartItem key={key} data={item}/>
                )}
            </div>
            {/* Total Section */}
            <div className='p-5 text-white text-xl font-bold flex justify-between'>
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
            </div>
            {/* Button Section */}
            <div className='grid grid-cols-2'>
                <button className='bg-black text-white p-4 text-lg' onClick={handleCloseTabCart}>CLOSE</button>
                <button className='bg-amber-600 text-white p-4 text-lg'>CHECKOUT</button>
            </div>
        </div>
    );
}

export default CartTab;
