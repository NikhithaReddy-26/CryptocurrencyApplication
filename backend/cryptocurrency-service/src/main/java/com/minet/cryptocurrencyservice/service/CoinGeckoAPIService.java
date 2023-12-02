package com.minet.cryptocurrencyservice.service;

import com.minet.cryptocurrencyservice.dto.CryptocurrencyDTO;
import com.minet.cryptocurrencyservice.entity.Cryptocurrency;
import com.minet.cryptocurrencyservice.repository.CryptocurrencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CoinGeckoAPIService {

    private static final String COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

    private final RestTemplate restTemplate;

    private  CryptocurrencyRepository cryptocurrencyRepository;

    @Autowired
    public CoinGeckoAPIService(RestTemplate restTemplate, CryptocurrencyRepository cryptocurrencyRepository) {
        this.restTemplate = restTemplate;
        this.cryptocurrencyRepository = cryptocurrencyRepository;

}

    Cryptocurrency convertToEntity(CryptocurrencyDTO dto) {
        Cryptocurrency entity = new Cryptocurrency();
        entity.setCryptoName(dto.getName());
        entity.setCryptoLabel(dto.getSymbol());

        return entity;
    }


    public List<Cryptocurrency> fetchAndSaveCryptocurrenciesForCoin(String coinId, int days) {
        CryptocurrencyDTO cryptocurrency = fetchCryptocurrency(coinId);
        if (cryptocurrency == null) {

            return new ArrayList<>();
        }

        List<Object> priceHistory = fetchCryptocurrencyPrices(coinId, days);
        cryptocurrency.setPrices(priceHistory);

        Cryptocurrency entity = convertToEntity(cryptocurrency);
        Cryptocurrency savedCryptocurrency = cryptocurrencyRepository.save(entity);

        return Collections.singletonList(savedCryptocurrency);
    }

    CryptocurrencyDTO fetchCryptocurrency(String coinId) {
        String apiUrl = COINGECKO_API_URL + "/coins/" + coinId;

        ResponseEntity<CryptocurrencyDTO> response = restTemplate.getForEntity(apiUrl, CryptocurrencyDTO.class);
        return response.getBody();
    }

    public List<Object> fetchPriceData() {
        String apiUrl = COINGECKO_API_URL + "/coins/markets";

        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParam("vs_currency", "usd")
                .queryParam("order", "market_cap_desc")
                .queryParam("per_page", 10)
                .queryParam("page", 1)
                .queryParam("sparkline", false);

        ResponseEntity<Object[]> response = restTemplate.getForEntity(builder.toUriString(), Object[].class);
        return Arrays.asList(response.getBody());
    }

    public List<Object> fetchCryptocurrencyPrices(String coinId, int days) {
        String apiUrl = COINGECKO_API_URL + "/coins/" + coinId + "/market_chart";

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, -days);
        long from = calendar.getTimeInMillis() / 1000;
        long to = System.currentTimeMillis() / 1000;

        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParam("vs_currency", "usd")
                .queryParam("days", days)
                .queryParam("interval", "daily")
                .queryParam("from", from)
                .queryParam("to", to);

        ResponseEntity<Map> response = restTemplate.getForEntity(builder.toUriString(), Map.class);
        Map<String, List<List<Object>>> responseData = response.getBody();
        List<List<Object>> pricesData = responseData.get("prices");

        List<Object> priceHistory = new ArrayList<>();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        for (List<Object> priceData : pricesData) {
            List<Object> formattedPriceData = new ArrayList<>();
            long timestamp = ((Number) priceData.get(0)).longValue();
            double price = ((Number) priceData.get(1)).doubleValue();
            String formattedDate = dateFormat.format(new Date(timestamp));
            formattedPriceData.add(formattedDate);
            formattedPriceData.add(price);
            priceHistory.add(formattedPriceData);
        }

        return priceHistory;
    }


}
