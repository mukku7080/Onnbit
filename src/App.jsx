import { useEffect, useState } from 'react'
import './App.css'
import Navbarnew from './CustomComponents/Navbar/Navbarnew'
import Footer from './CustomComponents/Footer/Footer'
import { Container, useColorModeValue } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import UserProvider from './Context/userContext'
import OtherDetailProvider from './Context/otherContext'
import { motion } from "framer-motion";
import PageLoader from './CustomComponents/Animation/PageLoader'
import BuySellWithNotification from './CustomComponents/Buy&Sell/BuySellWithNotification'
import RoutesConfig from './RoutesConfig'
import AccountProvider from './Context/AccountContext'
import OfferProvider from './Context/OfferContext'
import { TradeDataProvider } from './CustomComponents/DataContext/TradeDataContext'
import { onMessage } from 'firebase/messaging'
import { messaging } from './CustomComponents/Firebase'
import TradeProvider from './Context/TradeContext'
import FullPageLoader from './CustomComponents/NotFound/FullPageLoader'
import VerificationProvider from './Context/VerificationContext'
function App() {
  const [count, setCount] = useState(0)
  const bgColor = useColorModeValue("#f5f7fa", "gray.900");
  const location = useLocation();
  const isTopLevelRoute = location.pathname.split('/').length <= 2;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('📩 Foreground message received:', payload);
      // Example: show alert or a toast notification
      alert(payload?.notification?.title);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800); // Adjust duration as needed
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <AuthProvider>
        <UserProvider>
          <OtherDetailProvider>
            <OfferProvider>
              <AccountProvider>
                <TradeDataProvider>
                  <TradeProvider>
                    <VerificationProvider>
                      <Container maxW={'container.xxl'} margin={0} padding={0} bg={bgColor} display={'flex'} flexDirection={'column'}>
                        {/* <Box  zIndex={1}> */}
                        <motion.div
                          initial={{ opacity: 0, y: -20 }} // Start position
                          animate={{ opacity: 1, y: 0 }}    // End position
                          transition={{ duration: 0.5, ease: 'easeInOut' }} // Smooth transition
                          style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}
                        >
                          <Navbarnew />
                          <BuySellWithNotification />
                        </motion.div>
                        {/* </Box> */}
                        {loading && isTopLevelRoute ? (
                          <PageLoader />
                        ) : (
                          <RoutesConfig /> // Render routes without reloading for nested pages
                        )}
                        <Footer />
                      </Container>
                    </VerificationProvider>
                  </TradeProvider>
                </TradeDataProvider>
              </AccountProvider>
            </OfferProvider>
          </OtherDetailProvider>
        </UserProvider>
      </AuthProvider>

    </>
  )
}

export default App
