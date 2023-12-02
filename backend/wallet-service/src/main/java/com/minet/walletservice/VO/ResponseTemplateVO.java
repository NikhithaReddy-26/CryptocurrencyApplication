package com.minet.walletservice.VO;

import com.minet.walletservice.entity.Wallet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseTemplateVO {

    private User user;
    private Cryptocurrency cryptocurrency;
    private Wallet wallet;

}
