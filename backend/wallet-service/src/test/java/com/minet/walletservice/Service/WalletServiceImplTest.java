package com.minet.walletservice.Service;

import com.minet.walletservice.VO.Cryptocurrency;
import com.minet.walletservice.VO.ResponseTemplateVO;
import com.minet.walletservice.VO.User;
import com.minet.walletservice.dto.WalletDTO;
import com.minet.walletservice.entity.Wallet;
import com.minet.walletservice.exception.WalletNotFoundException;
import com.minet.walletservice.repository.WalletRepository;
import com.minet.walletservice.service.WalletServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class WalletServiceImplTest {

    @Mock
    private WalletRepository walletRepository;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private WalletServiceImpl walletService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetWalletDetails() {
        int walletId = 1;

        Wallet wallet = new Wallet();
        wallet.setUserId(1);
        wallet.setCryptoId(1);

        User user = new User();
        user.setUser_id(1);
        user.setFull_name("testUser");

        Cryptocurrency cryptocurrency = new Cryptocurrency();
        cryptocurrency.setCryptoId(1);
        cryptocurrency.setCryptoName("Bitcoin");

        when(walletRepository.findById(walletId)).thenReturn(Optional.of(wallet));
        when(restTemplate.getForObject("http://localhost:8001/users/" + wallet.getUserId(), User.class))
                .thenReturn(user);
        when(restTemplate.getForObject("http://localhost:8002/cryptocurrencies/" + wallet.getCryptoId(), Cryptocurrency.class))
                .thenReturn(cryptocurrency);

        ResponseTemplateVO result = walletService.getWalletDetails(walletId);

        assertEquals(user.getUser_id(), result.getUser().getUser_id());
        assertEquals(cryptocurrency.getCryptoId(), result.getCryptocurrency().getCryptoId());
    }

    @Test
    void testGetWalletDetailsNotFound() {
        int walletId = 1;

        when(walletRepository.findById(walletId)).thenReturn(Optional.empty());

        assertThrows(WalletNotFoundException.class, () -> {
            walletService.getWalletDetails(walletId);
        });
    }

    @Test
    void testUpdateWallet() {
        int walletId = 1;

        WalletDTO walletDTO = new WalletDTO();
        walletDTO.setTotalBalance(1000.0);
        walletDTO.setUserId(1);
        walletDTO.setCryptoId(1);

        Wallet existingWallet = new Wallet();
        existingWallet.setWalletId(walletId);
        existingWallet.setTotalBalance(500.0);
        existingWallet.setUserId(1);
        existingWallet.setCryptoId(1);

        Wallet updatedWallet = new Wallet();
        updatedWallet.setWalletId(walletId);
        updatedWallet.setTotalBalance(1000.0);
        updatedWallet.setUserId(1);
        updatedWallet.setCryptoId(1);

        when(walletRepository.findById(walletId)).thenReturn(Optional.of(existingWallet));
        when(walletRepository.save(existingWallet)).thenReturn(updatedWallet);
        when(modelMapper.map(updatedWallet, WalletDTO.class)).thenReturn(walletDTO);

        WalletDTO result = walletService.updateWallet(walletId, walletDTO);

        assertEquals(walletDTO.getTotalBalance(), result.getTotalBalance());
    }

    @Test
    void testUpdateWalletNotFound() {
        int walletId = 1;

        WalletDTO walletDTO = new WalletDTO();

        when(walletRepository.findById(walletId)).thenReturn(Optional.empty());

        assertThrows(WalletNotFoundException.class, () -> {
            walletService.updateWallet(walletId, walletDTO);
        });
    }
}
