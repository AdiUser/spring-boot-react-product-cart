package com.example.cart.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cart.models.Product;

@RestController
public class CartController {
	@RequestMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";
	}
	
	@GetMapping("/api/cart/{cartID}")
	public List<Product> getCart(@PathVariable String cartID, HttpSession session) {
		@SuppressWarnings("unchecked")
		List<Product> cart = (List<Product>) session.getAttribute(cartID);
		
		if(cart == null) 
			return new ArrayList<Product>();
		
		return cart;
	}
	
	@PostMapping("/api/cart/add/{cartID}")
	public Product addToCart(@PathVariable String cartID, @RequestBody Product product, HttpSession  session) {
		
		@SuppressWarnings("unchecked")
		List<Product> cart = (List<Product>) session.getAttribute(cartID);
		
		if(cart == null) {
			// adding first product in the cart
			List<Product> items = new ArrayList<Product>();
			items.add(product);
			session.setAttribute(cartID, items);
			System.out.println("CART WAS EMPTY, ADDED NEW PRODUCT " + product.getId());
		}
		else {
			// cart  already has some products
			// 1. if this product is already added, then increase the count of this product
			// 2. if this product is not added, then simply add this product
			boolean isProductAdded = false;
			for(int i = 0; i < cart.size(); i++) {
				if(cart.get(i).getId().equals(product.getId())) {
					Product p = cart.get(i);
					p.setCount(p.getCount() + product.getCount());
					cart.set(i, p);
					isProductAdded = true;
					product = p;
					break;
				}
			}
			
			if(!isProductAdded) {
				// product is not present in the cart
				// add new product
				cart.add(product);
			}
		}
		
		return product;
	}
	
	@PostMapping("/api/cart/remove/{cartID}/{productID}")
	public boolean removeProductFromCart(@PathVariable String cartID, @PathVariable String productID,
				HttpSession session) {
		
		@SuppressWarnings("unchecked")
		List<Product> cart = (List<Product>) session.getAttribute(cartID);
		
		if(cart != null) {
			// if there are some products in the cart
			// find product that needs to be deleted
			for(int i = 0; i < cart.size(); i++) {
				if(cart.get(i).getId().equals(productID)) {
					// found product that needs to deleted 
					Product p = cart.get(i);
					
					if(p.getCount() - 1 > 0) {
						p.setCount(p.getCount() - 1);
						cart.set(i, p);
					}
					else {
						// if on removing one element from the cart makes 
						// it's count to zero then remove the product from cart itself
						cart.remove(i);
					}
					
					break;
				}
			}
		}
		
		return true;
	}

}
