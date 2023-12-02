    package com.minet.portfolioservice.dto;

    import lombok.*;

    import java.time.LocalDate;
    import java.util.List;


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class PortfolioDTO {
        private int portfolioId;
        private LocalDate date;
        private float amount;
        private UserDTO user;
        private List<CryptocurrencyDTO> cryptocurrencies;

}
