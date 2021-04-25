import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';

export default class Cart extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false
        };
    }
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        };
        this.props.createOrder(order);
    };
    render() {
        const {cartItems} = this.props;
        return (
            <div>
                {cartItems.length === 0 ? ( 
                    <div className="cart cart-header">Cart is Empty</div>
                ) : ( 
                    <div className="cart cart-header">
                        You have {cartItems.length} in the cart {" "}
                    </div>
                )}
                <div>
                    <div classNam="cart">
                        <Fade left cascade>
                            <ul className="cart-items">
                                {cartItems.map(item => (
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.title}></img>
                                        </div>
                                        <div>
                                            <div>{item.title}</div>
                                            <div className="right">
                                                {formatCurrency(item.price)} * {item.count}{" "} 
                                                <button 
                                                    className="button" 
                                                    onClick={() => this.props.removeFromCart(item)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    ))}
                            </ul>
                        </Fade>
                    </div>
                    {cartItems.length !== 0 && (
                        <div>
                            <div className="cart">
                                <div className="total">
                                    <div>
                                        Total:{" "}
                                        {formatCurrency(
                                            cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                        )}
                                    </div>
                                    <button className="button primary" onClick={() => {this.setState({showCheckout: true})}}>Proceed</button>
                                </div>
                            </div>
                            {this.state.showCheckout && (
                                <Fade right cascade>
                                    <div className="cart">
                                        <form onSubmit={this.createOrder}>
                                            <ul className="form-container">
                                                <li>
                                                    <lable>Email</lable>
                                                    <input name="email" type="email" required onChange={this.handleInput} />
                                                </li>
                                                <li>
                                                    <lable>Name</lable>
                                                    <input name="name" type="text" required onChange={this.handleInput} />
                                                </li>
                                                <li>
                                                    <lable>Address</lable>
                                                    <input name="address" type="text" required onChange={this.handleInput} />
                                                </li>
                                                <li>
                                                    <button className="button primary" type="submit">Checkout</button>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </Fade>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
