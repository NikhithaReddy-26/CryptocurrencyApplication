import {StoryFn,Meta} from "@storybook/react";
import WatchlistBar, { WatchlistBarProps } from ".";
import bitcoin from "../../../../public/assets/images/BItcoin.svg";
import ethereum from "../../../../public/assets/images/Etherum.svg";
import usd from "../../../../public/assets/icons/Property 1=icons, Property 2=rupee1.svg";

export default{
    title:"Organisms/WatchlistBar",
    component:WatchlistBar,
    argTypes: {
        coin: { control: { type: "text" } },
        coinName: { control: { type: "text" } },
        coinType: { control: { type: "text" } },
        coinRate: { control: { type: "text" } },
        marketCap: { control: { type: "text" } },
        vol24H: { control: { type: "text" } },
        supply: { control: { type: "text" } },
        isChecked: { control: { type: "boolean" } },
      },
}

const Template:StoryFn<WatchlistBarProps> = (args) => <WatchlistBar {...args}/>;

export const Bitcoin = Template.bind({});
Bitcoin.args = {
    coin:bitcoin,
    coinName:"Bitcoin",
    coinType:"BTC",
    coinRate:"+8.2%",
    marketCap:"$64.2T",
    vol24H:"$2.9T",
    supply:"$18.8M BTC",
    isChecked:false,
}

export const Ethereum = Template.bind({});
Ethereum.args = {
    coin:ethereum,
    coinName:"Ethereum",
    coinType:"ETH",
    coinRate:"+0.64%",
    marketCap:"$162.92B",
    vol24H:"$11.5B",
    supply:"$122.60M ETH",
    isChecked:false,
}

export const USDCoin = Template.bind({});
USDCoin.args = {
    coin:usd,
    coinName:"USD Coin",
    coinType:"Cash",
}