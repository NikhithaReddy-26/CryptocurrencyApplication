package com.minet.walletservice.Controller;

import com.minet.walletservice.VO.ResponseTemplateVO;
import com.minet.walletservice.controller.WalletController;
import com.minet.walletservice.dto.WalletDTO;
import com.minet.walletservice.entity.Wallet;
import com.minet.walletservice.service.WalletService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
        import org.junit.jupiter.api.Test;
        import org.mockito.InjectMocks;
        import org.mockito.Mock;
        import org.mockito.MockitoAnnotations;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;

        import static org.junit.jupiter.api.Assertions.assertEquals;
        import static org.mockito.Mockito.*;

@Slf4j
class WalletControllerTest {

    @Mock
    private WalletService walletService;

    @InjectMocks
    private WalletController walletController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetWalletDetails() {
        int walletId = 1;

        ResponseTemplateVO responseTemplateVO = new ResponseTemplateVO();
        responseTemplateVO.setWallet(new Wallet());

        when(walletService.getWalletDetails(walletId)).thenReturn(responseTemplateVO);

        ResponseTemplateVO result = walletController.getWalletDetails(walletId);

        assertEquals(responseTemplateVO, result);
    }

    @Test
    void testUpdateWallet() {
        int walletId = 1;

        WalletDTO walletDTO = new WalletDTO();

        when(walletService.updateWallet(walletId, walletDTO)).thenReturn(walletDTO);

        WalletDTO result = walletController.updateWallet(walletId, walletDTO);

        assertEquals(walletDTO, result);
    }
}
