import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { addDish } from '../../actions'
import Icon from '@material-ui/core/Icon'


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

const PublicDishes = (props) => {
    const classes = useStyles();

    const renderAdd = (dish) => {
        if (props.isSignedIn) {
            return (
                <a href='/' onClick={(e) => {
                    e.preventDefault();
                    alert('Added to My Dishes');
                    props.addDish({...dish, clientId: props.clientId, public: false});
                 }}><Icon className={classes.icon} color="primary" style={{float: 'right'}}>add_circle </Icon></a>
            )
        }
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} className={classes.grid_header}>
            <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.title}>
                    Public Dishes
                </Typography>
            </Paper>
          </Grid>
          {props.dishes.map(dish => {
              return (
                <Grid item xs={12} className={classes.grid_item} style={{backgroundImage: `url(${dish.imgUrl})`}} key={dish.name}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" className={classes.title}>
                            {dish.name}
                            {renderAdd(dish)}
                        </Typography>
                    </Paper>
                </Grid>
              )
          })}
        </Grid>
      </div>
    );

}

const mapStateToProps = (state) => {
    return { dishes: state.dishes.filter((dish) => dish.public), isSignedIn: state.auth.isSignedIn, clientId: state.auth.userId }
}

export default connect(mapStateToProps, { addDish })(PublicDishes);