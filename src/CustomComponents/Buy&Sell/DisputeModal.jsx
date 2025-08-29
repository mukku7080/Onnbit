import React, { useEffect, useState } from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton,
    Button, FormControl, FormLabel, Input,
    Textarea, Select, useDisclosure
} from '@chakra-ui/react';
import { useTradeProvider } from '../../Context/TradeContext';
import useStore from '../Store/store';
import { useParams } from 'react-router-dom';
import { Seller } from './TradeStart';

const DisputeModal = ({ isOpen, onClose, id, tradeDetail }) => {

    const setDispute = useStore((state) => state.setDispute);
    const setBuyer = useStore((state) => state.setBuyer);
    const setSeller = useStore((state) => state.setSeller);
    const setDisputeMessage = useStore((state) => state.setDisputeMessage)

    const { tradeId, tradeType } = useParams();

    const { handleSupportTicket, handleUpdateTradeDispute, handleGetSupportTicketById, supportticketDetail } = useTradeProvider();
    const [formData, setFormData] = useState({
        subject: '',
        message: '',
        attachment: [],
    });
    const [isloading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     if (!supportticketDetail) {
    //         return;
    //     }
    //     if (tradeDetail?.buyer_id == supportticketDetail?.user_id) {
    //         setBuyer(true);
    //     } else {
    //         setSeller(true);
    //     }
    // }, [supportticketDetail]);
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (type) => {
        // Prepare data as needed for API
        setIsLoading(true);
        const payload = new FormData();
        payload.append('subject', formData.subject);
        payload.append('message', formData.message);
        if (formData.attachment) {
            payload.append('attachment', formData.attachment);
        };

        const response = await handleSupportTicket(payload);
        console.log(response);
        if (response.status) {
            const dto = {
                trade_id: id,
                support_ticket_number: response?.data?.ticket_number
            }
            setIsLoading(false);
            await handleUpdateTradeDispute(dto);
            if (type === 'buy_trade') {
                setBuyer(true);
            } else {
                setSeller(true);

            }
            const res = await handleGetSupportTicketById(response.data?.ticket_number);
            setDispute(true);
            setTimeout(() => {
                setDisputeMessage(true);
            }, 3000);
        }
        onClose(); // Close modal after submission
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Start a Dispute</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl mb={4}>
                        <FormLabel>Subject</FormLabel>
                        <Input
                            name="subject"
                            placeholder="Enter subject"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Message</FormLabel>
                        <Textarea
                            name="message"
                            placeholder="Describe the issue..."
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </FormControl>

                    {/* <FormControl mb={4}>
                        <FormLabel>Priority</FormLabel>
                        <Select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </Select>
                    </FormControl> */}

                    {/* <FormControl>
                        <FormLabel>Attachment</FormLabel>
                        <Input
                            type="file"
                            name="attachment"
                            accept="image/*,.pdf"
                            onChange={handleChange}
                        />
                    </FormControl> */}
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose} mr={3}>Cancel</Button>
                    <Button colorScheme="blue" onClick={() => handleSubmit(tradeType)} isLoading={isloading} loadingText={'Submitting'}>Submit Dispute</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DisputeModal;
