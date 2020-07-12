package com.example.cart.models;

public class Product {

	private String id;
	private int count;
	private float price;

	public Product(String id, int count, float price) {
		super();
		this.id = id;
		this.count = count;
		this.price = price;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", count=" + count + ", price=" + price + "]";
	}

}
