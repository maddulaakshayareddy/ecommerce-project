package com.example.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.UserRepository;

@RestController
@CrossOrigin(origins="*")
public class UserController {

@Autowired
private UserRepository repo;

@PostMapping("/register")
public String register(@RequestBody User user){

repo.save(user);
return "User Registered Successfully";

}

@PostMapping("/login")
public User login(@RequestBody User user){

return repo.findByUsernameAndPassword(user.getUsername(),user.getPassword());

}

}