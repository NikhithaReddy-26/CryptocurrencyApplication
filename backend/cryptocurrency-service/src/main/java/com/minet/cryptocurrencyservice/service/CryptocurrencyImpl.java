package com.minet.cryptocurrencyservice.service;

import com.minet.cryptocurrencyservice.dto.CryptocurrencyDTO;
import com.minet.cryptocurrencyservice.dto.DBResponseDTO;
import com.minet.cryptocurrencyservice.entity.Cryptocurrency;
import com.minet.cryptocurrencyservice.exception.CryptoNotFoundException;
import com.minet.cryptocurrencyservice.repository.CryptocurrencyRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CryptocurrencyImpl implements CryptocurrencyService {

    private final CryptocurrencyRepository cryptocurrencyRepository;
    private final ModelMapper modelMapper;

    private static final String CRYPTOCURRENCY_NOT_FOUND_MESSAGE = "Cryptocurrency with ID %d not found.";
    @Autowired
    public CryptocurrencyImpl(CryptocurrencyRepository cryptocurrencyRepository, ModelMapper modelMapper) {
        this.cryptocurrencyRepository = cryptocurrencyRepository;
        this.modelMapper = modelMapper;

    }

@Override
public List<DBResponseDTO> findAll() {
    List<Cryptocurrency> cryptocurrencies = cryptocurrencyRepository.findAll();
    return cryptocurrencies.stream()
            .map(this::entityToDBDto)
            .toList();
}

    @Override
    public DBResponseDTO findById(int cryptoID) {
        Cryptocurrency cryptocurrency = cryptocurrencyRepository.findById(cryptoID)
                .orElseThrow(() -> new NoSuchElementException(String.format(CRYPTOCURRENCY_NOT_FOUND_MESSAGE,cryptoID)));
        return entityToDBDto(cryptocurrency);
    }

    @Override
    public CryptocurrencyDTO save(CryptocurrencyDTO cryptocurrencyDTO) {
        Cryptocurrency cryptocurrency = dtoToEntity(cryptocurrencyDTO);
        Cryptocurrency savedCryptocurrency = cryptocurrencyRepository.save(cryptocurrency);
        return entityToDto(savedCryptocurrency);
    }

    @Override
    public CryptocurrencyDTO update(int cryptoID, CryptocurrencyDTO cryptocurrencyDTO) {
        Cryptocurrency existingCryptocurrency = cryptocurrencyRepository.findById(cryptoID)
                .orElseThrow(() -> new NoSuchElementException(String.format(CRYPTOCURRENCY_NOT_FOUND_MESSAGE,cryptoID)));

        modelMapper.map(cryptocurrencyDTO, existingCryptocurrency);

        Cryptocurrency updatedCryptocurrency = cryptocurrencyRepository.save(existingCryptocurrency);
        return entityToDto(updatedCryptocurrency);
    }

    @Override
    public void deleteById(int cryptoID) {
        if (!cryptocurrencyRepository.existsById(cryptoID)) {
            throw new NoSuchElementException(String.format(CRYPTOCURRENCY_NOT_FOUND_MESSAGE,cryptoID));
        }
        cryptocurrencyRepository.deleteById(cryptoID);
    }

    private Cryptocurrency dtoToEntity(CryptocurrencyDTO cryptocurrencyDTO) {
        return modelMapper.map(cryptocurrencyDTO, Cryptocurrency.class);
    }

    private CryptocurrencyDTO entityToDto(Cryptocurrency cryptocurrency) {
        return modelMapper.map(cryptocurrency, CryptocurrencyDTO.class);
    }



    private DBResponseDTO entityToDBDto(Cryptocurrency cryptocurrency) {
        return modelMapper.map(cryptocurrency, DBResponseDTO.class);
    }


        @Override
        public void updateCryptocurrency(DBResponseDTO updatedData) {

            int cryptoId = updatedData.getCryptoId();

            Optional<Cryptocurrency> cryptocurrencyOptional = cryptocurrencyRepository.findById(cryptoId);

            if (cryptocurrencyOptional.isPresent()) {
                Cryptocurrency existingCryptocurrency = cryptocurrencyOptional.get();

                if (updatedData.getCryptoName() != null) {
                    existingCryptocurrency.setCryptoName(updatedData.getCryptoName());
                }
                else{
throw new CryptoNotFoundException("CryptoName not found");
                }
                if (updatedData.getCryptoLabel() != null) {
                    existingCryptocurrency.setCryptoLabel(updatedData.getCryptoLabel());
                }
                else{
                    throw new CryptoNotFoundException("CryptoLabel not found");
                }


                cryptocurrencyRepository.save(existingCryptocurrency);
            }
        }

    }



