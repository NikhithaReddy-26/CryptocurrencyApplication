package com.minet.walletservice.service;


import com.minet.walletservice.VO.ResponseTemplateVO;
import com.minet.walletservice.dto.WalletDTO;


public interface WalletService {

    ResponseTemplateVO getWalletDetails(int walletID);


    WalletDTO updateWallet(int walletId, WalletDTO walletDTO);


 }
