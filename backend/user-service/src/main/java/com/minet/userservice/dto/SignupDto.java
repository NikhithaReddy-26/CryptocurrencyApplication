package com.minet.userservice.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class SignupDto {

    private String name;
    private String email;
    private float accountBalance;
    private  String password;
}

