package com.example.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.ProductRepository;

import java.util.List;

@RestController
@CrossOrigin(origins="*")
public class ProductController {

    @Autowired
    private ProductRepository repo;

    @PostMapping("/addproduct")
    public String addProduct(@RequestBody Product product){

        repo.save(product);

        return "Product Added Successfully";
    }

    @GetMapping("/products")
    public List<Product> getProducts(){

        return repo.findAll();
    }
}