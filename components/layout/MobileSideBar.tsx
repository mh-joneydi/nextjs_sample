import { Drawer, makeStyles, ModalProps } from "@material-ui/core";
import { memo } from "react";
import SideBar from "./SideBar";

export interface MobileSideBarProps {
    open: boolean,
    onClose: ModalProps['onClose']
}

const useStyle = makeStyles( theme=> ({
    MobileDrawer: {
        width: 280,
        height: '100%',
        padding: theme.spacing(1.5,0.5,1,2.5),
        backgroundColor: theme.palette.primary.main,
    }
}));

const MobileSideBar: React.FC<MobileSideBarProps> = ({open, onClose}) => {
    const classes = useStyle();
    return (
        <Drawer 
            open={open}
            onClose={onClose}
            anchor="left"
        >
            <div className={classes.MobileDrawer}>
                <SideBar />
            </div>
        </Drawer >
    );
}
 
export default memo(MobileSideBar);