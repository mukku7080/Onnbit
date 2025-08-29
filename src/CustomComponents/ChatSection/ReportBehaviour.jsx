import {
    Box,
    Button,
    Flex,
    Heading,
    Select,
    Image,
    Modal,
    Icon,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Textarea,
    FormLabel,
    FormControl,
    Text,
    useToast,
    Card
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useOtherDetail } from '../../Context/otherContext';
import { FaLaptopCode } from 'react-icons/fa';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';

const ReportBehaviour = ({ tradeDetail }) => {
    const { isOpen, onOpen, onClose } = useDisclosure(); // Report Modal
    const successModal = useDisclosure(); // Success Modal
    const { tradeId, tradeType } = useParams();


    const [reportReason, setReportReason] = useState('');
    const [description, setDescription] = useState('');
    const { handleReportBehaviour } = useOtherDetail();
    const [isLoading, setIsLoading] = useState(false);
    const report_to_id = tradeType === 'buy_trade' ? tradeDetail?.seller_id : tradeDetail?.buyer_id;
    const toast = useToast();

    const handleSelectChange = (e) => {
        setReportReason(e.target.value);
    };

    const reportDto = {
        trade_id: tradeId,
        reported_to_id: report_to_id,
        reason: reportReason,
        description: description,
    };

    const handleReport = async () => {
        setIsLoading(true);
        const res = await handleReportBehaviour(reportDto);
        console.log('Report Response:', res);
        if (res?.status === true) {
            setIsLoading(false);
            onClose();          // close report modal
            successModal.onOpen();  // show success modal
        }
        else {
            setIsLoading(false);
            onClose(); // close report modal
            toast({
                title: 'Error',
                description: res?.message || 'Failed to submit report. Please try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,

            })

        }
    };

    // Auto-close success modal after 2 seconds
    useEffect(() => {
        if (successModal.isOpen) {
            const timer = setTimeout(() => {
                successModal.onClose();
                setReportReason('');
                setDescription('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successModal.isOpen]);

    return (
        <>
            <Button onClick={onOpen} alignSelf={'end'} colorScheme='blue' boxShadow={'lg'} w={'200px'}>
                Report Bad Behaviour
            </Button>

            {/* Report Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader borderTopRadius={5} bg={'gray.50'}>
                        Report Behaviour
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        alignItems={'center'}
                        justifyContent={'center'}
                        flexDirection={'column'}
                        display={'flex'}
                        gap={4}
                        mb={5}
                    >
                        <Card w={'90%'} direction={'column'} alignItems={'center'} gap={5} p={4} boxShadow={'md'} bg={'blue.50'} >
                            <Image boxSize={200} src='/imagelogo/argue.png' />
                            <Heading size={'xs'}>Report Bad Behaviour!</Heading>
                        </Card>

                        <Flex direction={'column'} gap={2}>
                            <Box fontWeight={500}>
                                Trade partners must follow rules stated in&nbsp;
                                <span style={{ color: 'orange' }}>Cryptico.</span>
                            </Box>
                            <Box fontWeight={470}>
                                Please notify us of any bad behaviour by your trade partner. If payment or transaction issues occur,
                                initiate a dispute rather than filing a report.
                            </Box>
                        </Flex>

                        <FormControl>
                            <FormLabel>I want to report</FormLabel>
                            <Select placeholder='Select option' value={reportReason} onChange={handleSelectChange}>
                                <option value='slangs'>Using slangs</option>
                                <option value='rude'>Rude conversation</option>
                                <option value='audio'>Vulgar audio</option>
                                <option value='other'>Other</option>
                            </Select>
                        </FormControl>

                        {reportReason === 'other' && (
                            <FormControl>
                                <FormLabel>Please specify</FormLabel>
                                <Textarea
                                    placeholder='Please add details of the issue...'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </FormControl>
                        )}

                        <Flex direction={'column'} gap={2}>
                            <Box fontWeight={500} color={'red.500'} alignSelf={'self-start'}>
                                <em>Warning</em>: Submitting fake or incorrect reports may result in warnings or account restrictions.
                            </Box>
                            <Box color={'blue.600'} fontSize={'16px'} fontWeight={500}>
                                Do not use the Report button for disputes

                            </Box>
                        </Flex>
                    </ModalBody>

                    <ModalFooter bg={'gray.50'} borderBottomRadius={5} justifyContent={'space-between'}>
                        <Button variant={'outline'} onClick={onClose}>
                            Close
                        </Button>
                        <Button isLoading={isLoading} loadingText='Procced...' colorScheme='blue' onClick={handleReport}>
                            Acknowledge and Report
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Success Modal */}
            <Modal isOpen={successModal.isOpen} onClose={successModal.onClose} isCentered>
                <ModalOverlay />
                <ModalContent bg="green.50" borderRadius="md" boxShadow="xl">
                    <ModalHeader>
                        <Flex align="center" gap={2}>
                            <CheckCircleIcon color="green.500" boxSize={6} />
                            <Text color="green.700">Success</Text>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize="lg" fontWeight="500" color="green.600" textAlign="center">
                            Your report has been submitted successfully!
                        </Text>
                    </ModalBody>
                    <ModalFooter justifyContent="center">
                        <Text fontSize="sm" color="gray.500">"Thank you! Our team will be in touch shortly."</Text>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ReportBehaviour;

