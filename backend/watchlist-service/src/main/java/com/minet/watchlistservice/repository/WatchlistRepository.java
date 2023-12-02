package com.minet.watchlistservice.repository;

import com.minet.watchlistservice.entity.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchlistRepository extends JpaRepository<Watchlist,Integer> {

    List<Watchlist> findAllByUserId(int userId);

    Watchlist findByUserIdAndCryptocurrencyId(int userId, int cryptocurrencyId);

}
