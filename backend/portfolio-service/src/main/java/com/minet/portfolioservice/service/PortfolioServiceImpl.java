    package com.minet.portfolioservice.service;

    import com.minet.portfolioservice.dto.CryptocurrencyDTO;
    import com.minet.portfolioservice.dto.PortfolioDTO;
    import com.minet.portfolioservice.dto.UserDTO;
    import com.minet.portfolioservice.entity.Portfolio;
    import com.minet.portfolioservice.exception.PortfolioNotFoundException;
    import com.minet.portfolioservice.repository.PortfolioRepository;
    import org.modelmapper.ModelMapper;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.core.ParameterizedTypeReference;
    import org.springframework.http.HttpMethod;
    import org.springframework.http.ResponseEntity;
    import org.springframework.stereotype.Service;
    import org.springframework.web.client.RestTemplate;
    import java.util.Collections;
    import java.util.List;


    @Service
    public class PortfolioServiceImpl implements PortfolioService {

        private PortfolioRepository portfolioRepository;
        private ModelMapper modelMapper;
        private RestTemplate restTemplate;


        @Autowired
        public PortfolioServiceImpl(PortfolioRepository portfolioRepository, RestTemplate restTemplate, ModelMapper modelMapper) {
            this.portfolioRepository = portfolioRepository;
            this.restTemplate = restTemplate;
            this.modelMapper = modelMapper;
        }


        @Override
        public List<PortfolioDTO> getPortfoliosByUserId(int userId) {
            List<Portfolio> portfolios = portfolioRepository.findAllByUserId(userId);
            if (portfolios.isEmpty()) {
                throw new PortfolioNotFoundException("Portfolios not found for user with ID: " + userId);
            }
            return portfolios.stream()
                    .map(this::convertToDTO)
                    .toList();
        }



        UserDTO getUserById(int userId) {
            ResponseEntity<UserDTO> response = restTemplate.exchange(
                    "http://USER-SERVICE/users/{userId}",
                    HttpMethod.GET,
                    null,
                    UserDTO.class,
                    userId
            );

            if (response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            } else {
                throw new PortfolioNotFoundException("User not found with ID: " + userId);
            }
        }

         List<CryptocurrencyDTO> getUserCryptocurrencies(int userId) {
            ResponseEntity<List<CryptocurrencyDTO>> response = restTemplate.exchange(
                    "http://CRYPTOCURRENCY-SERVICE/cryptocurrencies/?user_id={userId}",
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<CryptocurrencyDTO>>() {},
                    userId
            );

            if (response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            } else {
                return Collections.emptyList();
            }
        }


        private PortfolioDTO convertToDTO(Portfolio portfolio) {
            PortfolioDTO portfolioDTO = modelMapper.map(portfolio, PortfolioDTO.class);
            UserDTO userDTO = getUserById(portfolio.getUserId());
            portfolioDTO.setUser(userDTO);
            List<CryptocurrencyDTO> userCryptocurrencies = getUserCryptocurrencies(portfolio.getUserId());
            portfolioDTO.setCryptocurrencies(userCryptocurrencies);
            return portfolioDTO;
        }
    }
