// import { Box, Button, Flex, Input, PinInput, Stack, useStatStyles } from '@chakra-ui/react'
// import React, { useState } from 'react'
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
// import { auth } from '../../firebase.config'
// import OTPInput from './OtpInput'
// import { gradientButtonStyle } from '../Wallet/CreateWallet'

// const OtpVerification = () => {
//     const [phone, setPhone] = useState();
//     const [user, setUser] = useState(null)
//     const [otp, setOtp] = useState(null)
//     const sendOtp = async () => {

//         try {

//             const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})
//             const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha)
//             console.log(confirmation);
//             setUser(confirmation);
//         }
//         catch (error) {
//             console.log(error);
//         }
//         console.log(phone)
//     }
//     const verifyOtp = async () => {
//         try {
//             const data = user.confirm(otp)
//             console.log(data);
//         }
//         catch (error) {
//             console.log(error);
//         }
//     }



//     return (
//         <Flex mt={100} direction={'column'} w={'50%'} gap={10}>
//             <PhoneInput country={'us'}
//                 value={phone}
//                 onChange={(phone) => setPhone('+' + phone)}

//             >
//             </PhoneInput>
//             <Box alignSelf={'center'} id="recaptcha"></Box>
//             <Button sx={gradientButtonStyle} onClick={sendOtp}>Send Otp</Button>
//             <Input onChange={(e) => setOtp(e.target.value)}></Input>
//             <Button onClick={verifyOtp} sx={gradientButtonStyle} >Verify Otp</Button>

//         </Flex>
//     )
// }

// export default OtpVerification
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { gradientButtonStyle } from '../Wallet/CreateWallet';

const OtpVerification = () => {
    const [phone, setPhone] = useState();
    const [user, setUser] = useState(null);
    const [otp, setOtp] = useState(null);

    const sendOtp = async () => {
        try {
          
            const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
                size: 'invisible',
                callback: (response) => {
                    console.log('reCAPTCHA verified!');
                },
                'expired-callback': () => {
                    console.log('reCAPTCHA expired. Please solve again.');
                }
            })

            const confirmation = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
            console.log(confirmation);
            setUser(confirmation);
        } catch (error) {
            console.log('Error sending OTP:', error);
        }
    };

    const verifyOtp = async () => {
        try {
            const confirmationResult = user;
            const data = await confirmationResult.confirm(otp);
            console.log('OTP verified:', data);
        } catch (error) {
            console.log('OTP verification failed:', error);
        }
    };

    return (
        <Flex mt={100} direction={'column'} w={'50%'} gap={10}>
            <PhoneInput
                country={'us'}
                value={phone}
                onChange={(phone) => setPhone('+' + phone)}
            />
            <Box alignSelf={'center'} id="recaptcha" style={{ display: 'block' }}></Box>
            <Button sx={gradientButtonStyle} onClick={sendOtp}>Send OTP</Button>
            <Input
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
            />
            <Button sx={gradientButtonStyle} onClick={verifyOtp}>Verify OTP</Button>
        </Flex>
    );
};

export default OtpVerification;
