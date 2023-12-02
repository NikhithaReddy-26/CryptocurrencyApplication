        package com.minet.portfolioservice.controller;

        import com.minet.portfolioservice.dto.PortfolioDTO;
        import com.minet.portfolioservice.exception.PortfolioNotFoundException;
        import com.minet.portfolioservice.service.PortfolioService;
        import lombok.extern.slf4j.Slf4j;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;
        import java.util.List;


        @Slf4j
        @RestController
        @RequestMapping("/portfolios")
        public class PortfolioController {

            private PortfolioService portfolioService;

            @Autowired
            public PortfolioController(PortfolioService portfolioService) {

                this.portfolioService = portfolioService;
            }


            @GetMapping("/users/{userId}")
            public ResponseEntity<Object> getPortfolioByUserId(@PathVariable int userId) {
                log.info("Fetching portfolio for user with ID: {}", userId);
                try {
                    List<PortfolioDTO> portfolioDTOList = portfolioService.getPortfoliosByUserId(userId);
                    log.info("Portfolios found for user with ID: {}", userId);
                    return ResponseEntity.ok(portfolioDTOList);
                } catch (PortfolioNotFoundException e) {
                    log.warn("Portfolios not found for user with ID: {}", userId);
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
                }
            }

            }

