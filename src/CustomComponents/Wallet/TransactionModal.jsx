import { Box, Button, Circle, Divider, Flex, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsBoxArrowInUpRight, BsBoxArrowInDownRight } from "react-icons/bs";
import { MdContentCopy } from 'react-icons/md';

const TransactionModal = ({ isOpen, onClose, selectedTransaction }) => {
    const [copiedAddress, setCopiedAddress] = useState(false);
    const [copiedTrasactionId, setCopiedTransactionId] = useState(false);
    console.log(selectedTransaction, "selectedTransaction")
    const handleCopyAddress = (item) => {
        navigator.clipboard.writeText(item).then(() => {
            setCopiedAddress(true);
            setTimeout(() => {
                setCopiedAddress(false);
            }, 2000);
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleCopyTransaction = (item) => {
        navigator.clipboard.writeText(item).then(() => {
            setCopiedTransactionId(true);
            setTimeout(() => {
                setCopiedTransactionId(false);
            }, 2000);
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            {
                selectedTransaction &&

                <Modal key={selectedTransaction.txn_id} isOpen={isOpen} onClose={onClose} isCentered size={'lg'} >
                    <ModalContent>
                        <ModalHeader bg={'gray.50'} borderTopRadius={5}>
                            Transaction Details
                            <ModalCloseButton onClick={onClose} />
                        </ModalHeader>
                        <ModalBody bg={'transparent'}>
                            <Flex direction={'column'} gap={7} mt={5}>
                                <Flex gap={2} direction={'column'} alignSelf={'center'}>
                                    <Circle bg={'orange'} p={5}>
                                        {
                                            selectedTransaction.method === 'receive' ? <BsBoxArrowInDownRight size={20} /> : <BsBoxArrowInUpRight size={20} />
                                        }
                                    </Circle>
                                    <Flex direction={'column'}>
                                        <Box fontWeight={500} >{selectedTransaction.method === 'receive' ? "Received" : 'Send'}</Box>

                                    </Flex>
                                </Flex>
                                <Flex alignselectedTransactions={'center'} justifyContent={'center'}>
                                    {`send to ${selectedTransaction.to_address}`}
                                </Flex>

                                <Divider />



                                <Flex justifyContent={'space-between'}>
                                    <Box fontWeight={500}>Time :</Box>
                                    <Box>{new Date(Number(selectedTransaction.date_time) * 1000).toLocaleString('en-GB')}</Box>

                                </Flex>
                                <Flex justifyContent={'space-between'}>
                                    <Box fontWeight={500}>Status :</Box>
                                    <Box borderRadius={5} p={1} bg={'gray.50'} border={'1px solid #dcdcdc'}>{selectedTransaction.status}</Box>
                                </Flex>
                                <Flex justifyContent={'space-between'}>
                                    <Box fontWeight={500}>Fee :</Box>
                                    <Box>{selectedTransaction.transfer_fee}</Box>
                                </Flex>
                                <Flex justifyContent={'space-between'}>
                                    <Box fontWeight={500}>Transaction link :</Box>
                                    <Flex gap={1} as={Link} _hover={{ textDecoration: 'underline' }} color={'orange.400'} >
                                        View in Blockchain
                                        <Box mt={1} color={'orange.400'}>
                                            <BsBoxArrowInUpRight />
                                        </Box>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent={'space-between'} direction={'column'} gap={2}>
                                    <Box fontWeight={500}>Address :</Box>
                                    <Flex borderRadius={5} border={'1px solid #dcdcdc'} direction={'column'} bg={'gray.50'} p={2} gap={2}>
                                        <Box w={'full'}>

                                            {selectedTransaction.to_address}
                                        </Box>
                                        <Tooltip label={copiedAddress ? "Copied!" : "Copy to clipboard"} bg={'gray.100'} color={'black'} closeDelay={500} >
                                            <Box alignSelf={'end'} mt={1} cursor={'pointer'} onClick={() => handleCopyAddress(selectedTransaction.to_address)}>

                                                <MdContentCopy />

                                            </Box>
                                        </Tooltip>

                                    </Flex>
                                </Flex>

                                <Flex justifyContent={'space-between'} direction={'column'} gap={2}>
                                    <Box fontWeight={500}>Transaction hash ID :</Box>
                                    <Flex borderRadius={5} bg={'gray.50'} direction={'column'} border={'1px solid #dcdcdc'} p={2} gap={2} >
                                        <Box as='span' w={'full'}>

                                            <Box as='span'>
                                                {selectedTransaction.txn_hash_id}

                                            </Box>
                                        </Box>
                                        <Tooltip label={copiedTrasactionId ? "Copied!" : "Copy to clipboard"} bg={'gray.100'} color={'black'} closeDelay={500} >
                                            <Box alignSelf={'end'} mt={1} onClick={() => handleCopyTransaction(selectedTransaction.txn_hash_id)}>

                                                <MdContentCopy />
                                            </Box>
                                        </Tooltip>
                                    </Flex>
                                </Flex>

                            </Flex>


                        </ModalBody>
                        <ModalFooter>
                            <Button className='btn btn-primary' onClick={onClose}>Close</Button>


                        </ModalFooter>
                    </ModalContent>
                </Modal>
            }
        </>
    )
}

export default TransactionModal