package com.minet.walletservice.VO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int user_id;
    private String full_name;
    private String password;
    private String email;
    private float account_balance;
}
