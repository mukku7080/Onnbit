import { SiConvertio } from 'react-icons/si';
import { GoArrowDownLeft, GoArrowUpRight } from 'react-icons/go';
import { useWalletStore } from './useWalletStore';
import { Receive1, Receive2, Receive3, Receive4, Send1, Send2, Send3, Send4, ThreeDotMenu1 } from '../Wallet/Balance';
import { useOtherDetail } from '../../Context/otherContext';

export const useCryptoOption = () => {
    const wallet = useWalletStore((state) => state.web3wallet);
    const ether = wallet?.data?.ethereum || [];
    const { price } = useOtherDetail();



    return [
        {
            status: wallet?.data?.bitcoin ? true : false,
            shrotName: 'BTC',
            name: 'Bitcoin',
            asset: 'btc',
            network: 'btc',
            logo: '/imagelogo/bitcoin-btc-logo.png',
            pricePerCoin: `1 BTC = ${price?.bitcoin?.inr} INR`,
            currentPrice: price?.bitcoin?.inr,
            blc: wallet?.data?.bitcoin?.[0]?.remaining_amount,
            INR: '0.00',
            table: 'true',
            receive: <Receive1 />,
            send: <Send1 />,
            threedots: <ThreeDotMenu1 btnName={'BTC'} />,

            actions: [
                { action: <Send1 /> },
                { action: <Receive1 /> },
                { name: 'Convert', icon: <SiConvertio />, to: '/wallet/convert' },
                { name: 'Buy BTC', icon: <GoArrowDownLeft />, to: '/buy' },
                { name: 'Sell BTC', icon: <GoArrowUpRight />, to: '/sell' }
            ]
        },
        {
            status: ether.find(item => item.asset === 'eth') ? true : false,
            shrotName: 'ETH',
            name: 'Ethereum',
            asset: 'eth',
            network: 'erc20',
            logo: '/imagelogo/ethereum-eth-logo.png',
            pricePerCoin: `1 ETH = ${price?.ethereum?.inr} INR`,
            currentPrice: price?.ethereum?.inr,
            blc: ether.find(item => item.asset === 'eth')?.remaining_amount,
            INR: '0.00',
            table: 'true',
            receive: <Receive2 />,
            send: <Send2 />,
            threedots: <ThreeDotMenu1 btnName={'ETH'} />,

            actions: [
                { action: <Send2 /> },
                { action: <Receive2 /> },
                { name: 'Convert', icon: <SiConvertio />, to: '/wallet/convert' },
                { name: 'Buy ETH', icon: <GoArrowDownLeft />, to: '/buy' },
                { name: 'Sell ETH', icon: <GoArrowUpRight />, to: '/sell' }
            ]
        },
        {
            status: wallet?.data?.binance ? true : false,
            shrotName: 'BNB',
            name: 'Binance',
            asset: 'bnb',
            network: 'bep20',
            logo: '/imagelogo/bnb-bnb-logo.png',
            pricePerCoin: `1 BNB = ${price?.binancecoin?.inr} INR`,
            currentPrice: price?.binancecoin?.inr,
            blc: wallet?.data?.binance?.[0]?.remaining_amount,
            INR: '0.00',
            receive: <Receive3 />, send: <Send3 />,
            threedots: <ThreeDotMenu1 btnName={'USDC'} />,

            actions: [
                { action: <Send3 /> },
                { action: <Receive3 /> },
                { name: 'Convert', icon: <SiConvertio />, to: '/wallet/convert' },
                { name: 'Buy USDC', icon: <GoArrowDownLeft />, to: '/buy' },
                { name: 'Sell USDC', icon: <GoArrowUpRight />, to: '/sell' }
            ]
        },
        {
            status: ether.find(item => item.asset === 'usdt') ? true : false,
            shrotName: 'USDT',
            name: 'Tether',
            asset: 'usdt',
            network: 'erc20',
            logo: '/imagelogo/tether-usdt-logo.png',
            pricePerCoin: `1 USDT = ${price?.tether?.inr} INR`,
            currentPrice: price?.tether?.inr,
            blc: ether.find(item => item.asset === 'usdt')?.remaining_amount,
            INR: '0.00',
            receive: <Receive4 />, send: <Send4 />,
            threedots: <ThreeDotMenu1 btnName={'USDT'} />,
            actions: [
                { action: <Send4 /> },
                { action: <Receive4 /> },
                { name: 'Convert', icon: <SiConvertio />, to: '/wallet/convert' },
                { name: 'Buy USDT', icon: <GoArrowDownLeft />, to: '/buy' },
                { name: 'Sell USDT', icon: <GoArrowUpRight />, to: '/sell' }
            ]
        }
    ];
};
