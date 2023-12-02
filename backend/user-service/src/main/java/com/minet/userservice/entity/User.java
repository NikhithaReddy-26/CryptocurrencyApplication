package com.minet.userservice.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private int user_id;
    @Column(name="full_name")
    private String full_name;
    @Column(name="password")
    private String password;
    @Column(name="email")
    private String email;
    @Column(name="account_balance")
    private float account_balance;
}
