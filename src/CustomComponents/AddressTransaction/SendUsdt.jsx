import { ethers } from 'ethers';

const USDT_CONTRACT_ADDRESS = '0xEf1F6c5Cda1C86f1AC821D093CB1fB9A6B4C0f8b'; // Testnet USDT
const ERC20_ABI = [
    'function transfer(address to, uint amount) public returns (bool)',
    'function decimals() view returns (uint8)',
];


const SendUsdt = async (privateKey, walletAddress, assetValue) => {
    const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/b6bf7d3508c941499b10025c0776eaf8');
    const wallet = new ethers.Wallet(privateKey, provider);

    const contract = new ethers.Contract(USDT_CONTRACT_ADDRESS, ERC20_ABI, wallet);

    try {
        const decimals = await contract.decimals(); // typically 6 or 18
        const amount = ethers.utils.parseUnits(assetValue.toString(), decimals);

        const tx = await contract.transfer(walletAddress, amount);
        const receipt = await tx.wait();

        return receipt;
    } catch (error) {
        console.error('USDT Transfer Error:', error);
        throw error;
    }
};

export default SendUsdt;
