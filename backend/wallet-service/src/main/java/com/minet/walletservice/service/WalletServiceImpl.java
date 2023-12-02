package com.minet.walletservice.service;

import com.minet.walletservice.VO.Cryptocurrency;
import com.minet.walletservice.VO.ResponseTemplateVO;
import com.minet.walletservice.VO.User;
import com.minet.walletservice.dto.WalletDTO;
import com.minet.walletservice.entity.Wallet;
import com.minet.walletservice.exception.WalletNotFoundException;
import com.minet.walletservice.repository.WalletRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class WalletServiceImpl implements WalletService {

    private final WalletRepository walletRepository;
    private final ModelMapper modelMapper;
    private final RestTemplate restTemplate;

    @Autowired
    public WalletServiceImpl(WalletRepository walletRepository, ModelMapper modelMapper, RestTemplate restTemplate) {
        this.walletRepository = walletRepository;
        this.modelMapper = modelMapper;
        this.restTemplate = restTemplate;
    }

    @Override
    public ResponseTemplateVO getWalletDetails(int walletID) {
        ResponseTemplateVO vo = new ResponseTemplateVO();

        Optional<Wallet> walletOptional = walletRepository.findById(walletID);

        if (walletOptional.isPresent()) {
            Wallet wallet = walletOptional.get();

            User user = restTemplate.getForObject("http://USER-SERVICE/users/" + wallet.getUserId(), User.class);

            Cryptocurrency cryptocurrency = restTemplate.getForObject("http://CRYPTOCURRENCY-SERVICE/cryptocurrencies/" + wallet.getCryptoId(), Cryptocurrency.class);

            vo.setWallet(wallet);
            vo.setUser(user);
            vo.setCryptocurrency(cryptocurrency);
        } else {
            // Handle the case where wallet is not found
            throw new WalletNotFoundException("Wallet not found with id: " + walletID);
        }

        return vo;
    }
@Override
    public WalletDTO updateWallet(int walletId, WalletDTO walletDTO) {
        Optional<Wallet> walletOptional = walletRepository.findById(walletId);

        if (walletOptional.isPresent()) {
            Wallet existingWallet = walletOptional.get();


            existingWallet.setTotalBalance(walletDTO.getTotalBalance());
            existingWallet.setUserId(walletDTO.getUserId());
            existingWallet.setCryptoId(walletDTO.getCryptoId());


            Wallet updatedWallet = walletRepository.save(existingWallet);

            return modelMapper.map(updatedWallet, WalletDTO.class);
        } else {

            throw new WalletNotFoundException("Wallet with ID " + walletId + " not found");
        }
    }

}
