
package com.minet.walletservice.service;

        import com.minet.walletservice.dto.TransactionDTO;

        import java.util.List;

public interface TransactionService {
    List<TransactionDTO> getAllTransactions();

    List<TransactionDTO> getTransactionsByWalletId(int walletId);
    TransactionDTO createTransaction(TransactionDTO transactionDTO);


}

