package com.minet.walletservice.entity;

import com.minet.walletservice.walletenum.TransactionType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private int transactionId;

    @Column(name = "wallet_id")
    private int walletId;
    @Column(name ="transaction_price")
    private Double transactionPrice;
    @Column(name="crypto_price")
    private Double cryptoPrice;
    @Column(name="date")
    private Date date;
    @Column(name="from_user")
    private String fromUser;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type")
    private TransactionType transactionType;
}
