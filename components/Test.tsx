import { Button } from '@material-ui/core'
import { showAlert } from 'actions'
import React from 'react'
import { useAppDispatch } from 'store'
import Btn from './customized/Btn'
import Text from './customized/Text'

function Test() {
    const dispatch = useAppDispatch();
    return (
        <div>
            <Text color='primary.main'>محمد حسین جنیدی</Text>
            <br/>
            <br/>
            <Btn variant='contained'  color='warning' onClick={()=> { dispatch( showAlert({ message: 'سلام رفیق خوش اومدی' }) ) }} >سلام خدمت همه دوستان</Btn>
        </div>
    )
}

export default Test
