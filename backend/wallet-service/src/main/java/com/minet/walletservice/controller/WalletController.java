package com.minet.walletservice.controller;

import com.minet.walletservice.VO.ResponseTemplateVO;
import com.minet.walletservice.dto.WalletDTO;
import com.minet.walletservice.service.WalletService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wallets")
@Slf4j
public class WalletController {

    @Autowired
    private WalletService walletService;

    @GetMapping("/{walletId}")
    public ResponseTemplateVO getWalletDetails(@PathVariable("walletId") int walletId) {
        log.info("Request received to get details for walletId: {}", walletId);

        ResponseTemplateVO response = walletService.getWalletDetails(walletId);

        log.info("Returning wallet details for walletId: {}", walletId);
        return response;
    }

    @PutMapping("/{walletId}")
    public WalletDTO updateWallet(@PathVariable int walletId, @RequestBody WalletDTO walletDTO) {
        log.info("Request received to update wallet with walletId: {}", walletId);
       return  walletService.updateWallet(walletId, walletDTO);
    }
}
