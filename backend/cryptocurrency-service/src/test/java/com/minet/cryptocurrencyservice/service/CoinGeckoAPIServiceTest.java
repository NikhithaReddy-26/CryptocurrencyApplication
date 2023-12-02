package com.minet.cryptocurrencyservice.service;

import com.minet.cryptocurrencyservice.dto.CryptocurrencyDTO;
import com.minet.cryptocurrencyservice.entity.Cryptocurrency;
import com.minet.cryptocurrencyservice.repository.CryptocurrencyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class CoinGeckoAPIServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private CryptocurrencyRepository cryptocurrencyRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private CoinGeckoAPIService coinGeckoAPIService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }



    @Test
    void testFetchCryptocurrencyPrices() {
        String coinId = "bitcoin";
        int days = 7;

        Map<String, List<List<Object>>> responseData = new HashMap<>();
        List<List<Object>> pricesData = new ArrayList<>();
        pricesData.add(Arrays.asList(1677705600000L, 40000.0));
        pricesData.add(Arrays.asList(1677792000000L, 42000.0));
        responseData.put("prices", pricesData);

        ResponseEntity<Map> responseEntity = ResponseEntity.ok(responseData);
        when(restTemplate.getForEntity(anyString(), eq(Map.class)))
                .thenReturn(responseEntity);

        List<Object> result = coinGeckoAPIService.fetchCryptocurrencyPrices(coinId, days);

        assertEquals(pricesData.size(), result.size());
    }

    @Test
    void testFetchCryptocurrency() {
        String coinId = "bitcoin";

        CryptocurrencyDTO cryptocurrencyDTO = new CryptocurrencyDTO();
        cryptocurrencyDTO.setName("Bitcoin");
        cryptocurrencyDTO.setSymbol("BTC");

        ResponseEntity<CryptocurrencyDTO> responseEntity = ResponseEntity.ok(cryptocurrencyDTO);
        when(restTemplate.getForEntity(anyString(), eq(CryptocurrencyDTO.class)))
                .thenReturn(responseEntity);

        CryptocurrencyDTO result = coinGeckoAPIService.fetchCryptocurrency(coinId);

        assertEquals(cryptocurrencyDTO.getName(), result.getName());
        assertEquals(cryptocurrencyDTO.getSymbol(), result.getSymbol());
    }

    @Test
    void testFetchPriceData() {
        int days = 7;

        Object[] responseArray = new Object[1];
        responseArray[0] = new Object();

        ResponseEntity<Object[]> responseEntity = ResponseEntity.ok(responseArray);
        when(restTemplate.getForEntity(anyString(), eq(Object[].class)))
                .thenReturn(responseEntity);

        List<Object> result = coinGeckoAPIService.fetchPriceData();

        assertEquals(responseArray.length, result.size());
    }



    @Test
    void testConvertToEntity() {
        CryptocurrencyDTO cryptocurrencyDTO = new CryptocurrencyDTO();
        cryptocurrencyDTO.setName("Bitcoin");
        cryptocurrencyDTO.setSymbol("BTC");

        Cryptocurrency result = coinGeckoAPIService.convertToEntity(cryptocurrencyDTO);

        assertEquals(cryptocurrencyDTO.getName(), result.getCryptoName());
        assertEquals(cryptocurrencyDTO.getSymbol(), result.getCryptoLabel());
    }

    @Test
    void testFetchAndSaveCryptocurrenciesForCoin_CryptocurrencyFound() {
        String coinId = "bitcoin";
        int days = 7;

        CryptocurrencyDTO cryptocurrencyDTO = new CryptocurrencyDTO();
        cryptocurrencyDTO.setName("Bitcoin");
        cryptocurrencyDTO.setSymbol("BTC");

        ResponseEntity<CryptocurrencyDTO> responseEntity = ResponseEntity.ok(cryptocurrencyDTO);
        when(restTemplate.getForEntity(anyString(), eq(CryptocurrencyDTO.class)))
                .thenReturn(responseEntity);

        List<Object> priceHistory = new ArrayList<>();
        priceHistory.add(Arrays.asList("2023-08-01", 40000.0));
        priceHistory.add(Arrays.asList("2023-08-02", 42000.0));

        when(coinGeckoAPIService.fetchCryptocurrencyPrices((coinId), (days)))
                .thenReturn(priceHistory);


        Cryptocurrency cryptocurrency = new Cryptocurrency();
        when(coinGeckoAPIService.convertToEntity((cryptocurrencyDTO))).thenReturn(cryptocurrency);
        when(cryptocurrencyRepository.save((cryptocurrency))).thenReturn(cryptocurrency);

        List<Cryptocurrency> result = coinGeckoAPIService.fetchAndSaveCryptocurrenciesForCoin(coinId, days);

        assertEquals(1, result.size());
        assertEquals(cryptocurrency, result.get(0));
    }

    @Test
    void testFetchAndSaveCryptocurrenciesForCoin_CryptocurrencyNotFound() {
        String coinId = "nonexistentcoin";
        int days = 7;

        ResponseEntity<CryptocurrencyDTO> responseEntity = ResponseEntity.notFound().build();
        when(restTemplate.getForEntity(anyString(), eq(CryptocurrencyDTO.class)))
                .thenReturn(responseEntity);

        List<Cryptocurrency> result = coinGeckoAPIService.fetchAndSaveCryptocurrenciesForCoin(coinId, days);

        assertEquals(0, result.size());
    }



}
