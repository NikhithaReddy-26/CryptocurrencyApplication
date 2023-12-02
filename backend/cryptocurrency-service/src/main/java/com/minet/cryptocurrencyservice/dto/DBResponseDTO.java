package com.minet.cryptocurrencyservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DBResponseDTO {

    private int cryptoId;


    private String apiId;


    private String cryptoName;


    private String cryptoLabel;


    private Double marketCapital;

    private Double circulatingSupply;


    private Double currentPrice;

    private String unitChange;

    private Double volume;

    private String src;


}
