import { makeStyles, Typography, TypographyProps } from "@material-ui/core";
import React from "react";

export type TextColor = 'primary.light'
|'primary.main'
|'primary.dark'
|'secondary.light'
|'secondary.main'
|'secondary.dark'
|'success.light'
|'success.main'
|'success.dark'
|'error.main'
|'error.light'
|'error.dark'
|'warning.light'
|'warning.main'
|'warning.dark'
|'info.light'
|'info.main'
|'info.dark'
|'common.white'
|'common.black'
|'text.primary'
|'text.secondary'
|'text.disabled'
|'text.hint';

 type OwnProps = {
    color?: TextColor ,
    fontFamily?: 'YekanBakh'|
    '-apple-system'|
    'BlinkMacSystemFont'|
    '"Segoe UI"'|
    'Roboto'|
    '"Helvetica Neue"'|
    'Arial'|
    'sans-serif'|
    '"Apple Color Emoji"'|
    '"Segoe UI Emoji"'|
    '"Segoe UI Symbol"',
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
}

type TextProps = Omit<TypographyProps, 'color'> & OwnProps;

const useStyle = makeStyles<any>( theme=> ({
    TextRoot: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: ({ fontFamily }: TextProps)=> fontFamily || theme.typography.fontFamily,
        color: ({color}: TextProps)=>{
            if(color) {
                const colorType = color.split(".")
                return theme.palette[colorType[0]][colorType[1]]
            }
            return theme.palette.text.primary;
        },
        '& svg': {
            fontSize: 'inherit'
        }
    },
    startIcon: {
        display: 'inherit',
        marginLeft: 4,
        marginRight: -4
    },
    endIcon: {
        display: 'inherit',
        marginLeft: -4,
        marginRight: 4

    }
}));

const Text: React.FC<TextProps> = (props) => {
    const classes = useStyle(props);
    const {
        color, 
        children, 
        startIcon: StartIcon,
        endIcon: EndIcon, 
        ...otherProps} = props;
    return ( 
        <Typography  
            {...otherProps} 
            classes={{
                root: classes.TextRoot
            }} 
        >
            {
                StartIcon&& (
                    <span className={classes.startIcon}>
                        {StartIcon}
                    </span>
                )
            }
            {children}
            {
                EndIcon&& (
                    <span className={classes.endIcon}>
                        {EndIcon}
                    </span>
                )
            }
            
        </Typography>
     );
}
 
export default Text;