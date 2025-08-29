import { CardBody, Card, Image, Heading, Box, flexbox, Button } from '@chakra-ui/react'
import React from 'react'

const CardComponent = ({ img, title, txt, btntxt }) => {

  
  return (

    <Card maxW={'330px'} m={5} >
      <CardBody display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={4}>
        <Image src={img} maxH={'100px'} maxW={'100px'}></Image>
        <Heading size={'md'}>{title}</Heading>
        <Box as='p' fontSize={'14px'} maxW={'280px'} textAlign={'center'} minH={'84px'} display={'flex'} alignItems={'center'}>
          {txt}
        </Box>

        <Button bg={'#f7a600'}>{btntxt}</Button>

      </CardBody>
    </Card>

  )
}

export default CardComponent