import { Checkbox, IconButton, InputAdornment, makeStyles, Typography } from "@material-ui/core";
import { Container, FormControlLabel, Grid, TextField } from "@material-ui/core";
import { FC, useState } from "react";
import { reduxForm, Form, InjectedFormProps, Field } from "redux-form";
import Btn from "./customized/Btn";
import { useAppDispatch } from "store";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { closeDialog, login } from "actions";
import Router from "next/router";


export interface ILoginFormValues {
    username: string,
    password: string,
    remember: boolean
}

type LoginFormProps = InjectedFormProps<ILoginFormValues>;

const useStyle = makeStyles( theme=> ({
    FieldsContainer: {
        padding: theme.spacing(2,1)
    }
}));

const renderError = ({touched , error , submitFailed}: any)=> {
    if( submitFailed && touched && error ){
        return error;
    }
}

const RenderField = ({input , type , label , meta , ...props}: any)=> {
    const error = renderError(meta);
    return(
        <TextField
            fullWidth
            label={label}
            dir='ltr'
            variant='outlined'
            type={type}
            color='primary'
            required
            {...input}
            {...props}
            error={!!(error)}
            helperText={error}
        />
    )
}

const RenderCheckbox = ({input , label}: any) => {
    return(
        <FormControlLabel 
            control={<Checkbox{...input} />}
            label={label}
        />
    )
}

const LoginForm: FC<LoginFormProps> = ({ handleSubmit, submitting })=> {

    const classes = useStyle();
    const dispatch = useAppDispatch();
    const [showPass, setShowPass] = useState<boolean>(false);
    const onSubmit = async(formValues: ILoginFormValues) => {
        await dispatch<any>(login(formValues));
        dispatch( closeDialog() );
        Router.replace('/');
    }

    return (
        <Grid 
        container 
        spacing={3} 
        className={classes.FieldsContainer} 
        dir='rtl' 
        alignContent='center' 
        component={Form} 
        onSubmit={handleSubmit(onSubmit)} 
        noValidate>
            <Grid item xs={12}>
                <Field 
                    type="number"
                    label="شماره موبایل" 
                    name="username" 
                    component={RenderField} 
                />
            </Grid>
            <Grid item xs={12}>
                <Field 
                    type={showPass ? 'text' : 'password'} 
                    label="گذرواژه" 
                    name="password" 
                    InputProps={{
                        endAdornment: ( 
                        <InputAdornment position="end"> 
                            <IconButton onClick={() => setShowPass( pv => !pv )}>
                                {showPass ? <Visibility /> : <VisibilityOff />}  
                            </IconButton> 
                        </InputAdornment>
                        ),
                    }}
                    component={RenderField} 
                />
            </Grid>
            <Grid item container justifyContent='space-between' alignItems='center' >
                <Grid item>
                    <Field 
                        type="checkbox" 
                        label="مرا به خاطر بسپار" 
                        name="remember" 
                        component={RenderCheckbox} 
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}> 
                <Btn loading={submitting} variant='contained' color='primary' fullWidth size='large' type="submit" > 
                    ورود 
                </Btn>
            </Grid>
        </Grid>
    );
}

const validate = (formValues: ILoginFormValues) => {
    const errors: any = {}
    if(!formValues.username){
        errors.username = 'نام کاربری خود را وارد کنید'
    }
    if(formValues.username && ( formValues.username.length !== 11 || formValues.username.includes(' ') ) ){
        errors.username = 'شماره موبایل وارد شده معتبر نمیباشد'
    }
    if(!formValues.password){
        errors.password = 'گذرواژه خود را وارد کنید'
    }
    if(formValues.password && formValues.password.length < 3){
        errors.password = 'حداقل تعداد کاراکتر مورد قبول 4 کاراکتر میباشد'
    }
    if(formValues.password && formValues.password.includes(' ')){
        errors.password = 'استفاده از فاصله در گذرواژه مجاز نیست'
    }
    return errors;
}

export default reduxForm<ILoginFormValues>({
    form : 'login',
    validate
})(LoginForm);
