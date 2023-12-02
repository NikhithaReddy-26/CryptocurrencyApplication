package com.minet.portfolioservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CryptocurrencyDTO {
    private int cryptoId;
    private String cryptoName;
    private String cryptoLabel;
    private Float currentPrice;
    private Float unitChange;
}
