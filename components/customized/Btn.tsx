import { ButtonProps, createTheme, makeStyles, MuiThemeProvider, useTheme, CircularProgress } from "@material-ui/core";
import { Button } from "@material-ui/core";
import globalTheme from "styles/globalTheme";

const useStyle = makeStyles<any>( theme=> ({
    disabled: ({color,variant}: BtnProps)=>{
        
        if(variant!=='contained') return {};

        if( !color || color==='default' ) {
            return {
                opacity: '0.35'
            }
        }
        return {
            backgroundColor: theme.palette[color].main+' !important',
            color: '#fff !important',
            opacity: '0.35'
        }
    },
    root: {
        transition: `background-color 250ms ${theme.transitions.easing.easeInOut} 
        0ms,box-shadow 250ms ${theme.transitions.easing.easeInOut} 
        0ms,border 250ms ${theme.transitions.easing.easeInOut} 
        0ms,opacity 250ms ${theme.transitions.easing.easeInOut}`
    }
}));

export type BtnColor = 'primary'|'secondary'|'error'|'success'|'warning'|'info'|'default';

type OwnProps = {
    loading?: boolean,
    color?: BtnColor
}

type BtnProps = Omit<ButtonProps, 'color'> & OwnProps;


const Btn: React.FC<BtnProps> = (props) => {
    const classes = useStyle(props),
    {loading,
    color = 'default',
    disabled,
    children,
    dir='ltr',
    endIcon,
    startIcon,
    ...otherProps} = props,
    customTheme = createTheme({ 
        ...globalTheme,
        palette: { 
            ...globalTheme.palette,
            primary: { 
                main: color==='default'? (otherProps.variant === 'contained' ? '#fff': globalTheme.palette.text.secondary) : globalTheme.palette[color].main ,
                contrastText: color==='default'? globalTheme.palette.text.secondary :'#fff'
            }
    }});

    return (
        <MuiThemeProvider theme={customTheme}>
            <Button 
                {...otherProps as ButtonProps} 
                classes={{ 
                    root: classes.root,
                    disabled: classes.disabled
                }} 
                dir={dir}
                disabled={loading||disabled} 
                color='primary'
                endIcon={startIcon}
                startIcon={endIcon}
            >
                {
                    loading&& <CircularProgress color='inherit' thickness={4} size={16} style={{ marginRight: 8 }} />
                }
                {children}
            </Button>
        </MuiThemeProvider>
    )
}
 
export default Btn