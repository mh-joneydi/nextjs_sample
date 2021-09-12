import { CircularProgress, Fade, makeStyles } from "@material-ui/core";
import React from "react";

type sizes = 'small' | 'medium' | 'large';

export function setSize(size: sizes): number {
    switch (size) {
        case 'large':
            return 35
        case 'small':    
            return 25
        default:
            return 30
    }
}

export interface SpinProps {
    spinning?: boolean,
    size?: sizes,
    indicator?: React.ReactNode,
}
 
const useStyle = makeStyles( theme=> ({
    spinContainer: {
        position: 'relative'
    },
    childrenWrapperContainer: {
        position: 'relative',
        transition: `all 250ms ${theme.transitions.easing.easeInOut}`,
        opacity: 1,
        '&::after': {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 10,
            height: '100%',
            background: theme.palette.common.white,
            opacity: 0,
            transition: `all 250ms ${theme.transitions.easing.easeInOut}`,
            content: '""',
            pointerEvents: 'none',
        }
    },
    spin: {
        opacity: 0.5,
        userSelect: 'none',
        pointerEvents: 'none',
        '&::after': {
            opacity: 0.3,
            pointerEvent: 'auto'
        }
    },
    indicatorContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 4,
        opacity: 1,
        display: 'block',
        width: '100%',
        height: '100%',
        maxHeight: 400,
    },
    indicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    }
}));

const Spin: React.FC<SpinProps> = ({
    spinning = true,
    size ='medium',
    indicator = <CircularProgress thickness={4} size={setSize(size)}/>,
    children,
    ...props
}) => {
    const classes = useStyle();
    return (
        <div className={classes.spinContainer} >
            <Fade in={spinning}>
                <div className={classes.indicatorContainer}>
                    <div className={classes.indicator}>
                        {indicator as JSX.Element}
                    </div>
                </div>
            </Fade>
            <div className={`${classes.childrenWrapperContainer} ${spinning?classes.spin:''}`}>
                {children}
            </div>
        </div>
    );
}
 
export default Spin;