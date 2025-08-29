import { Box, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import SecurityQuestionForm from './SecurityQuestionForm'

const SecurityQuestion = () => {
    return (
        <>
            <Flex direction={'column'} gap={5} >
                <Heading>Set Security Questions</Heading>
                <Box as='p' >Remember these answers as they’ll help us confirm your identity.</Box>
                <SecurityQuestionForm />

            </Flex>

        </>
    )
}

export default SecurityQuestion