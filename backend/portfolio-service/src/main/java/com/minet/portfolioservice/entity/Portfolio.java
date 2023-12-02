    package com.minet.portfolioservice.entity;

    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;
    import java.time.LocalDate;



    @Entity
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Table(name = "portfolio")
    public class Portfolio {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "portfolio_id")
        private int portfolioId;

        @Column(name = "date")
        private LocalDate date;

        @Column(name = "amount")
        private float amount;

        @Column(name = "crypto_id")
        private int crypto_id;


       @Column(name="user_id")
        private int userId;

    }
