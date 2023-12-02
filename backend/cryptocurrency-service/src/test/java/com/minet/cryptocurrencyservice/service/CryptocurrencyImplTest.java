package com.minet.cryptocurrencyservice.service;

import com.minet.cryptocurrencyservice.dto.CryptocurrencyDTO;
import com.minet.cryptocurrencyservice.dto.DBResponseDTO;
import com.minet.cryptocurrencyservice.entity.Cryptocurrency;
import com.minet.cryptocurrencyservice.repository.CryptocurrencyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CryptocurrencyImplTest {

    private CryptocurrencyRepository cryptocurrencyRepository;
    private ModelMapper modelMapper;
    private CryptocurrencyImpl cryptocurrencyService;


    @BeforeEach
    void setUp() {
        cryptocurrencyRepository = mock(CryptocurrencyRepository.class);
        modelMapper = new ModelMapper();
        cryptocurrencyService = new CryptocurrencyImpl(cryptocurrencyRepository, modelMapper);
    }

    @Test
    void testFindAll() {
        Cryptocurrency cryptocurrency1 = new Cryptocurrency();
        cryptocurrency1.setCryptoName("Bitcoin");
        Cryptocurrency cryptocurrency2 = new Cryptocurrency();
        cryptocurrency2.setCryptoName("Ethereum");

        when(cryptocurrencyRepository.findAll()).thenReturn(List.of(cryptocurrency1, cryptocurrency2));

        List<DBResponseDTO> result = cryptocurrencyService.findAll();

        assertEquals(2, result.size());
        assertEquals("Bitcoin", result.get(0).getCryptoName());
        assertEquals("Ethereum", result.get(1).getCryptoName());
    }

    @Test
    void testFindByIdExisting() {
        int cryptoId = 1;
        Cryptocurrency cryptocurrency = new Cryptocurrency();
        cryptocurrency.setCryptoId(cryptoId);
        when(cryptocurrencyRepository.findById(cryptoId)).thenReturn(Optional.of(cryptocurrency));

        DBResponseDTO result = cryptocurrencyService.findById(cryptoId);

        assertEquals(cryptoId, result.getCryptoId());
    }

    @Test
    void testFindByIdNonExisting() {
        int cryptoId = 1;
        when(cryptocurrencyRepository.findById(cryptoId)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> cryptocurrencyService.findById(cryptoId));
    }

    @Test
    void testSave() {
        CryptocurrencyDTO dto = new CryptocurrencyDTO();
        dto.setName(null);

        Cryptocurrency savedCryptocurrency = new Cryptocurrency();
        savedCryptocurrency.setCryptoId(1);
        when(cryptocurrencyRepository.save(any())).thenReturn(savedCryptocurrency);

        CryptocurrencyDTO result = cryptocurrencyService.save(dto);

        assertNotNull(result);
        assertEquals(null, result.getName());
        assertEquals(null, result.getId());
    }

    @Test
    void testUpdateExisting() {
        int cryptoId = 1;
        CryptocurrencyDTO updatedDto = new CryptocurrencyDTO();
        updatedDto.setName(null);

        Cryptocurrency existingCryptocurrency = new Cryptocurrency();
        existingCryptocurrency.setCryptoId(cryptoId);
        when(cryptocurrencyRepository.findById(cryptoId)).thenReturn(Optional.of(existingCryptocurrency));
        when(cryptocurrencyRepository.save(any())).thenReturn(existingCryptocurrency);

        CryptocurrencyDTO result = cryptocurrencyService.update(cryptoId, updatedDto);

        assertNotNull(result);
        assertEquals(null, result.getName());
        assertEquals(null, result.getId());
    }


    @Test
    void testUpdateNonExisting() {
        int cryptoId = 1;
        when(cryptocurrencyRepository.findById(cryptoId)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> {
            cryptocurrencyService.update(cryptoId, new CryptocurrencyDTO());
        });
    }

    @Test
    void testDeleteByIdExisting() {
        int cryptoId = 1;
        when(cryptocurrencyRepository.existsById(cryptoId)).thenReturn(true);

        assertDoesNotThrow(() -> cryptocurrencyService.deleteById(cryptoId));
    }

    @Test
    void testDeleteByIdNonExisting() {
        int cryptoId = 1;
        when(cryptocurrencyRepository.existsById(cryptoId)).thenReturn(false);

        assertThrows(NoSuchElementException.class, () -> cryptocurrencyService.deleteById(cryptoId));
    }
    @Test
    void testUpdateCryptocurrency_ValidData() {

        int cryptoId = 1;
        DBResponseDTO updatedData = new DBResponseDTO();
        updatedData.setCryptoId(cryptoId);
        updatedData.setCryptoName("New Name");
        updatedData.setCryptoLabel("NL");

        Cryptocurrency existingCryptocurrency = new Cryptocurrency();
        existingCryptocurrency.setCryptoName("Old Name");
        existingCryptocurrency.setCryptoLabel("OL");

        when(cryptocurrencyRepository.findById(cryptoId)).thenReturn(Optional.of(existingCryptocurrency));
        when(cryptocurrencyRepository.save(any(Cryptocurrency.class))).thenReturn(existingCryptocurrency);

        cryptocurrencyService.updateCryptocurrency(updatedData);

        assertEquals(updatedData.getCryptoName(), existingCryptocurrency.getCryptoName());
        assertEquals(updatedData.getCryptoLabel(), existingCryptocurrency.getCryptoLabel());
        verify(cryptocurrencyRepository).save(existingCryptocurrency);
    }


}




