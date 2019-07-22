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
import { editDish } from '../../actions'

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

const DishEditForm = (props) => {
    const classes = useStyles();

    const renderInput = ({ input, label, meta }) => {
        return (
            <TextField
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

    const renderSwitchInput = ({ input, meta }) => { 
        console.log(props.dish)
        return (
            <Switch
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
                {...input}
            />
        );
    }

    const onSubmit = (values) => {
        const val = values.public || false;
        const nam = values.name || props.dish.name
        const ing = ""
        try {
            const ing = values.ingredientes.split(",").map(e => e.trim())
        } catch {
            const ing = props.dish.ingredientes
        }
        const img = values.imgUrl || props.dish.imgUrl
        const desc = values.descripcion || props.dish.descripcion
        if (props.clientId === props.dish.clientId) {
            alert("EDITADO!")
            props.editDish({...values, clientId: props.clientId, public: val, name: nam, ingredientes: ing, imgUrl: img, descripcion: desc});
        } else {
            alert("NO AUTORIZADO");
        }
    }

    const condRender = () => {
        if (props.dish) {
            return (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" className={classes.title}>
                                {props.dish.name}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <form onSubmit={props.handleSubmit(onSubmit)} className="ui form error" initialvalues={props.dish}>
                                <Field name="name" component={renderInput} label={props.dish.name} /><br />
                                <Field name="descripcion" component={renderInput} label={props.dish.descripcion} /><br />
                                <Field name="ingredientes" component={renderInput} label={props.dish.ingredientes} /><br />
                                <Field name="imgUrl" component={renderInput} label={props.dish.imgUrl} /><br />
                                <Typography variant="h6" className={classes.title}>
                                    Public:
                                    <Field name="public" component={renderSwitchInput}/>
                                </Typography>
                                <Button variant="contained" className={classes.button} type="submit" >Submit</Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            );
        } else {
            return ""
        }
    }

    return(
        <div className={classes.root}>
            {condRender()}
        </div>
    );
}


const mapStateToProps = (state, props) => {
    return { isSignedIn: state.auth.isSignedIn, clientId: state.auth.userId, dish: state.dishes.filter((dish) => parseInt(dish.id) === parseInt(props.match.params.id)).map((dish) => {
        return {...dish, ingredientes: dish.ingredientes.join(', ')}
    })[0] }
}


export default connect(mapStateToProps, { editDish })(
    reduxForm({
        form: 'dishEdit',
        enableReinitialize : true
    })(DishEditForm)
)
