import { useEffect, useState } from "react";
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useAccount } from "../../Context/AccountContext";
import TransactionRequest from "../../Modals/TransactionRequest";
import NotificationRequest from "../../Modals/NotificationRequest";
import { useOtherDetail } from "../../Context/otherContext";
import { useTradeProvider } from "../../Context/TradeContext";
import { useOffer } from "../../Context/OfferContext";
import MyOfferRequest from "../../Modals/MyOfferRequest";
const Pagination = ({ totalPages, onPageChange, setIsLoading, type, index }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { handleGetAllTransaction } = useAccount();
    const { handleGetAllNotification } = useOtherDetail();
    const { handleAuthenticatedTradeHistory } = useTradeProvider();
    const { handleGetMyOffer } = useOffer();

    const handlePageChange = async (page) => {
        if (page < 1 || page > totalPages) return;

        setCurrentPage(page);
        onPageChange(page);
        setIsLoading(true);
        const req = new TransactionRequest();
        if (type === 'finished') {
            req.status = 'success';
            req.cryptocurrency = filterIndex[index];
            req.page = page
            await handleGetAllTransaction(req);
        }
        else if (type === 'all') {
            const req = new TransactionRequest();
            req.page = page
            const response = await handleGetAllTransaction(req)
            if (response?.status === true) {
                setIsLoading(false);
            }
        }
        else if (type === 'notification') {
            const req = new NotificationRequest();
            req.page = page;
            const response = await handleGetAllNotification(req)
            if (response?.status === true) {
                setIsLoading(false);
            }
        }
        else if (type === 'trade_history') {

            const response = await handleAuthenticatedTradeHistory(page)
            if (response?.status === true) {
                setIsLoading(false);
            }
        }
        else if (type === 'myBuyOffer') {
            const req = new MyOfferRequest();
            req.txn_type = 'buy'
            req.page = page

            const response = await handleGetMyOffer(req)
            if (response?.status === true) {
                setIsLoading(false);
            }
        }

        else if (type === 'mySellOffer') {
            const req = new MyOfferRequest();
            req.txn_type = 'sell'
            req.page = page

            const response = await handleGetMyOffer(req)
            if (response?.status === true) {
                setIsLoading(false);
            }
        }
        else if (type === 'recent-trade-partners') {
            const response = await handleAuthenticatedTradeHistory(page)
            if (response?.status === true) {
                setIsLoading(false);
            }
        }



    };

    // Create window of 3 page buttons
    useEffect(() => {
        setCurrentPage(1);
    }, [index]);
    const getPageNumbers = () => {
        const pages = [];
        if (currentPage > 1) pages.push(currentPage - 1);
        pages.push(currentPage);
        if (currentPage < totalPages) pages.push(currentPage + 1);

        return pages;
    };

    return (
        <Flex justify="center" align="center" gap={2} mt={4} flexWrap="wrap">
            <IconButton
                icon={<MdKeyboardArrowLeft />}
                isDisabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label="Previous page"
            />

            {getPageNumbers().map((page) => (
                <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    colorScheme={currentPage === page ? "orange" : "gray"}
                >
                    {page}
                </Button>
            ))}

            <IconButton
                icon={<MdKeyboardArrowRight />}
                isDisabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label="Next page"
            />
        </Flex>
    );
};

const PaginatedList = ({ detail, setIsLoading, type, index }) => {
    const handlePageChange = (page) => {
        console.log("Current Page:", page);
    };

    return (
        <Box>
            <Pagination
                totalPages={detail?.last_page}
                onPageChange={handlePageChange}
                setIsLoading={setIsLoading}
                type={type}
                index={index}

            />
        </Box>
    );
};
const filterIndex = {
    0: 'bitcoin',
    1: 'ethereum',
    2: 'binance',
    3: 'tether'
}

export default PaginatedList;
