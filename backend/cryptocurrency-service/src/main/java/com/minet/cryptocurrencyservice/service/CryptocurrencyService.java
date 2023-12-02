package com.minet.cryptocurrencyservice.service;

import com.minet.cryptocurrencyservice.dto.CryptocurrencyDTO;
import com.minet.cryptocurrencyservice.dto.DBResponseDTO;

import java.util.List;

public interface CryptocurrencyService {
    List<DBResponseDTO> findAll();

    DBResponseDTO findById(int cryptoID);

    CryptocurrencyDTO save(CryptocurrencyDTO cryptocurrencyDTO);

    CryptocurrencyDTO update(int cryptoID, CryptocurrencyDTO cryptocurrencyDTO);
    void deleteById(int cryptoID);

    void updateCryptocurrency(DBResponseDTO updatedData);
}
