package com.example.cart;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.example.cart.controllers.CartController;
import com.example.cart.models.Product;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class CartApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Test
	public void addProductToCart() throws Exception {
		ObjectMapper objMapper = new ObjectMapper();
		Product p = new Product("1", 1, 89);
		String productJSON = objMapper.writeValueAsString(p);

		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/cart/add/XZY").content(productJSON)
				.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();

		String expected = productJSON;
		String actual = result.getResponse().getContentAsString();
		JSONAssert.assertEquals(expected, actual, false);
	}

}
