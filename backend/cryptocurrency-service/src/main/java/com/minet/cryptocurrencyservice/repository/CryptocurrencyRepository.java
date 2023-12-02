package com.minet.cryptocurrencyservice.repository;

import com.minet.cryptocurrencyservice.entity.Cryptocurrency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CryptocurrencyRepository extends JpaRepository<Cryptocurrency, Integer> {

}
