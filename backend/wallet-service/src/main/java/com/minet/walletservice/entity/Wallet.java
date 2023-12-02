package com.minet.walletservice.entity;



import com.minet.walletservice.VO.Cryptocurrency;
import com.minet.walletservice.VO.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "wallet")
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wallet_id")
    private int walletId;

    @Column(name = "total_balance")
    private Double totalBalance;

@Column(name = "user_id")
private int userId;

    @Column(name = "crypto_id")
    private int cryptoId;

}
