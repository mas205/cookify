import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'
import { deleteDish } from '../../actions'

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
  }
}));

const renderContent = (classes, props) => {
    console.log(props.dishes.length)
    if (props.isSignedIn) {
        if (props.dishes.length > 0) {
            return (
                <div className={classes.root}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} className={classes.grid_header}>
                            <Paper className={classes.paper}>
                                <Typography variant="h5" className={classes.title}>
                                    My Dishes
                                    <Link to="/dishes/new"><Icon className={classes.icon} color="primary" style={{float: 'right'}}>add_circle</Icon></Link>
                                </Typography>
                            </Paper>
                        </Grid>
                        {props.dishes.map(dish => {
                            return (
                            <Grid item xs={12} className={classes.grid_item} style={{backgroundImage: `url(${dish.imgUrl})`}} key={dish.name}>
                                <Paper className={classes.paper}>
                                    <Typography variant="h6" className={classes.title}>
                                        {dish.name}
                                        <Link to={`/dishes/edit/${dish.id}`}><Icon className={classes.icon} color="primary" style={{float: 'right'}}>edit</Icon></Link>
                                        <a href='/' onClick={(e) => {
                                            e.preventDefault();
                                            props.deleteDish(dish);
                                         }}><Icon className={classes.icon} color="primary" style={{float: 'right'}}>delete_icon </Icon></a>
                                    </Typography>
                                </Paper>
                            </Grid>
                            )
                        })}
                    </Grid>
                </div>
            )
        } else {
            return (
                <div className={classes.root}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Typography variant="h5" className={classes.title}>
                                    0 DISHES FOUND - PLEASE ADD NEW
                                    <Link to="/dishes/new"><Icon className={classes.icon} color="primary" style={{float: 'right'}}>add_circle</Icon></Link>
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            )
        }
    } else {
        return (
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={12} className={classes.grid_header}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" className={classes.title}>
                                404 - LOGIN REQUIRED
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const Dishes = (props) => {
    const classes = useStyles();

    return (
        <div>
            {renderContent(classes, props)}
        </div>
    )

}

const mapStateToProps = (state) => {
    return { dishes: state.dishes.filter((dish) => dish.clientId === state.auth.userId), isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { deleteDish })(Dishes);