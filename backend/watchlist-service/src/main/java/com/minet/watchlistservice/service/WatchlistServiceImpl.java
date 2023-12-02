package com.minet.watchlistservice.service;

import com.minet.watchlistservice.dto.WatchlistDTO;
import com.minet.watchlistservice.entity.Watchlist;
import com.minet.watchlistservice.exception.WatchlistException;
import com.minet.watchlistservice.repository.WatchlistRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class WatchlistServiceImpl {

    @Autowired
    private final WatchlistRepository watchlistRepository;

    public WatchlistServiceImpl(WatchlistRepository watchlistRepository) {
        this.watchlistRepository = watchlistRepository;
    }


    public List<WatchlistDTO> getWatchlistByUserId(int userId) {
        log.info("Fetching watchlist for user ID: {}", userId);
        List<Watchlist> watchlistItems = watchlistRepository.findAllByUserId(userId);

        if (watchlistItems.isEmpty()) {
            throw new WatchlistException("No watchlist items found for user ID: " + userId);
        }

        List<WatchlistDTO> watchlistDTOList = new ArrayList<>();

        for (Watchlist watchlist : watchlistItems) {
            watchlistDTOList.add(convertToDTO(watchlist));
        }

        return watchlistDTOList;
    }

    public WatchlistDTO addWatchlistEntry(WatchlistDTO watchlistDTO) {
        log.info("Adding watchlist entry: {}", watchlistDTO);
        Watchlist newWatchlist = new Watchlist();
        newWatchlist.setUserId(watchlistDTO.getUserId());
        newWatchlist.setCryptocurrencyId(watchlistDTO.getCryptocurrencyId());
        Watchlist savedWatchlist = watchlistRepository.save(newWatchlist);

        return convertToDTO(savedWatchlist);
    }

    public void deleteWatchlistEntry(int userId, int cryptocurrencyId) {
        log.info("Deleting watchlist entry for user ID: {}, crypto ID: {}", userId, cryptocurrencyId);
        Watchlist watchlist = watchlistRepository.findByUserIdAndCryptocurrencyId(userId, cryptocurrencyId);
        if (watchlist != null) {
            watchlistRepository.delete(watchlist);
        } else {
            throw new WatchlistException("Watchlist entry not found");
        }
    }

    private WatchlistDTO convertToDTO(Watchlist watchlist) {
        return new WatchlistDTO(watchlist.getWatchlistId(), watchlist.getUserId(), watchlist.getCryptocurrencyId());
    }

}
