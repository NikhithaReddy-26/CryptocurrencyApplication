package com.minet.userservice.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private int user_id;
    private String full_name;
    private String email;
    private float account_balance;
}
