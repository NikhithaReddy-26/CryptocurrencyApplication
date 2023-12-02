//package com.minet.cryptocurrencyservice.dto;
//
//import lombok.*;
//
//import java.util.List;
//import java.util.Map;
//
//@Data
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class CryptocurrencyDTO {
//
//
//    private String id;
//    private String symbol;
//    private String name;
//    private Double market_cap;
//    private Double circulating_supply;
//    private Double current_price;
//    private Double price_change_percentage_24h;
//    private Double total_volume;
////    private List<PriceDTO> prices;
//    private List<Map<String, Object>> prices;
//
//
//}

package com.minet.cryptocurrencyservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CryptocurrencyDTO {

    private String id;
    private String symbol;
    private String name;
    private String image;
    private Double market_cap;
    private Double circulating_supply;
    private Double current_price;
    private Double price_change_percentage_24h;
    private Double total_volume;
    private List<Object> prices;


}
