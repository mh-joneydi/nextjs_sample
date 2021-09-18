import { alpha, Avatar, Grid, makeStyles } from "@material-ui/core";
import Text from "components/customized/Text";
import { useEffect, useMemo } from "react";
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import { connect, useDispatch } from "react-redux";
import { RootState } from "store";
// import { getUserProfile } from "store/actions";


const useStyle = makeStyles(theme=> ({
    root: {
        width: 'max-content',
        marginRight: 'auto',
    },
    avatar: {
        background: alpha(theme.palette.primary.light, 0.4),
        width: 32,
        height: 32,
        boxShadow: theme.shadows[3]
    }
}))

const UserInfo: React.FC = () => {
    const classes = useStyle();
    // dispatcher = useDispatch(),
    // profileImage = useMemo(()=> {
    //     // return userInfo?.ImageName===null
    //     // ? (<Avatar className={classes.avatar}><UserIcon fontSize={'1.15rem'} /></Avatar>)
    //     // : (<Avatar className={classes.avatar} src={`${baseURLs.UserImage}/${userInfo?.ImageName}`} />)
    // }, [userInfo?.ImageName,classes.avatar]);

    // useEffect(()=> {
    //     dispatcher(getUserProfile());
    // }, []);

    return ( 
        <Grid container dir='ltr' alignItems='center' className={classes.root} spacing={1}>
            <Grid item>
                {/* {profileImage} */}
            </Grid>
            <Grid item>
                <Text variant='body2' fontFamily='"Segoe UI"'>
                    {/* {userInfo?.UserName} */}
                </Text>
            </Grid>
        </Grid>
    );
}

export default UserInfo;