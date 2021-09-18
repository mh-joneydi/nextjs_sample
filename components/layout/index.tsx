import { Divider, Grid, isWidthUp, makeStyles, withWidth, WithWidthProps } from "@material-ui/core";
import { useState } from "react";
import Header from "./Header";
import MobileSideBar from "./MobileSideBar";
import SideBar from "./SideBar"; 


const useStyle = makeStyles( theme => ({
    layout__container: {
        flexBasis: '100%',
        backgroundColor: theme.palette.primary.main,
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(2)
        },
    },
    layout__mainSection: {
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[23],
        padding: theme.spacing(1,2),
        [theme.breakpoints.up('md')]: {
            borderRadius: theme.shape.borderRadius + 12
        }   
    },
    layout__contentContainer: {
        flexGrow: 1,
        position: 'relative',
        margin: theme.spacing(1,0)
    },
    layout__contentContainer__content: {
        position: 'absolute',
        top: 0,
        left: 0,
        right:0,
        bottom: 0,
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: theme.spacing(3,2,1)
    },
    layout__desktopSidebar: {
        padding: theme.spacing(1,0.5,1,2.5)
    }
}));

const Layout: React.FC<WithWidthProps> = ({ width,children }) => {

    const classes = useStyle(),
    [openDrawer, setOpenDrawer] = useState(false),
    drawerToggler = ()=> { setOpenDrawer( prev=> !prev ) };

    return ( 
        <Grid container className={classes.layout__container}>
            { 
                isWidthUp('md', width!) ? (
                    <Grid item md={3} lg={2} className={classes.layout__desktopSidebar}>
                        <SideBar />
                    </Grid>
                ) : (
                    <MobileSideBar open={openDrawer} onClose={drawerToggler} />
                ) 
            }           
            <Grid item container direction='column' xs={12} md={9} lg={10} component='main' className={classes.layout__mainSection} >
                <Grid item >
                    <Header drawerToggler={drawerToggler} />
                </Grid>
                <Divider />
                <Grid item className={classes.layout__contentContainer}>
                    <div className={classes.layout__contentContainer__content}>
                        {children}
                    </div>
                </Grid>
            </Grid>
        </Grid>
     );
}
 
export default withWidth({ noSSR: true })(Layout);