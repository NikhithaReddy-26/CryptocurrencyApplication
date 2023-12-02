package com.minet.watchlistservice.controller;

import com.minet.watchlistservice.dto.WatchlistDTO;
import com.minet.watchlistservice.service.WatchlistServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/watchlist")
@Slf4j
public class WatchlistController {

    private final WatchlistServiceImpl watchlistService;


    @Autowired
    public WatchlistController(WatchlistServiceImpl watchlistService) {
        this.watchlistService = watchlistService;
    }

    @GetMapping("/user/{userId}")
    public List<WatchlistDTO> getWatchlistByUserId(@PathVariable("userId") int userId) {
        log.info("Fetching watchlist for user ID: {}", userId);
        return watchlistService.getWatchlistByUserId(userId);
    }

    @PostMapping
    public WatchlistDTO addWatchlistEntry(@RequestBody WatchlistDTO watchlistDTO) {
        log.info("Adding watchlist entry: {}", watchlistDTO);
        return watchlistService.addWatchlistEntry(watchlistDTO);
    }

    @DeleteMapping("/{userId}/{cryptocurrencyId}")
    public String deleteWatchlistEntry(@PathVariable("userId") int userId, @PathVariable("cryptocurrencyId") int cryptocurrencyId) {
        log.info("Deleting watchlist entry for user ID: {}, crypto ID: {}", userId, cryptocurrencyId);
        watchlistService.deleteWatchlistEntry(userId, cryptocurrencyId);
        return "Watchlist entry deleted successfully";
    }

}
