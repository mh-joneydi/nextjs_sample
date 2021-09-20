import { alpha, Avatar, Grid, makeStyles } from "@material-ui/core";
import Text from "components/customized/Text";
import {  useAppDispatch, useAppSelector } from "store";
import { openDialog } from "actions";
import LoginForm from "components/LoginForm";
import baseURLs from "utility/constants/domain";
import Btn from "components/customized/Btn";
import { useMemo } from "react";


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
    const classes = useStyle(),
    dispatch = useAppDispatch(),
    { isLogin, userInfo } = useAppSelector( state=> state.user),
    // dispatcher = useDispatch(),
    profileImage = useMemo(()=> {
        return userInfo?.imageName===null
        ? (<Avatar className={classes.avatar} />)
        : (<Avatar className={classes.avatar} src={`${baseURLs.UserImage}/${userInfo?.imageName}`} />)
    }, [userInfo?.imageName,classes.avatar]);

    // useEffect(()=> {
    //     dispatcher(getUserProfile());
    // }, []);

    function showLoginForm() {
        dispatch(openDialog({
            title: 'ورود به حساب کاربری',
            body: <LoginForm />,
            noAction: true
        }))
    }

    return ( 
        <Grid container dir='ltr' alignItems='center' className={classes.root} spacing={1}>
            {
                isLogin
                ? (
                    <>
                        <Grid item>
                            {profileImage}
                        </Grid>
                        <Grid item>
                            <Text variant='body2'>
                                {`${userInfo?.firstName} ${userInfo?.lastName}`}
                            </Text>
                        </Grid>
                    </>
                )
                :<Btn color='primary' onClick={showLoginForm}>ورود به حساب کاربری</Btn>
            }
        </Grid>
    );
}

export default UserInfo;