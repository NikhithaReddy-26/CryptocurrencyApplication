package com.minet.portfolioservice.controller;

import com.minet.portfolioservice.dto.PortfolioDTO;
import com.minet.portfolioservice.exception.PortfolioNotFoundException;
import com.minet.portfolioservice.service.PortfolioService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Arrays;
import java.util.List;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PortfolioControllerTest {

    @Mock
    private PortfolioService portfolioService;

    @InjectMocks
    private PortfolioController portfolioController;

    @Test
    void getPortfolioByUserId_ExistingUserId_ReturnsPortfolioDTOList() {
        int userId = 123;
        List<PortfolioDTO> expectedPortfolios = Arrays.asList(
                new PortfolioDTO(),
                new PortfolioDTO()
        );
        when(portfolioService.getPortfoliosByUserId(userId)).thenReturn(expectedPortfolios);
        ResponseEntity<Object> responseEntity = portfolioController.getPortfolioByUserId(userId);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedPortfolios, responseEntity.getBody());
        verify(portfolioService, times(1)).getPortfoliosByUserId(userId);
    }

    @Test
    void getPortfolioByUserId_NonExistingUserId_ReturnsNotFoundResponse() {
        int userId = 456;
        when(portfolioService.getPortfoliosByUserId(userId)).thenThrow(new PortfolioNotFoundException("Portfolios not found for user with ID: " + userId));
        ResponseEntity<Object> responseEntity = portfolioController.getPortfolioByUserId(userId);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals("Portfolios not found for user with ID: " + userId, responseEntity.getBody());
        verify(portfolioService, times(1)).getPortfoliosByUserId(userId);
    }

}
