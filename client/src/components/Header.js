import React from 'react'
import {Box, Img} from '@chakra-ui/react'
import marceltitle from '../marceltitle.jpg'

function Header() {
    return (
        <Box w="100%" h="400px" position="relative" bg='#f3eeea' border="7px solid #d09aa4">
        <Img src={marceltitle} alt="my image" w="100%" h="100%" objectFit="contain" />
    </Box>
    )
}

export default Header