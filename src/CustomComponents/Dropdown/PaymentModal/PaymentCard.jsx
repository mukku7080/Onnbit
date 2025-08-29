import {
    Card,
    CardBody,
    Flex,
    Image,
    Text,
    Box
} from "@chakra-ui/react";

export function PaymentCard({ name, icon: Icon, imgSrc, onClick }) {
    return (
        <Card
            onClick={onClick}
            cursor="pointer"
            _hover={{ bg: "gray.50" }}
            transition="background 0.2s"
        >
            <CardBody>
                <Flex align="center" gap={3}>
                    {imgSrc ? (
                        <Box boxSize="40px" borderRadius="full" overflow="hidden">
                            <Image src={imgSrc} alt={name} objectFit="cover" />
                        </Box>
                    ) : (
                        <Box as={Icon} boxSize="24px" />
                    )}
                    <Text fontWeight="medium">{name}</Text>
                </Flex>
            </CardBody>
        </Card>
    );
}
