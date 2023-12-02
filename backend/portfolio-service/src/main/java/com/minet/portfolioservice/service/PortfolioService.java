    package com.minet.portfolioservice.service;
    import com.minet.portfolioservice.dto.PortfolioDTO;

    import java.util.List;

    public interface PortfolioService {
        List<PortfolioDTO> getPortfoliosByUserId(int userId);

    }