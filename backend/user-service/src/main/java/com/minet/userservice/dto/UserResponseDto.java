package com.minet.userservice.dto;

import lombok.Data;

import java.util.Map;

@Data
public class UserResponseDto {
    private UserDto user;
    private Map<String, String> token;
}

