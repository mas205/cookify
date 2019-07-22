import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import { connect } from 'react-redux'
import { addDish } from '../../actions'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      margin: '10em',
      marginTop: '0em',
      paddingTop: '64px'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    grid_header: {
        paddingBottom: '30px',
        textAlign: 'center'
    },
    grid_item: {
        paddingBottom: '15px',
        height: '350px',
        width: '100%',
        backgroundSize: 'cover'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const DishForm = (props) => {
    const classes = useStyles();

    const renderInput = ({ input, label, meta }) => {
        if (meta.error && meta.touched){
            return (
                <TextField
                    error
                    required
                    fullWidth
                    id="standard-error"
                    label={meta.error}
                    className={classes.textField}
                    margin="normal"
                    {...input}
                    style ={{width: '100%'}}
                    inputstyle ={{width: '100%'}}
                />
            )
        } else {
            return (
                <TextField
                    required
                    fullWidth
                    id="standard-error"
                    label={label}
                    className={classes.textField}
                    margin="normal"
                    {...input}
                    style ={{width: '100%'}}
                    inputstyle ={{width: '100%'}}
                />
            )
        }
        
    }

    const renderSwitchInput = ({ input, meta }) => { 
        return (
            <Switch
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
                {...input}
            />
        );
    }

    const onSubmit = (values) => {
        alert("submited!");
        console.log(props);
        const val = values.public || false;
        const ing = values.ingredientes.split(",").map(e => e.trim())
        props.addDish({...values, clientId: props.clientId, public: val, ingredientes: ing});
    }

    return(
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" className={classes.title}>
                            ADD NEW RECIPE!
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <form onSubmit={props.handleSubmit(onSubmit)} className="ui form error">
                            <Field name="name" component={renderInput} label="Enter dish name"/><br />
                            <Field name="descripcion" component={renderInput} label="Enter dish description"/><br />
                            <Field name="ingredientes" component={renderInput} label="Enter ingridients(separated by commas)"/><br />
                            <Field name="imgUrl" component={renderInput} label="Enter dish image URL"/><br />
                            <Typography variant="h6" className={classes.title}>
                                Public:
                                <Field name="public" component={renderSwitchInput}/>
                            </Typography>
                            <Button variant="contained" className={classes.button} type="submit" >Submit</Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

const validate = (values) => {
    const errors = {};

    if (!values.title) {
        errors.title = "empty title";
    }

    if (!values.description) {
        errors.description = "empty description";
    }  

    if (!values.ingridients) {
        errors.ingridients = "empty ingridients";
    }  

    if (!values.imgUrl) {
        errors.imgUrl = "empty imgUrl";
    }  

    return errors;
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, clientId: state.auth.userId }
}


export default connect(mapStateToProps, { addDish })(
    reduxForm({
        form: 'dishCreate',
        validate
    })(DishForm)
)

/* tryouts
export default reduxForm({
    form: 'dishCreate',
    validate
})(DishForm); 
 // Decorate with reduxForm(). It will read the initialValues prop provided by connect() 
DishForm = reduxForm({ 
    form: 'dishCreate',
    validate // a unique identifier for this form 
})(DishForm) 
   
  // You have to connect() to any reducers that you wish to connect to yourself 
DishForm = connect(mapStateToProps, 
{ addDish } // bind account loading action creator 
)(DishForm) 
   
export default DishForm 
*/