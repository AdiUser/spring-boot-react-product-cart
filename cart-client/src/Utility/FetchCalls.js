import { API_URL, GET_CART, ADD_TO_CART, REMOVE_FROM_CART } from '../Constants/Endpoints'

export function removeProduct(props) {
    let url = REMOVE_FROM_CART.replace('{cartID}', props.cartID)
        .replace('{productID}', props.product.id)

    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: props.product.id,
            count: 1,
            price: props.product.price
        }),
    })
}

export function addProduct(props) {
    return fetch(ADD_TO_CART.replace('{cartID}', props.cartID), {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: props.product.id,
            count: 1,
            price: props.product.price
        }),
    })
}

export function fetchProducts() {
    return fetch(API_URL)
}

export function fetchCart(cartID) {
    return fetch(GET_CART.replace('{cartID}', cartID), {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
}