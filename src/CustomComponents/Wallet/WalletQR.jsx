import React from 'react';
import QRCode from 'react-qr-code';

const WalletQR = ({ walletAddress }) => {
    if (!walletAddress) return null;

    return (
        <div style={{ padding: "16px", background: "white", display: "inline-block" }}>
            <QRCode
                size={120}
                value={walletAddress}
                bgColor="#ffffff"
                fgColor="black" // teal-600
                level="H"
                // style={{ borderRadius: '8px' }}

            />
        </div>
    );
};

export default WalletQR;
