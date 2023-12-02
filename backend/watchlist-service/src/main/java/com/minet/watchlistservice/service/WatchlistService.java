package com.minet.watchlistservice.service;

import com.minet.watchlistservice.dto.WatchlistDTO;

import java.util.List;

public interface WatchlistService {

    List<WatchlistDTO> getWatchlistByUserId(int userId);

    WatchlistDTO addWatchlistEntry(WatchlistDTO watchlistDTO);

    void deleteWatchlistEntry(int userId, int cryptocurrencyId);
}

