package com.minet.walletservice.dto;



        import com.minet.walletservice.walletenum.TransactionType;
        import lombok.Getter;
        import lombok.Setter;

        import java.util.Date;

@Getter
@Setter
public class TransactionDTO {
    private int transactionId;
    private int walletId;
    private Double transactionPrice;
    private Double cryptoPrice;
    private Date date;
    private String fromUser;
    private TransactionType transactionType;
}
