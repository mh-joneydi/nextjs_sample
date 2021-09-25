import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import { memo, useMemo } from "react";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { useDispatch } from "react-redux";
import { useAppSelector } from "store";
import { logout } from "actions";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Router from "next/router";

export interface SideBarMenuProps {
    onClose: Function
}

export interface IMenuItem {
    title: string,
    icon: React.ReactElement,
    link: string
}

const useStyle = makeStyles(theme=> ({
    root: {
        padding: theme.spacing(2,0),
    },
    listIconRoot: {
        transition: 'all 170ms cubic-bezier(0.4, 0, 0.2, 1)',
        color: theme.palette.common.white,
        minWidth: 35,
        '& svg': {
            fontSize: 24,
        }
    },
    itemButton: {
        textAlign: 'right',
        color:  theme.palette.common.white,
        transition: 'all 170ms cubic-bezier(0.4, 0, 0.2, 1)',
        borderRadius: theme.shape.borderRadius+10,
        '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.04)'
        }
    },
    divider: {
        margin: theme.spacing(2,0)
    },
    selectedItem: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default+ '!important',
        '& .MuiListItemIcon-root': {
            color: theme.palette.primary.main
        },
    },
}));


const SideBarMenu: React.FC<SideBarMenuProps> = ({ onClose }) => {
    const classes= useStyle(),
    dispatch = useDispatch(),
    isUserLogin = useAppSelector( state=> state.user.isLogin );

    function setLogout() {
        onClose();
        dispatch(logout());
    }

    return (  
        <List className={classes.root}>
            <ListItem button onClick={()=> Router.push('/')} classes={{ selected: classes.selectedItem, button: classes.itemButton }}>
                <ListItemIcon classes={{ root: classes.listIconRoot }}>
                    <HomeOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="صفحه اصلی" />
            </ListItem>
            {
                isUserLogin&& (
                    <ListItem button onClick={setLogout} classes={{ selected: classes.selectedItem, button: classes.itemButton }}>
                        <ListItemIcon classes={{ root: classes.listIconRoot }}>
                            <ExitToAppRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="خروج از حساب کاربری" />
                    </ListItem>
                )
            }
        </List>
    );
};
 
export default memo(SideBarMenu);