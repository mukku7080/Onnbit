import { Routes, Route } from 'react-router-dom';
import Hero from './CustomComponents/HeroSection/Hero';
import Loginnew from './CustomComponents/LoginSignup/Loginnew';
import Signupnew from './CustomComponents/LoginSignup/Signupnew';
import ProtectedRoute from './CustomComponents/AuthContext/ProtectedRoute';
import UserDashboardNew from './CustomComponents/Afterlogin/UserDashboard/UserDashboardNew';
import TradeHistoryNew from './CustomComponents/Afterlogin/UserDashboard/TradeHistoryNew';
import RecentTradeHistory from './CustomComponents/Afterlogin/UserDashboard/RecentTradeHistory';
import Numberwithotp from './CustomComponents/LoginSignup/Numberwithotp';
import Profile from './CustomComponents/Afterlogin/Profile';
import BuyNew from './CustomComponents/Buy&Sell/BuyNew';
import SellNew from './CustomComponents/Buy&Sell/SellNew';
import CreateOffers from './CustomComponents/Offers/CreateOffers';
import Wallet from './CustomComponents/Wallet/Wallet';
import Balance from './CustomComponents/Wallet/Balance';
import Transaction from './CustomComponents/Wallet/Transaction';
import Addresses from './CustomComponents/Wallet/Addresses';
import Convert from './CustomComponents/Wallet/Convert';
import Settings from './CustomComponents/SettingsPage/Settings';
import ProfilePage from './CustomComponents/SettingsPage/ProfilePage';
import PaymentMethod from './CustomComponents/SettingsPage/PaymentMethod';
import PasswordReset from './CustomComponents/LoginSignup/PasswordReset';
import ForgetPassword from './CustomComponents/LoginSignup/ForgetPassword';
import Redirect from './CustomComponents/LoginSignup/Redirect';
import MyOffers from './CustomComponents/Afterlogin/UserDashboard/MyOffers';
import Verification from './CustomComponents/SettingsPage/Verification';
import SecurityQuestion from './CustomComponents/SettingsPage/SecurityQuestion';
import Security from './CustomComponents/SettingsPage/Security';
import BuyOffer from './CustomComponents/Buy&Sell/BuyOffer';
import SellOffer from './CustomComponents/Buy&Sell/SellOffer';
import InviteFriend from './CustomComponents/Afterlogin/UserDashboard/InviteFriend';
import ForgetPasswrod from './CustomComponents/LoginSignup/ForgetPassword';
import Testing from './CustomComponents/Wallet/Testing';
import AllNotification from './CustomComponents/NotificationFile/AllNotification';
import NotFound from './CustomComponents/NotFound/NotFound';
import EmailVerification from './CustomComponents/LoginSignup/EmailVerification';
import TradePartnerProfile from './CustomComponents/Afterlogin/TradePartnerProfile';
// import SendUsdt from './CustomComponents/AddressTransaction/SendUSDT';
import SendBitcoin from './CustomComponents/AddressTransaction/SendBtc';
import SendBitcoinAsset from './CustomComponents/AddressTransaction/SendBitcoinAsset';
import TradeStart from './CustomComponents/Buy&Sell/TradeStart';
import SellTradeStart from './CustomComponents/Buy&Sell/SellTradeStart';
import TradeStartWrapper from './CustomComponents/Buy&Sell/TradeStartWrapper';
import TimeoutPage from './CustomComponents/NotFound/TimeoutPage';
// import BitcoinWallet1 from './CustomComponents/Testwallet/BitCoinWallet1';


const RoutesConfig = () => {
    return (
        <Routes>
            <Route path='/' element={<Hero />} />
            <Route path='/login' element={<Loginnew />} />
            <Route path='/signup' element={<Signupnew />} />
            <Route path='/testing' element={<Testing />} />
            {/* <Route path='/sendusdt' element={<SendUsdt />} /> */}
            <Route path='/sendbtc' element={<SendBitcoin />} />
            <Route path='/sendbitcoinasset' element={<SendBitcoinAsset />} />
            <Route path='/timeout' element={<TimeoutPage />} />
            <Route path='*' element={<NotFound />} />
            {/* <Route path='/bitcoinTesting' element={<BitcoinWallet1 />} /> */}
            {/* <Route path='/phoneVerification' element={<OtpVerification />} /> */}
            <Route path='/allNotification' element={<AllNotification />} />


            <Route path='/forgetPassword' element={<ForgetPasswrod />} />

            <Route path="/number-verification" element={<ProtectedRoute><Numberwithotp /></ProtectedRoute>} />
            <Route path="/email-verification" element={<EmailVerification />} />
            <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboardNew /></ProtectedRoute>} >
                <Route index element={<TradeHistoryNew />} />
                <Route path="tradehistory" element={<TradeHistoryNew />} />
                <Route path="recentTradePartners" element={<RecentTradeHistory />} />
                <Route path="myOffers" element={<MyOffers />} />
                <Route path="inviteFriends" element={<InviteFriend />} />
            </Route>
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/trade-partner-profile" element={<ProtectedRoute><TradePartnerProfile /></ProtectedRoute>} />
            <Route path='/buy' element={<ProtectedRoute><BuyNew /></ProtectedRoute>} />
            <Route path='/buyOffer' element={<ProtectedRoute><BuyOffer /></ProtectedRoute>} />
            <Route path='/tradeStart/:tradeId/:tradeType' element={<ProtectedRoute><TradeStart /></ProtectedRoute>} />
            <Route path='/sellOffer' element={<ProtectedRoute><SellOffer /></ProtectedRoute>} />
            <Route path='/sell' element={<ProtectedRoute><SellNew /></ProtectedRoute>} />
            <Route path='/createOffers' element={<ProtectedRoute><CreateOffers /></ProtectedRoute>} />
            <Route path='/redirect' element={<Redirect />} />
            <Route path='/wallet' element={<ProtectedRoute><Wallet /></ProtectedRoute>} >
                <Route index element={<Balance />} />
                <Route path='balance' element={<Balance />} />
                <Route path='transactions' element={<Transaction />} />
                <Route path='addresses' element={<Addresses />} />
                <Route path='convert' element={<Convert />} />
            </Route>
            <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} >
                <Route index element={<ProfilePage />} />
                <Route path='profileSetting' element={<ProfilePage />} />
                <Route path='paymentMethod' element={<PaymentMethod />} />
                <Route path='verification' element={<Verification />} />
                <Route path='securityQuestions' element={<SecurityQuestion />} />
                <Route path='security' element={<Security />} />
            </Route>
            <Route path='password-reset/:token' element={<PasswordReset />} />
            <Route path='forget' element={<ForgetPassword />} />
        </Routes>
    );
};

export default RoutesConfig;
