import React, { useState } from "react";
import { Box, FormControl, FormLabel, Select, Input, VStack, Flex, Button, FormErrorMessage, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useOtherDetail } from "../../Context/otherContext";

const securityQuestions = [
    "What is your pet's name?",
    "What is your mother's maiden name?",
    "What was your first car?",
    "What city were you born in?",
    "What is your favorite food?"
];
const validationSchema = Yup.object({
    question0: Yup.string().required("Please select a question1"),
    question1: Yup.string().required("Please select a question2"),
    question2: Yup.string().required("Please select a question3"),
    answer0: Yup.string().required("Answer1 is required"),
    answer1: Yup.string().required("Answer2 is required"),
    answer2: Yup.string().required("Answer3 is required"),
});




const SecurityQuestionForm = () => {

    const [isLoading, setLoading] = useState();
    const toast = useToast();

    const { handleSecurityQuestions } = useOtherDetail()
    const [selectedQuestions, setSelectedQuestions] = useState(["", "", ""]);
    const [answers, setAnswers] = useState(["", "", ""]);

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...selectedQuestions];
        newQuestions[index] = value;
        setSelectedQuestions(newQuestions);
    };

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const getAvailableQuestions = (index) => {
        return securityQuestions.filter((q) => !selectedQuestions.includes(q) || selectedQuestions[index] === q);
    };


    const formik = useFormik({
        initialValues: {
            question0: "",
            question1: "",
            question2: "",
            answer0: "",
            answer1: "",
            answer2: "",

        },
        validationSchema,

        onSubmit: async (values, actions) => {
            try {
                setLoading(true);
                const res = await handleSecurityQuestions(values);
                if (res.status === true) {
                    toast({
                        title: "Security Questions Added Successfully",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                        position: 'top-right'
                    })
                }
            }
            catch (error) {
                toast({
                    title: "Error",
                    status: "error",
                    description:error.message,
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right'
                })
                throw error;
            }
            finally {
                setLoading(false);
                actions.resetForm();

            }
        }
    });

    return (
        <Box mt={5} p={5} borderRadius="md">
            <Flex direction={'column'} gap={5}>
                <form onSubmit={formik.handleSubmit}>

                    {selectedQuestions.map((question, index) => (
                        <Flex gap={5} flexWrap={{ base: 'wrap', md: 'nowrap' }} mb={5}  >
                            <FormControl key={index} isInvalid={formik.touched[`question${index}`] && formik.errors[`question${index}`]}>
                                <FormLabel>Security Question {index + 1}</FormLabel>

                                <Select

                                    name={`question${index}`}
                                    placeholder="Select a security question"
                                    // {...formik.getFieldProps(`question${index}`)}
                                    value={formik.values[`question${index}`]}
                                    onChange={(e) => {
                                        handleQuestionChange(index, e.target.value);
                                        formik.handleChange(e);
                                    }}
                                // onChange={formik.handleChange}
                                >
                                    {getAvailableQuestions(index).map((q, i) => (
                                        <option key={i} value={q}>{q}</option>
                                    ))}
                                </Select>
                                <FormErrorMessage>{formik.errors[`question${index}`]}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={formik.touched[`answer${index}`] && formik.errors[`answer${index}`]}>
                                <FormLabel>{`Answer${index + 1}`}</FormLabel>

                                <Input
                                    name={`answer${index}`}

                                    placeholder="Your answer"
                                    // value={answers[index]}
                                    value={formik.values[`answer${index}`]}

                                    {...formik.getFieldProps(`answer${index}`)}
                                    onChange={(e) => {
                                        handleAnswerChange(index, e.target.value);
                                        formik.handleChange(e);
                                    }}
                                // onChange={formik.handleChange}
                                />
                                <FormErrorMessage>{formik.errors[`answer${index}`]}</FormErrorMessage>
                            </FormControl>
                        </Flex>
                    ))}
                    <Button isLoading={isLoading} loadingText='loading...' type="Submit" colorScheme="orange" variant={'outline'} w={'150px'}>Save Answers</Button>
                </form>
            </Flex>
        </Box>
    );
};

export default SecurityQuestionForm;
