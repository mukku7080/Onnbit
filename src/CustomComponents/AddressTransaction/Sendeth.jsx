import { ethers } from 'ethers';
const Sendeth = async (privateKey, walletAddress, assetValue) => {
    const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/b6bf7d3508c941499b10025c0776eaf8')
    const wallet = new ethers.Wallet(privateKey, provider);

    const toAddress = walletAddress;
    const amountInETH = Number(assetValue).toFixed(18);
    try {
        const tx = await wallet.sendTransaction({
            to: toAddress,
            value: ethers.utils.parseEther(amountInETH.toString()),
        });
        const receipt = await tx.wait();
        return receipt;
    } catch (error) {
        console.error('Transaction Error:', error);
    }

};

export default Sendeth;
