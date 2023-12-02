package com.minet.cryptocurrencyservice.controller;

import com.minet.cryptocurrencyservice.dto.DBResponseDTO;
import com.minet.cryptocurrencyservice.service.CoinGeckoAPIService;
import com.minet.cryptocurrencyservice.service.CryptocurrencyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/cryptocurrencies")
public class CryptocurrencyController {
    @Autowired
    private final CoinGeckoAPIService coinGeckoAPIService;

    @Autowired
    private final CryptocurrencyService cryptocurrencyService;

    public CryptocurrencyController(CoinGeckoAPIService coinGeckoAPIService, CryptocurrencyService cryptocurrencyService) {
        this.coinGeckoAPIService = coinGeckoAPIService;
        this.cryptocurrencyService = cryptocurrencyService;
    }

    @GetMapping("/")
    public List<DBResponseDTO> findAll() {
        log.info("Fetching all cryptocurrencies");
        return cryptocurrencyService.findAll();
    }

    @GetMapping("/{cryptoId}")
    public DBResponseDTO findById(@PathVariable int cryptoId) {
        log.info("Fetching cryptocurrency with cryptoId: {}", cryptoId);
        return cryptocurrencyService.findById(cryptoId);
    }

    @GetMapping("prices/{coinId}/{days}")
    public List<Object> getCryptocurrencyPriceHistory(@PathVariable String coinId, @PathVariable int days) {
        log.info("Fetching price history for cryptocurrency: {}, days: {}", coinId, days);
        return coinGeckoAPIService.fetchCryptocurrencyPrices(coinId, days);
    }
    @PatchMapping("/{cryptoId}")
    public ResponseEntity<String> updateCryptocurrency(@PathVariable int cryptoId, @RequestBody DBResponseDTO updatedData) {
        log.info("Updating cryptocurrency with cryptoId: {}", cryptoId);

        DBResponseDTO existingData = cryptocurrencyService.findById(cryptoId);

        if (existingData == null) {
            return ResponseEntity.notFound().build();
        }

        if (updatedData.getCryptoName() != null) {
            existingData.setCryptoName(updatedData.getCryptoName());
        }
        if (updatedData.getCryptoLabel() != null) {
            existingData.setCryptoLabel(updatedData.getCryptoLabel());
        }


        cryptocurrencyService.updateCryptocurrency(existingData);

        return ResponseEntity.ok("Cryptocurrency updated successfully");
    }





}
