package com.minet.walletservice.dto;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WalletDTO {

    private int walletId;
    private Double totalBalance;
    private int userId;
    private int cryptoId;

}
