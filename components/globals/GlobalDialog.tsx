import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from '@material-ui/core';
import Btn from 'components/customized/Btn';
import Text from 'components/customized/Text';
import React, { useCallback } from 'react';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { clearDialogPack, closeDialog } from 'actions';
import { IDialogInfo } from 'reducers/slices/dialogReducer';


const useStyle = makeStyles( theme=> ({
    content: {
        padding: theme.spacing(1.5,2.5),
    },
}))

const GlobalDialog: FC = ()=> {
    const [dialogInfo, setDialogInfo] = useState<IDialogInfo>(),
    dispacher = useAppDispatch(),
    { open, dialogPack } = useAppSelector( state=> state.dialog),
    handleClose = useCallback(() => {
        dispacher(closeDialog());
    }, [dispacher]),
    closeFirst = (callBack: Function)=> ()=>{
        callBack(); 
        handleClose();
    },
    afterCloseHandler = () => setDialogInfo(undefined),
    classes = useStyle();
    useEffect(() => {
        if (dialogPack.length && !dialogInfo) {
          setDialogInfo({ ...dialogPack[0] });
          dispacher(clearDialogPack());
        } else if (dialogPack.length && dialogInfo && open) {
            handleClose();
        }
    }, [dialogPack, dialogInfo, open, dispacher,handleClose]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth='xs'
            dir='rtl'
            key={dialogInfo?.key}
            TransitionProps={{ onExited: afterCloseHandler }}
        >
          {dialogInfo?.title&&(
            <DialogTitle disableTypography >
                <Text variant='h5'>{dialogInfo.title}</Text>
            </DialogTitle>
          )}
          {dialogInfo?.body&&
          <DialogContent className={dialogInfo.noAction?classes.content:''}>
            {typeof dialogInfo.body === 'string' ? (
                <DialogContentText>{dialogInfo.body}</DialogContentText>
            ):(
                React.cloneElement(dialogInfo.body)
            )}
          </DialogContent>}
          { !dialogInfo?.noAction&&
            <DialogActions>
                    <Btn 
                        onClick={dialogInfo?.onCancel?closeFirst(dialogInfo.onCancel):handleClose} 
                        color={dialogInfo?.cancelColor || 'primary'} 
                        size='small'
                    >
                        {dialogInfo?.cancelText || 'لغو'}
                    </Btn>
                { dialogInfo?.onOk&& 
                    <Btn 
                        onClick={closeFirst(dialogInfo.onOk)} 
                        color={dialogInfo.okColor || 'primary'}
                        size='small'
                    >
                        { dialogInfo.okText || 'قبول' }
                    </Btn>
                }
            </DialogActions>
          }       
      </Dialog>
    );
};

export default GlobalDialog;
