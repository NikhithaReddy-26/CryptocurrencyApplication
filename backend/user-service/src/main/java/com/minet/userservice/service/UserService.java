package com.minet.userservice.service;

import com.minet.userservice.dto.AuthDto;
import com.minet.userservice.dto.LoginDto;
import com.minet.userservice.dto.SignupDto;
import com.minet.userservice.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto getUserById(int id);

    UserDto getUser(LoginDto loginDto);

    UserDto createUser(SignupDto signupDto);

    boolean validateToken(String token);

    List<UserDto> getAllUsers();

    public UserDto  getUserDetailsFromToken(AuthDto authDto);
    boolean verifyEmail(String email);

    void resetPassword(LoginDto loginDto);

}

