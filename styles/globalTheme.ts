import { createTheme , alpha, responsiveFontSizes } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

// default Material-UI Theme
const defaultTheme = createTheme();

// costomized Theme 
const theme = createTheme({
    direction: 'rtl',
    // costomizing palette
    palette: {
      contrastThreshold: 2,
      tonalOffset: 0.09,
      background: {
        default: '#f2f6f9'
      },
      primary: {
        main: '#3f51b5'
      },
      secondary: {
        main: '#f50057'
      },
      info: {
        main: '#2196f3'
      },
      error: {
        main: '#e5082e'
      },
      text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)'
      },
      divider: 'rgba(0, 0, 0, 0.08)',
      action: {
        disabled: 'rgba(0,0,0, 0.25)',
        disabledBackground: 'rgba(0,0,0, 0.09)',
        // hover: 'rgba(0,0,0, 0.2)'
      }
    },
    shadows: [
      'none',
      '0px 10px 26px 0 #2d387507',
      '0px 10px 27px 0 #2d387508',
      '0px 10px 28px 0 #2d387509',
      '0px 10px 29px 0 #2d387510',
      '0px 10px 30px 0 #2d387511',
      '0px 10px 31px 0 #2d387512',
      '0px 10px 32px 0 #2d387513',
      '0px 10px 32px 0 #2d387514',
      '0px 10px 32px 0 #2d387515',
      '0px 10px 32px 0 #2d387516',
      '0px 10px 32px 0 #2d387517',
      '0px 10px 32px 0 #2d387518',
      '0px 10px 32px 0 #2d387519',
      '0px 10px 32px 0 #2d387520',
      '0px 10px 32px 0 #2d387521',
      '0px 10px 32px 0 #2d387522',
      '0px 10px 32px 0 #2d387523',
      '0px 10px 32px 0 #2d387524',
      '0px 10px 32px 0 #2d387525',
      '0px 10px 32px 0 #2d387526',
      '0px 10px 32px 0 #2d387527',
      '0px 10px 32px 0 #2d387528',
      '0px 10px 32px 0 #2d387529',
      '0px 10px 32px 0 #2d387530',
    ],
    shape: {
      borderRadius: 14
    },
    // costomizing typography
    typography: {
      fontFamily: [
        'YekanBakh',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      h1: {
        fontWeight: 900,
        fontSize: "2.488rem",
      },
      h2: {
        fontWeight: 900,
        fontSize: "2.074rem",
      },
      h3: {
        fontWeight: 900,
        fontSize: "1.728rem",
      },
      h4: {
        fontWeight: 700,
        fontSize: "1.44rem",
      },
      h5: {
        fontWeight: 700,
        fontSize: "1.15rem",
      },
      h6: {
        fontWeight: 700,
        fontSize: "1rem",
      },
      subtitle1: {
        fontSize: "0.89rem",
      },
      subtitle2: {
        fontSize: "0.82rem",
      },
      body1: {
        fontSize: "0.89rem",
      },
      body2: {
        fontSize: "0.82rem",
      },
      button: {
        fontWeight: 700
      }
    },
    // costomizing Material-UI components & modify Global styles
    overrides: {
      MuiDivider: {
        light: {
          backgroundColor: 'rgba(255, 255, 255, 0.08)'
        },
      },
      MuiTableCell: {
        root: {
          borderBottom: 'none'
        },
        stickyHeader: {
          right: 0,
          left: 'unset'
        }
      },
      MuiFormControlLabel: {
        root: {
          marginRight: -11,
          marginLeft: 16
        },
        label: {
          userSelect: 'none'
        }
      },  
      MuiFormHelperText: {
        root: {
          textAlign: 'center'
        }
      },
      MuiInputBase: {
        root: {
          boxShadow: '0px 10px 27px 0 #2d387508'
        }
      },
      MuiButton: {
        startIcon: {
          marginRight: 4,
        },
        endIcon: {
          marginLeft: 4
        }
      },
      MuiCssBaseline: {
        '@global': {
          'html': {
            scrollBehavior: 'smooth'
          },
          'html, body': {
            direction: 'rtl'
          },
          '.MuiFormControl-root:not([dir="ltr"]) .MuiFormLabel-root' : {
            left: 'unset',
            right: 0,
          },
          '.MuiFormControl-root:not([dir="ltr"]) .MuiInputLabel-outlined' : {
            transform: 'translate(-14px, 20px) scale(1)'
          },
          '.MuiFormControl-root:not([dir="ltr"]) .MuiInputLabel-outlined.MuiInputLabel-shrink' : {
            transform: 'translate(2px, -6px) scale(0.75)'
          },
          '.MuiFormControl-root:not([dir="ltr"]) legend' : {
            textAlign: 'right'
          },
          '#root': {
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexFlow: 'column wrap',
          },
          '*':{
            "scrollbarColor": `${alpha(grey[500], 0.4 )} transparent`,
            "scrollbarWidth": 'thin',
          },
          '*::-webkit-scrollbar': {
            width: '4px',
            height: '4px'
          },
          '*::-webkit-scrollbar-thumb': {
              backgroundColor: alpha(grey[500], 0.4 ),
              borderRadius: 5
          },
          '*::-webkit-scrollbar-thumb:hover': {
              backgroundColor: alpha(grey[600], 0.4 )
          },
          '*::-webkit-scrollbar-thumb:active': {
            backgroundColor: alpha(grey[800], 0.4 )
          }
        }
      }
    },
})

console.log('defalut: ',defaultTheme)
console.log('costomized: ', theme)

export default responsiveFontSizes(theme);