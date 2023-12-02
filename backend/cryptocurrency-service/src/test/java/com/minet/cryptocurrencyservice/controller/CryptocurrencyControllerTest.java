package com.minet.cryptocurrencyservice.controller;

import com.minet.cryptocurrencyservice.controller.CryptocurrencyController;
import com.minet.cryptocurrencyservice.dto.DBResponseDTO;
import com.minet.cryptocurrencyservice.service.CoinGeckoAPIService;
import com.minet.cryptocurrencyservice.service.CryptocurrencyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class CryptocurrencyControllerTest {

    @Mock
    private CoinGeckoAPIService coinGeckoAPIService;

    @Mock
    private CryptocurrencyService cryptocurrencyService;

    private CryptocurrencyController cryptocurrencyController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        cryptocurrencyController = new CryptocurrencyController(coinGeckoAPIService, cryptocurrencyService);
    }

    @Test
    void testFindAll() {
        List<DBResponseDTO> cryptoList = new ArrayList<>();
        when(cryptocurrencyService.findAll()).thenReturn(cryptoList);

        List<DBResponseDTO> result = cryptocurrencyController.findAll();

        assertEquals(cryptoList, result);
    }

    @Test
    void testFindById() {
        int cryptoId = 1;
        DBResponseDTO crypto = new DBResponseDTO();
        when(cryptocurrencyService.findById(cryptoId)).thenReturn(crypto);

        DBResponseDTO result = cryptocurrencyController.findById(cryptoId);

        assertEquals(crypto, result);
    }

    @Test
    void testGetCryptocurrencyPriceHistory() {
        String coinId = "bitcoin";
        int days = 7;
        List<Object> priceHistory = new ArrayList<>();
        when(coinGeckoAPIService.fetchCryptocurrencyPrices(coinId, days)).thenReturn(priceHistory);

        List<Object> result = cryptocurrencyController.getCryptocurrencyPriceHistory(coinId, days);

        assertEquals(priceHistory, result);
    }

    @Test
    void testUpdateCryptocurrencySuccess() {
        int cryptoId = 1;
        DBResponseDTO existingData = new DBResponseDTO();
        when(cryptocurrencyService.findById(cryptoId)).thenReturn(existingData);

        DBResponseDTO updatedData = new DBResponseDTO();
        updatedData.setCryptoName("Updated Name");
        updatedData.setCryptoLabel("Updated Label");

        ResponseEntity<String> response = cryptocurrencyController.updateCryptocurrency(cryptoId, updatedData);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Cryptocurrency updated successfully", response.getBody());
        assertEquals(updatedData.getCryptoName(), existingData.getCryptoName());
        assertEquals(updatedData.getCryptoLabel(), existingData.getCryptoLabel());

        verify(cryptocurrencyService, times(1)).updateCryptocurrency(existingData);
    }

    @Test
    void testUpdateCryptocurrencyNotFound() {
        int cryptoId = 1;
        when(cryptocurrencyService.findById(cryptoId)).thenReturn(null);

        ResponseEntity<String> response = cryptocurrencyController.updateCryptocurrency(cryptoId, new DBResponseDTO());

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(null, response.getBody());

        verify(cryptocurrencyService, times(0)).updateCryptocurrency(any());
    }
}
