package com.minet.watchlistservice.service;

import com.minet.watchlistservice.dto.WatchlistDTO;
import com.minet.watchlistservice.entity.Watchlist;
import com.minet.watchlistservice.exception.WatchlistException;
import com.minet.watchlistservice.repository.WatchlistRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class WatchlistServiceImplTest {

    @Mock
    private WatchlistRepository watchlistRepository;

    @InjectMocks
    private WatchlistServiceImpl watchlistService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    void testGetWatchlistByUserId_Empty() {
        int userId = 123;

        when(watchlistRepository.findAllByUserId(userId)).thenReturn(new ArrayList<>());

        assertThrows(WatchlistException.class, () -> watchlistService.getWatchlistByUserId(userId));
    }

    @Test
    void testAddWatchlistEntry() {
        WatchlistDTO watchlistDTO = new WatchlistDTO();
        watchlistDTO.setUserId(123);
        watchlistDTO.setCryptocurrencyId(456);

        Watchlist newWatchlist = new Watchlist();
        newWatchlist.setUserId(watchlistDTO.getUserId());
        newWatchlist.setCryptocurrencyId(watchlistDTO.getCryptocurrencyId());

        when(watchlistRepository.save(any(Watchlist.class))).thenReturn(newWatchlist);

        WatchlistDTO result = watchlistService.addWatchlistEntry(watchlistDTO);

        assertNotNull(result);
        assertEquals(newWatchlist.getUserId(), result.getUserId());
        assertEquals(newWatchlist.getCryptocurrencyId(), result.getCryptocurrencyId());

        verify(watchlistRepository).save(any(Watchlist.class));
    }

    @Test
    void testDeleteWatchlistEntry_Success() {
        int userId = 123;
        int cryptocurrencyId = 456;

        Watchlist watchlist = new Watchlist();

        when(watchlistRepository.findByUserIdAndCryptocurrencyId(userId, cryptocurrencyId)).thenReturn(watchlist);

        assertDoesNotThrow(() -> watchlistService.deleteWatchlistEntry(userId, cryptocurrencyId));
    }

    @Test
    void testGetWatchlistByUserId_NotEmpty() {
        int userId = 1;
        Watchlist watchlist1 = new Watchlist();

        Watchlist watchlist2 = new Watchlist();

        List<Watchlist> mockWatchlistItems = new ArrayList<>();
        mockWatchlistItems.add(watchlist1);
        mockWatchlistItems.add(watchlist2);

        when(watchlistRepository.findAllByUserId(userId)).thenReturn(mockWatchlistItems);

        List<WatchlistDTO> result = watchlistService.getWatchlistByUserId(userId);

        assertNotNull(result);
        assertEquals(2, result.size());

        verify(watchlistRepository).findAllByUserId(userId);
    }

    @Test
    void testDeleteWatchlistEntry_NotFound() {
        int userId = 123;
        int cryptocurrencyId = 456;

        when(watchlistRepository.findByUserIdAndCryptocurrencyId(userId, cryptocurrencyId)).thenReturn(null);

        assertThrows(WatchlistException.class, () -> watchlistService.deleteWatchlistEntry(userId, cryptocurrencyId));
    }
}
