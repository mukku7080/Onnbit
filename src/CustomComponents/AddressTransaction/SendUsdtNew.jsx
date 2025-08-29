import { useState } from 'react';
import { ethers } from 'ethers';

function useSendUsdtNew() {
    const [status, setStatus] = useState('');

    const sendusdt = async (privateKey, walletAddress, assetValue) => {
        const tokenAddress = '0xcac524bca292aaade2df8a05cc58f0a65b1b3bb9';
        const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/b6bf7d3508c941499b10025c0776eaf8");
        const ERC20_ABI = [
            "function balanceOf(address owner) view returns (uint256)",
            "function decimals() view returns (uint8)",
            "function transfer(address to, uint amount) returns (bool)"
        ];
        try {
            const wallet = new ethers.Wallet(privateKey, provider);
            const contract = new ethers.Contract(tokenAddress, ERC20_ABI, wallet);

            const decimals = await contract.decimals();
            const parsedAmount = ethers.utils.parseUnits(assetValue, decimals);

            const tx = await contract.transfer(walletAddress, parsedAmount);

            setStatus('Token transaction sent. Waiting for confirmation...');
          const receipt=  await tx.wait();
            setStatus('Token transaction successful!');
            return receipt;

        } catch (err) {
            setStatus(`Token transfer failed: ${err.message}`);
        }
    };

    return { status, sendusdt };
}

export default useSendUsdtNew;
