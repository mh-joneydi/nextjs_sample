import { Button } from '@material-ui/core'
import { openDialog, showAlert } from 'actions'
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
            <Btn variant='contained'  color='warning' onClick={()=> { dispatch( openDialog({title: 'test', body: 'tesssst'}) ) }} >سلام خدمت همه دوستان</Btn>
        </div>
    )
}

export default Test
