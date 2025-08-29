import { Center, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import ProductsCard from '../Cards/ProductsCard'
import ProductsCard1 from '../Cards/ProductsCard1'

const Section3 = () => {
    return (

        <>

            <Grid templateColumns={{ sm: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }} gap={{ base: 10, sm: '10', md: 10, lg: 6 }} mb={{ base: 10, sm: '10', md: 10, lg: 6 }} >
                {
                    data.map((pdata, index) => (
                        <GridItem
                            key={index}
                            display={'flex'}
                            justifyContent={'center'}
                            sx={{
                                "@media screen and (max-width: 875px)": {
                                    display: 'none'

                                }
                            }}

                        >

                            <ProductsCard1
                                title={pdata.title}
                                txt={pdata.txt}
                                img={pdata.img}
                            />
                        </GridItem>
                    ))
                }
                {
                    data.map((pdata, index) => (
                        <GridItem
                            key={index}
                            display={'flex'}
                            justifyContent={'center'}
                            sx={{
                                "@media screen and (min-width: 875px)": {
                                    display: 'none'

                                }
                            }}>

                            <ProductsCard
                                title={pdata.title}
                                txt={pdata.txt}
                            />
                        </GridItem>
                    ))
                }
            </Grid>

            <Grid templateColumns={{ md: 'repeat(2,1fr)', lg: 'repeat(4,1fr)' }} gap={{ base: 10, sm: '10', md: 10, lg: 6 }}>

                {
                    tradingFeatures.map((tdata, index) => (

                        <GridItem key={index} display={'flex'} justifyContent={'center'}>
                            <ProductsCard title={tdata.title} txt={tdata.txt} />
                        </GridItem>
                    ))
                }


            </Grid>
        </>
    )
}

const tradingFeatures = [
    {
        title: "Copy Trading",
        txt: "Boost your earnings by copying top traders or leading trades yourself!",
    },
    {
        title: "Trading Bot",
        txt: "Automate your trades with Grid Bot, Futures Combo Bot, DCA Bot, and more!",
    },
    {
        title: "TradeGPT",
        txt: "Trade smarter with AI-driven data analysis and market insights.",
    },
    {
        title: "Cryptico Web3",
        txt: "Navigate the Web3 landscape with The industry-leading reliability.",
    }
];


const data = [
    {
        title: "Crypto Card",
        txt: "Up to 10% Cashback, 8% APR, VIP Privileges & More!",
        img: "https://www.bybitglobal.com/common-static/fhs/bybit-home-new/spotlight/Card-1745f92e4ce488e1ecb5fa8f418091f1.png?quality=70&format=webp&resize=width/240"
    },
    {
        title: "Crypto Earn",
        txt: "Grow and manage your assets with reliable and flexible offerings.",
        img: "https://www.bybitglobal.com/common-static/fhs/bybit-home-new/spotlight/MoneyBag-0501fee3f116e2ffdcd0620f4d5fd8be.png?quality=70&format=webp&resize=width/240"
    }
];

export default Section3

