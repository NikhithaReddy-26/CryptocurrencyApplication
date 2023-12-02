package com.minet.walletservice.Service;

import com.minet.walletservice.dto.TransactionDTO;
import com.minet.walletservice.entity.Transaction;
import com.minet.walletservice.repository.TransactionRepository;
import com.minet.walletservice.service.TransactionServiceImpl;
import com.minet.walletservice.walletenum.TransactionType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TransactionServiceImplTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private TransactionServiceImpl transactionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateTransaction() {
        TransactionDTO transactionDTO = new TransactionDTO();
        transactionDTO.setTransactionPrice(100.0);

        Transaction transaction = new Transaction();
        transaction.setTransactionPrice(100.0);
        transaction.setTransactionType(TransactionType.Purchased);

        when(modelMapper.map(transactionDTO, Transaction.class)).thenReturn(transaction);
        when(transactionRepository.save(transaction)).thenReturn(transaction);
        when(modelMapper.map(transaction, TransactionDTO.class)).thenReturn(transactionDTO);

        TransactionDTO result = transactionService.createTransaction(transactionDTO);

        assertEquals(TransactionType.Purchased, transaction.getTransactionType());
        assertEquals(transactionDTO.getTransactionPrice(), result.getTransactionPrice());
    }

    @Test
    void testGetAllTransactions() {
        List<Transaction> transactions = new ArrayList<>();
        transactions.add(new Transaction());
        transactions.add(new Transaction());

        when(transactionRepository.findAll()).thenReturn(transactions);

        List<TransactionDTO> result = transactionService.getAllTransactions();

        assertEquals(transactions.size(), result.size());
    }

    @Test
    void testGetTransactionsByWalletId() {
        int walletId = 1;
        List<Transaction> transactions = new ArrayList<>();
        transactions.add(new Transaction());
        transactions.add(new Transaction());

        when(transactionRepository.findByWalletId(walletId)).thenReturn(transactions);

        List<TransactionDTO> result = transactionService.getTransactionsByWalletId(walletId);

        assertEquals(transactions.size(), result.size());
    }
}
