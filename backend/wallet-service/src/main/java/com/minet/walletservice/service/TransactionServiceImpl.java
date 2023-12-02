
package com.minet.walletservice.service;

        import com.minet.walletservice.dto.TransactionDTO;
        import com.minet.walletservice.entity.Transaction;
        import com.minet.walletservice.repository.TransactionRepository;
        import com.minet.walletservice.walletenum.TransactionType;
        import org.modelmapper.ModelMapper;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;

        import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TransactionServiceImpl(TransactionRepository transactionRepository, ModelMapper modelMapper) {
        this.transactionRepository = transactionRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public TransactionDTO createTransaction(TransactionDTO transactionDTO) {
        Transaction transaction = modelMapper.map(transactionDTO, Transaction.class);
        Transaction createdTransaction = transactionRepository.save(transaction);
        return modelMapper.map(createdTransaction, TransactionDTO.class);
    }


    @Override
    public List<TransactionDTO> getAllTransactions() {
        List<Transaction> transactions = transactionRepository.findAll();
        return transactions.stream()
                .map(transaction -> modelMapper.map(transaction, TransactionDTO.class))
                .toList();
    }

    @Override
    public List<TransactionDTO> getTransactionsByWalletId(int walletId) {
        List<Transaction> transactions = transactionRepository.findByWalletId(walletId);
        return transactions.stream()
                .map(transaction -> modelMapper.map(transaction, TransactionDTO.class))
                .toList();
    }





}
