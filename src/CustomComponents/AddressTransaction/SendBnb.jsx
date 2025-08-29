import { ethers } from 'ethers';
const SendBnb = async (privateKey, walletAddress, assetValue) => {

    const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
    const wallet = new ethers.Wallet(privateKey, provider);
    const amountInBNB = Number(assetValue).toFixed(18);
    try {
        const tx = await wallet.sendTransaction({
            to: walletAddress,
            value: ethers.utils.parseEther(amountInBNB.toString())
        });
        const receipt = await tx.wait();
        return receipt;

    } catch (error) {
        console.error(error);
    }
};


export default SendBnb;
