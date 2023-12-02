package com.minet.walletservice.controller;

import com.minet.walletservice.dto.TransactionDTO;
import com.minet.walletservice.service.TransactionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/wallets/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public List<TransactionDTO> getAllTransactions() {
        log.info("Fetching all transactions");
        return transactionService.getAllTransactions();
    }

    @GetMapping("/{walletId}")
    public List<TransactionDTO> getTransactionsByWalletId(@PathVariable int walletId) {
        log.info("Fetching transactions for walletId: {}", walletId);
        return transactionService.getTransactionsByWalletId(walletId);
    }

    @PostMapping
    public ResponseEntity<TransactionDTO> createTransaction(@RequestBody TransactionDTO transactionDTO) {
        log.info("Creating new transaction: {}", transactionDTO);

        TransactionDTO createdTransaction = transactionService.createTransaction(transactionDTO);

        if (createdTransaction != null) {
            log.info("Transaction created successfully: {}", createdTransaction);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTransaction);
        } else {
            log.error("Failed to create transaction");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
