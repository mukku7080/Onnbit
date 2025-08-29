import React from 'react'
import { Card, CardBody, Heading, Box, Button, Image } from '@chakra-ui/react'
import { RiArrowRightDoubleLine } from "react-icons/ri";


const ProductsCard1 = ({ title, txt, img }) => {
    return (

        <Card minH={'253px'} w={{ sm: '50%', md: '100%' }} borderTop={'1px solid #f7a600'} >
            <CardBody display={'flex'} flexDirection={'row'} gap={10} >
                <Box display={'flex'} flexDirection={'column'} gap={10}>

                    <Heading size={'lg'} color={'gray'}>{title}</Heading>
                    <Box as='p' maxW={'344px'} minH={'50px'}>
                        {txt}

                    </Box>
                    <Button color={'#f7a600'} bg={'#f7a6001f'} size={'md'} borderRadius={'32px'} width={'100px'} rightIcon={<RiArrowRightDoubleLine />}>Details</Button>
                </Box>
                <Box display={'flex'} justifyContent={'center'} >
                    <Image src={img} maxH={'150px'} maxW={'150px'}></Image>

                </Box>

            </CardBody>
        </Card>
    )
}

export default ProductsCard1





