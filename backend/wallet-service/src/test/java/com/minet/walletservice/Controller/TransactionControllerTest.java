package com.minet.walletservice.Controller;

import com.minet.walletservice.controller.TransactionController;
import com.minet.walletservice.dto.TransactionDTO;
import com.minet.walletservice.service.TransactionService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@Slf4j
class TransactionControllerTest {

    @Mock
    private TransactionService transactionService;

    @InjectMocks
    private TransactionController transactionController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllTransactions() {
        List<TransactionDTO> transactions = new ArrayList<>();
        transactions.add(new TransactionDTO());
        transactions.add(new TransactionDTO());

        when(transactionService.getAllTransactions()).thenReturn(transactions);

        List<TransactionDTO> result = transactionController.getAllTransactions();

        assertEquals(transactions.size(), result.size());
    }

    @Test
    void testGetTransactionsByWalletId() {
        int walletId = 1;
        List<TransactionDTO> transactions = new ArrayList<>();
        transactions.add(new TransactionDTO());
        transactions.add(new TransactionDTO());

        when(transactionService.getTransactionsByWalletId(walletId)).thenReturn(transactions);

        List<TransactionDTO> result = transactionController.getTransactionsByWalletId(walletId);

        assertEquals(transactions.size(), result.size());
    }

    @Test
    void testCreateTransactionSuccess() {
        TransactionDTO transactionDTO = new TransactionDTO();
        when(transactionService.createTransaction(transactionDTO)).thenReturn(transactionDTO);

        ResponseEntity<TransactionDTO> response = transactionController.createTransaction(transactionDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(transactionDTO, response.getBody());
    }

    @Test
    void testCreateTransactionFailure() {
        TransactionDTO transactionDTO = new TransactionDTO();
        when(transactionService.createTransaction(transactionDTO)).thenReturn(null);

        ResponseEntity<TransactionDTO> response = transactionController.createTransaction(transactionDTO);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }
}
