package com.minet.watchlistservice.controller;

import com.minet.watchlistservice.dto.WatchlistDTO;
import com.minet.watchlistservice.service.WatchlistServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class WatchlistControllerTest {

    private MockMvc mockMvc;

    @Mock
    private WatchlistServiceImpl watchlistService;

    @InjectMocks
    private WatchlistController watchlistController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(watchlistController).build();
    }

    @Test
    void testGetWatchlistByUserId() throws Exception {
        List<WatchlistDTO> watchlistDTOList = new ArrayList<>();
        int userId = 123;

        when(watchlistService.getWatchlistByUserId(userId)).thenReturn(watchlistDTOList);

        mockMvc.perform(get("/watchlist/user/{userId}", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(watchlistDTOList.size()));
    }


    @Test
    void testAddWatchlistEntry() throws Exception {
        WatchlistDTO watchlistDTO = new WatchlistDTO();
        watchlistDTO.setUserId(1);
        watchlistDTO.setCryptocurrencyId(2);

        when(watchlistService.addWatchlistEntry(watchlistDTO)).thenReturn(watchlistDTO);

        String requestBody = "{\"userId\": 1, \"cryptocurrencyId\": 2}";

        mockMvc.perform(post("/watchlist")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk());
    }

    @Test
    void testDeleteWatchlistEntry() throws Exception {
        int userId = 123;
        int cryptocurrencyId = 456;

        mockMvc.perform(delete("/watchlist/{userId}/{cryptocurrencyId}", userId, cryptocurrencyId))
                .andExpect(status().isOk())
                .andExpect(content().string("Watchlist entry deleted successfully"));
    }
}
