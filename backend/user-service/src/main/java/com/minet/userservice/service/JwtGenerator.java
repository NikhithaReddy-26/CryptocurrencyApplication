package com.minet.userservice.service;


import com.minet.userservice.dto.UserDto;

import java.util.Map;

public interface JwtGenerator {
    Map<String, String> generateToken(UserDto userDto);
}

