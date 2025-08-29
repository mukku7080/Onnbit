import { Card, CardBody, Heading, Box, Button, Circle, Icon, Image } from '@chakra-ui/react'
import React, { useState } from 'react';
import { RiArrowRightDoubleLine } from "react-icons/ri";

const ProductsCard = ({ title, txt }) => {
    const [isHover, setHover] = useState(false);
    return (

        <Card minH={'204px'} w={{ sm: '50%', md: '100%' }} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <CardBody display={'flex'} flexDirection={'column'} gap={5} >
                <Heading size={'md'} color={'gray'}>{title}</Heading>
                <Box as='p' maxW={'234px'} minH={'50px'}>
                    {txt}
                </Box>



                {isHover ?

                    <Button color={'#f7a600'} bg={'#f7a6001f'} size={'md'} borderRadius={isHover ? '32px' : 'full'} width={'100px'} rightIcon={<RiArrowRightDoubleLine />}>{isHover ? "check" : ""} </Button>
                    :
                    <Box>

                        <Circle bg={'#f5f7fa'} color={'#f7a600'} size={10}>
                            <Icon as={RiArrowRightDoubleLine}></Icon>
                        </Circle>
                    </Box>


                }




            </CardBody>
        </Card>
    )
}



export default ProductsCard