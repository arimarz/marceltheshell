import React from 'react'
import {Box, Img} from '@chakra-ui/react'
import marceltitle from '../marceltitle.jpg'

function Header() {
    return (
        <Box w="100%" h="250px" position="relative">
        <Img src={marceltitle} alt="my image" w="100%" h="100%" objectFit="cover" />
    </Box>
    )
}

export default Header