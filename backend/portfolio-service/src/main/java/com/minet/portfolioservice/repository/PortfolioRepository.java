    package com.minet.portfolioservice.repository;
    import com.minet.portfolioservice.entity.Portfolio;
    import org.springframework.data.jpa.repository.JpaRepository;

    import java.util.List;


    public interface PortfolioRepository extends JpaRepository<Portfolio, Integer> {
        List<Portfolio> findAllByUserId(int userId);
    }

