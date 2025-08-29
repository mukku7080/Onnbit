import { createContext, useContext, useEffect, useState } from "react";
import { AddOffer, ChangeActiveStatus, ChangeAllActiveStatus, GetMyOffer, GetOffers, UpdateCryptoAdd } from "../api/offerServices"
import { useUser } from "./userContext";

const OfferContext = createContext();

const OfferProvider = ({ children }) => {
    const [offers, setOffers] = useState([]);
    const [sellOffer, setSellOffer] = useState([]);
    const [buyOffer, setBuyOffer] = useState([]);
    const [analytics, setAnalytics] = useState([]);
    const [mySellOffer, setMySellOffer] = useState();
    const [myBuyOffer, setMyBuyOffer] = useState();
    const [myOfferAnalytics, setMyOfferAnalytics] = useState();
    const [traderUserDetail, setTraderUserDetail] = useState();
    const [pagination, setPagination] = useState();

    const [queryParams, setQueryParams] = useState({
        ad_id: '',
        user_id: '',
        txn_type: '',
        cryptocurrency: 'bitcoin',
        paymentMethod: '',
        maxAmount: '',
        offerLocation: '',
        traderLocation: '',
        activeTrader: false,
        per_page: 10,

    });
    const { user } = useUser()
    const [status, setSatus] = useState(false);

    const handleAddOffer = async (values) => {
        try {
            console.log(values);
            const response = await AddOffer(values);
            setSatus(response.status);
            return response;
        }
        catch (error) {

        }
    }
    const handleGetOffer = async (queryParamsOther) => {


        const newQueryParams = {
            ad_id: queryParamsOther.ad_id || '',
            user_id: queryParamsOther.user_id || '',
            txn_type: queryParamsOther.txn_type || '',
            cryptocurrency: queryParamsOther.cryptocurrency || '',
            paymentMethod: queryParamsOther.paymentMethod || '',
            maxAmount: queryParamsOther.maxAmount || '',
            offerLocation: queryParamsOther.offerLocation || '',
            traderLocation: queryParamsOther.traderLocation || '',
            activeTrader: queryParamsOther.activeTrader || false,
            per_page: 10,
        };
        setQueryParams(newQueryParams);
        try {

            const response = await GetOffers(newQueryParams);
            if (queryParams?.user_id) {
                console.log(response?.data?.user);

                setOffers(response?.data?.offer);
                setTraderUserDetail(response?.data?.user);
                response?.data;
            }
            else {
                setOffers(response?.data);

            }
            setAnalytics(response?.analytics);


            return response;
        } catch (error) {
            console.log(error);
        }
        finally {

        }
    }
    const handleGetMyOffer = async (req) => {
        const response = await GetMyOffer(req);
        const mySell = response?.data?.filter(offer => offer.transaction_type === 'sell');
        const myBuy = response?.data?.filter(offer => offer.transaction_type === 'buy');
        setMySellOffer(mySell);
        setMyBuyOffer(myBuy);
        setMyOfferAnalytics(response?.analytics);
        setPagination(response?.pagination);
        return response;

    }
    const handlechangeActiveStatus = async (request) => {
        const response = await ChangeActiveStatus(request);
        return response;
    }
    const handlechangeAllActiveStatus = async (request) => {
        const response = await ChangeAllActiveStatus(request);
        return response;
    }
    const handleUpdateCryptoAd = async (request) => {
        const response = await UpdateCryptoAdd(request);
        return response
    }

    return (
        <OfferContext.Provider value={{ handleAddOffer, pagination, handleUpdateCryptoAd, handleGetOffer, handleGetMyOffer, setSellOffer, setBuyOffer, offers, sellOffer, buyOffer, mySellOffer, myBuyOffer, myOfferAnalytics, handlechangeActiveStatus, analytics, queryParams, setQueryParams, setOffers, setAnalytics, traderUserDetail, handlechangeAllActiveStatus }}>
            {children}
        </OfferContext.Provider>
    )
}
export const useOffer = () => useContext(OfferContext);
export default OfferProvider;



