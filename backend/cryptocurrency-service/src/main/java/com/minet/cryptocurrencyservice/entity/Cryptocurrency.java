package com.minet.cryptocurrencyservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Cryptocurrency")
public class Cryptocurrency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crypto_id")
    private int cryptoId;

    @Column(name="api_id")
    private String apiId;

    @Column(name = "crypto_name", length = 255)
    private String cryptoName;

    @Column(name = "crypto_label", length = 255)
    private String cryptoLabel;

    @Column(name = "market_Capital")
    private Double marketCapital;

    @Column(name = "circulating_Supply")
    private Double circulatingSupply;

    @Column(name = "current_price")
    private Double currentPrice;

    @Column(name = "unit_change")
    private String unitChange;

    @Column(name = "volume")
    private Double volume;

    @Column(name="src")
    private String src;


}



