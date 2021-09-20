import { makeStyles, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "store";
import { closeAlert } from "actions";
import { IAlertInfo } from "reducers/slices/alertReducer";

const useStyle = makeStyles( theme=> ({
    alert: {
        width: 450,
        [theme.breakpoints.down('xs')]: {
            width: '90vw'
        },
        padding: theme.spacing(0.75,1.5),
        '& div.MuiAlert-icon': {
            marginRight: 0,
            marginLeft: '12px'
        },
        '& div.MuiAlert-action': {
            marginLeft: '-12px',
            marginRight: 'auto'
        }
    }
}));

const GlobalAlerts: React.FC = () => {
    const classes = useStyle(),
    { snackPack } = useAppSelector( state=> ({
        snackPack: state.alert
    })),
    [open, setOpen] = useState<boolean>(false),
    [messageInfo, setMessageInfo] = useState<IAlertInfo>(),
    afteExitHandler = () => setMessageInfo(undefined),
    dispacher = useDispatch(),
    handleClose = (event: Event, reason: any) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };
    useEffect(() => {
        if (snackPack.length && !messageInfo) {
          // Set a new snack when we don't have an active one
          setMessageInfo({ ...snackPack[0] });
          dispacher(closeAlert());
          setOpen(true);
        } else if (snackPack.length && messageInfo && open) {
          // Close an active snack when a new one is added
          setOpen(false);
        }
      }, [snackPack, messageInfo, open, dispacher]);

    const [vertical = 'top', horizontal = 'center'] = messageInfo?.anchorOrigin?.split('-') || [] as any[],
    message = messageInfo? messageInfo.message: '',
    severity = messageInfo?.severity || 'info',
    color = messageInfo?.color || severity,
    autoHideDuration = (messageInfo?.autoHide === false ) ? null : 3000;
    
    return ( 
        <Snackbar 
            open={open} 
            autoHideDuration={autoHideDuration}
            anchorOrigin={{ vertical, horizontal }}
            onClose={handleClose as any}
            TransitionProps={{ onExited: afteExitHandler }}
            key={messageInfo?.key}
        >
            <Alert 
                dir='rtl'
                severity={severity} 
                color={color} 
                variant='filled' 
                onClose={handleClose as any}
                className={classes.alert}
            >
                { message }
            </Alert>
        </Snackbar>
    );
}
 


export default GlobalAlerts;