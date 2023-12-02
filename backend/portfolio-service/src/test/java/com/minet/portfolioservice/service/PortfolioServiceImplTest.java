package com.minet.portfolioservice.service;

import com.minet.portfolioservice.dto.CryptocurrencyDTO;
import com.minet.portfolioservice.dto.PortfolioDTO;
import com.minet.portfolioservice.dto.UserDTO;
import com.minet.portfolioservice.entity.Portfolio;
import com.minet.portfolioservice.exception.PortfolioNotFoundException;
import com.minet.portfolioservice.repository.PortfolioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class PortfolioServiceImplTest {

    @Mock
    private PortfolioRepository portfolioRepository;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private PortfolioServiceImpl portfolioService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    private UserDTO createUserDTO(int userId, float accountBalance) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUser_id(userId);
        userDTO.setAccount_balance(accountBalance);
        return userDTO;
    }

    private CryptocurrencyDTO createCryptocurrencyDTO(int cryptoId, String cryptoName,
                                                      String cryptoLabel,
                                                      float currentPrice, float unitChange) {
        CryptocurrencyDTO cryptocurrencyDTO = new CryptocurrencyDTO();
        cryptocurrencyDTO.setCryptoId(cryptoId);
        cryptocurrencyDTO.setCryptoName(cryptoName);
        cryptocurrencyDTO.setCryptoLabel(cryptoLabel);
        cryptocurrencyDTO.setCurrentPrice(currentPrice);
        cryptocurrencyDTO.setUnitChange(unitChange);
        return cryptocurrencyDTO;
    }

    @Test
    void getPortfoliosByUserId_ExistingUserId_ReturnsListOfPortfolioDTOs() {
        int userId = 1;

        List<Portfolio> portfolios = new ArrayList<>();
        Portfolio portfolio = new Portfolio();
        portfolio.setPortfolioId(1);
        portfolio.setDate(LocalDate.parse("2023-07-27"));
        portfolio.setAmount(0.0f);
        portfolio.setUserId(userId);
        portfolios.add(portfolio);

        UserDTO userDTO = createUserDTO(userId, 34000.0f);

        List<CryptocurrencyDTO> cryptocurrencies = new ArrayList<>();
        cryptocurrencies.add(createCryptocurrencyDTO(1, "Bitcoin", "BTC",  1270f, 1.06f));
        cryptocurrencies.add(createCryptocurrencyDTO(2, "Ethereum", "ETH", 1270f, 5.49f));

        PortfolioDTO expectedPortfolioDTO = new PortfolioDTO();
        expectedPortfolioDTO.setPortfolioId(1);
        expectedPortfolioDTO.setDate(LocalDate.parse("2023-07-27"));
        expectedPortfolioDTO.setAmount(0.0f);
        expectedPortfolioDTO.setUser(userDTO);
        expectedPortfolioDTO.setCryptocurrencies(cryptocurrencies);

        when(portfolioRepository.findAllByUserId(userId)).thenReturn(portfolios);
        when(restTemplate.exchange(
                anyString(),
                eq(HttpMethod.GET),
                eq(null),
                eq(UserDTO.class),
                eq(userId)
        )).thenReturn(ResponseEntity.ok(userDTO));
        when(restTemplate.exchange(
                anyString(),
                eq(HttpMethod.GET),
                eq(null),
                eq(new ParameterizedTypeReference<List<CryptocurrencyDTO>>() {
                }),
                eq(userId)
        )).thenReturn(ResponseEntity.ok(cryptocurrencies));
        when(modelMapper.map(any(Portfolio.class), eq(PortfolioDTO.class)))
                .thenReturn(expectedPortfolioDTO);

        List<PortfolioDTO> portfolioDTOList = portfolioService.getPortfoliosByUserId(userId);
        assertNotNull(portfolioDTOList);
        assertEquals(1, portfolioDTOList.size());
        assertEquals(expectedPortfolioDTO, portfolioDTOList.get(0));
        verify(portfolioRepository, times(1)).findAllByUserId(userId);
        verify(restTemplate, times(1)).exchange(
                anyString(),
                eq(HttpMethod.GET),
                eq(null),
                eq(UserDTO.class),
                eq(userId)
        );
    }

    @Test
    void getPortfoliosByUserId_NonExistingUserId_ThrowsPortfolioNotFoundException() {
        int userId = 456;
        when(portfolioRepository.findAllByUserId(userId)).thenReturn(Collections.emptyList());
        assertThrows(PortfolioNotFoundException.class, () -> portfolioService.getPortfoliosByUserId(userId));
        verify(portfolioRepository, times(1)).findAllByUserId(userId);
    }

    @Test
    void getUserCryptocurrencies_SuccessfulResponse_ReturnsCryptocurrencyDTOList() {
        int userId = 1;
        List<CryptocurrencyDTO> cryptocurrencies = Arrays.asList(
                createCryptocurrencyDTO(1, "Bitcoin", "BTC",  1270f, 1.06f),
                createCryptocurrencyDTO(2, "Ethereum", "ETH", 1270f, 5.49f)
        );
        ResponseEntity<List<CryptocurrencyDTO>> responseEntity = new ResponseEntity<>(cryptocurrencies, HttpStatus.OK);
        when(restTemplate.exchange(
                anyString(),
                eq(HttpMethod.GET),
                eq(null),
                eq(new ParameterizedTypeReference<List<CryptocurrencyDTO>>() {
                }),
                eq(userId)
        )).thenReturn(responseEntity);

        List<CryptocurrencyDTO> result = portfolioService.getUserCryptocurrencies(userId);

        assertNotNull(result);
        assertEquals(cryptocurrencies, result);
        verify(restTemplate, times(1)).exchange(
                anyString(),
                eq(HttpMethod.GET),
                eq(null),
                eq(new ParameterizedTypeReference<List<CryptocurrencyDTO>>() {
                }),
                eq(userId)
        );
    }

    @Test
    void getUserCryptocurrencies_UnsuccessfulResponse_ReturnsEmptyList() {
        int userId = 1;

        ResponseEntity<List<CryptocurrencyDTO>> responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        when(restTemplate.exchange(
                anyString(),
                eq(HttpMethod.GET),
                eq(null),
                eq(new ParameterizedTypeReference<List<CryptocurrencyDTO>>() {
                }),
                eq(userId)
        )).thenReturn(responseEntity);

        List<CryptocurrencyDTO> result = portfolioService.getUserCryptocurrencies(userId);
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(restTemplate, times(1)).exchange(
                anyString(),
                eq(HttpMethod.GET),
                eq(null),
                eq(new ParameterizedTypeReference<List<CryptocurrencyDTO>>() {
                }),
                eq(userId)
        );
    }

    @Test
    void getUserById_UserNotFound_ThrowsPortfolioNotFoundException() {

        int userId = 1;
        ResponseEntity<UserDTO> responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        when(restTemplate.exchange(
                anyString(),
                eq(HttpMethod.GET),
                eq(null),
                eq(UserDTO.class),
                eq(userId)
        )).thenReturn(responseEntity);
        assertThrows(PortfolioNotFoundException.class, () -> portfolioService.getUserById(userId));
        verify(restTemplate, times(1)).exchange(
                anyString(),
                eq(HttpMethod.GET),
                eq(null),
                eq(UserDTO.class),
                eq(userId)
        );
    }

}