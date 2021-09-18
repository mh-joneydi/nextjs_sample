import { AppBar, IconButton, makeStyles, Toolbar } from "@material-ui/core";
import { memo } from "react";
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import UserInfo from "./UserInfo";

interface HeaderProps {
    drawerToggler: any
}

const useStyle = makeStyles( theme=> ({
    toolbar: {
        height: 54,
        padding: theme.spacing(0,1,0.5)
    },
    drawerToggler: {
        marginLeft: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    }
}));

const Header: React.FC<HeaderProps> = ({drawerToggler}) => {
    const classes = useStyle();
    
    return (
        <AppBar position="static" color='transparent' elevation={0}>
            <Toolbar variant='dense' disableGutters className={classes.toolbar}>
                <IconButton onClick={drawerToggler} className={classes.drawerToggler}>
                    <MenuRoundedIcon />
                </IconButton>
                <UserInfo />
            </Toolbar>
        </AppBar>
    );
}
 
export default memo(Header);