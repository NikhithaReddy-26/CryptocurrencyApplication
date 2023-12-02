package com.minet.userservice.controller;

import com.minet.userservice.dto.*;
import com.minet.userservice.exception.UserNotFoundException;
import com.minet.userservice.service.JwtGenerator;
import com.minet.userservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

import java.util.List;


@RestController
@RequestMapping("/users")
@Slf4j
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    private JwtGenerator jwtGenerator;

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable int id) {
        try {
            log.info("Fetching user with ID: {}", id);
            UserDto user = userService.getUserById(id);
            if (user == null) {
                String errorMessage = "User not found with ID - " + id;
                log.warn(errorMessage);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
            }
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            String errorMessage = "User not found with ID - " + id;
            log.warn(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        } catch (Exception e) {
            String errorMessage = "Failed to retrieve user with ID - " + id;
            log.error(errorMessage, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> login(@RequestBody LoginDto loginDto){
        try {
            UserDto userDto= userService.getUser(loginDto);
            Map<String,String> token= jwtGenerator.generateToken(userDto);
            UserResponseDto responseDto= new UserResponseDto();
            responseDto.setUser(userDto);
            responseDto.setToken(token);

            return new ResponseEntity<>(responseDto, HttpStatus.OK);

        }catch (IllegalArgumentException e){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }catch (UserNotFoundException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@RequestBody SignupDto signupDto){
        try {
            UserDto createdUser= userService.createUser(signupDto);
            Map<String, String> token= jwtGenerator.generateToken(createdUser);

            UserResponseDto responseDto = new UserResponseDto();
            responseDto.setUser(createdUser);
            responseDto.setToken(token);
            return new ResponseEntity<>(responseDto,HttpStatus.CREATED);
        }catch (IllegalArgumentException e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<String> validateToken(@RequestParam("token") String token) {
        boolean isValid=userService.validateToken(token);
        if (isValid){
            return new ResponseEntity<>("Valid Request",HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Invalid Request",HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        try {
            List<UserDto> users = userService.getAllUsers();
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            throw new UserNotFoundException("Failed to retrieve user details");
        }
    }
    @PostMapping("/auth0")
    public ResponseEntity<UserResponseDto> auth0Register(@RequestBody AuthDto authDto){


        UserDto user= userService.getUserDetailsFromToken(authDto);
        Map<String, String> token= jwtGenerator.generateToken(user);
        UserResponseDto responseDto = new UserResponseDto();
        responseDto.setUser(user);
        responseDto.setToken(token);
        return new  ResponseEntity<>(responseDto,HttpStatus.CREATED);
    }

    @PatchMapping("/resetPassword")
    public ResponseEntity<String> resetPassword(@RequestBody LoginDto loginDto){
        userService.resetPassword(loginDto);
        return new ResponseEntity<>("Password Reset Successfully",HttpStatus.OK);
    }
}
