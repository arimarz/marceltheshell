import React from 'react'
import {Box} from '@chakra-ui/react'
import marceltitle from '../marceltitle.jpg'

function Header() {
    return (
        <Box display='flex' >
            <img src={marceltitle} alt='Marcel Title'></img>
        </Box>
    )
}

export default Header