import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    useDisclosure,
    Text,
    Box,
    Image,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TradeExpiredModal = ({ isTradeExpired }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    useEffect(() => {
        if (isTradeExpired) {
            onOpen();
        }
    }, [isTradeExpired]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg" >
            <ModalOverlay />
            <ModalContent >
                <ModalHeader bg={'#aff0e4'} color={'teal'} borderRadius={5}>
                    Trade Expired
                </ModalHeader>
                <ModalCloseButton color={'teal'} />
                <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" bg="transparent" borderRadius={10}>
                    {/* Add your GIF here */}
                    <Image
                        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTFqaWw4MGJhcXU4aXd6OHRueDM0cmg1N3FpZGdpdzl1dXBjbjBvbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UoeaPqYrimha6rdTFV/giphy.gif"
                        alt="Trade Expired"
                        boxSize="300px"
                        h={'200px'}
                        objectFit="contain"
                        borderRadius={5}
                    />
                    <Text fontSize="lg" color="gray.700" textAlign="center">
                        Your trade session has expired.
                        <br />
                        Please create a new trade.
                    </Text>
                </ModalBody>
                <ModalFooter justifyContent={"space-between"} mt={5} bg={'#aff0e4'} borderRadius={5}>
                    <Button colorScheme="teal" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="outline" colorScheme="blue" onClick={() => { navigate('/buy'); onClose(); }}>
                        Start New Trade
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default TradeExpiredModal;
