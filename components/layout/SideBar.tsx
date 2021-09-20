import { Divider, makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Text from "components/customized/Text";
import { connect } from "react-redux";
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import { RootState } from "store";
import SideBarMenu from "./SideBarMenu";


const useStyle = makeStyles( theme=> ({
    sideBar__Container: {
        height: '100%',
    },
    sideBar__title: {
        height: 54,
        padding: theme.spacing(0,1,1.5)   
    },
    listContainer: {
        flexGrow: 1,
        overflowY: 'auto'
    }
}));

interface ISideBarProps {
    onClose: Function
}

const SideBar: React.FC<ISideBarProps> = ({ onClose }) => {
    const classes = useStyle();
    return ( 
        <Grid container direction='column' className={classes.sideBar__Container}>
            <Grid item container className={classes.sideBar__title} component='header'>
                <Text startIcon={ <EqualizerRoundedIcon /> } variant='h4' color='common.white'>
                   پنل مدیریت 
                </Text>
            </Grid>
            <Divider light />
            <Grid item className={classes.listContainer}>
                <SideBarMenu onClose={onClose} />
            </Grid>
        </Grid>
    );
}


export default SideBar;