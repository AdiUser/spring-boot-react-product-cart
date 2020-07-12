# spring-boot-react-product-cart
Assignment Task - 1 Build Product Cart using Java 8, Spring Boot and React JS

## Demo Data APIs
This project uses `https://picsum.photos/v2/list?page=1&limit=20` to fetch the data.
I'm showing images and author names in the UI with random prices (I have modified the data to add random prices)

## Cart APIs
Once you hover over any product you will see a `+ Add to cart` button, clicking on it will add the product to your cart.
Once you have added one item for that product, there will be a counter visible to add or remove quantity.
Following APIs are used to add / remove products from the cart

```
GET  /api/cart/{cartID} - to get all the products in the cart

POST /api/cart/add/{cartID} - to add a product in cart
-- in the request body, you will have to pass a product object, that should have 'productID', 'count' and 'price'

POST /api/cart/remove/{cartID} - to remove product from the cart
-- in the request body you'll have to send the 'productID' id of the product that you want to remove
```

## How is the cart working at the backend
 The API server runs Spring Boot 2.3.1. The cart is managed in `HttpSessions`, when you make a call to API 
 a session is made on the server and you're cart products are saved in that. This is a in-memory model for this implementation
 of cart system, i.e. if you were to restart the API server you will loose all your cart data. However, if you were to relaod the page then all the products will be preserved.

## Scope of improvement 
* Make UI responsive
* Add tab to see the in-cart products 
* Add summary tab to see total price of the cart
* Show checkout option
* Integrate a payment gateway 

 ## UI Demo
 ![Demo UI Image](https://github.com/AdiUser/spring-boot-react-product-cart/blob/master/cart-client/public/ui-demo.png)