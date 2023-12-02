package com.minet.userservice.dto;


import lombok.Data;

@Data
public class AuthDto {

    private String name;
    private String email;
    private float accountBalance;
}

