import { Button } from '@material-ui/core'
import React from 'react'
import Btn from './customized/Btn'
import Text from './customized/Text'

function Test() {
    return (
        <div>
            <Text color='primary.main'>محمد حسین جنیدی</Text>
            <Btn variant='contained' color='info'>سلام</Btn>
        </div>
    )
}

export default Test
