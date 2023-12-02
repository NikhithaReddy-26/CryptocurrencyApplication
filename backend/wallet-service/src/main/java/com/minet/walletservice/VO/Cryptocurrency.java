package com.minet.walletservice.VO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cryptocurrency {

    private int cryptoId;
    private String cryptoName;
    private String cryptoLabel;
    private Float marketCapital;
    private Float circulatingSupply;
    private Float currentPrice;
    private String unitChange;
    private Double volume;

}
