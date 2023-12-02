package com.minet.watchlistservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WatchlistDTO {

    private int watchlistId;
    private int userId;
    private int cryptocurrencyId;
}
