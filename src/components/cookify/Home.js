import React from 'react'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
    my_container: {
        paddingTop: '114px',
        height: '100vh',
        backgroundImage: 'url("https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")',
        backgroundColor: '#cccccc',
        backgroundSize: 'cover',
    },
    link: {
      textDecoration: 'none',
      color: 'black',
      outline: 'none'
    }
}));

const Home = (props) => {
    const classes = useStyles();

    const renderHome = () => {
        if (props.isSignedIn) {
            return (
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper className={classes.root}>
                            <Link to="/dishes" className={classes.link}>
                                <Typography variant="h5" component="h3">
                                    <span style={{paddingLeft: '1em'}} >My Dishes</span><span style={{float: 'right', paddingRight: '1em'}} >></span>
                                </Typography>
                            </Link>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.root}>
                            <Link to="/public_dishes" className={classes.link}>
                                <Typography variant="h5" component="h3">
                                    <span style={{paddingLeft: '1em'}} >&lt;</span><span style={{float: 'right', paddingRight: '1em'}} >Public Dishes</span>
                                </Typography>
                            </Link>
                        </Paper>
                    </Grid>
                </Grid>
            )
        } else if (!props.isSignedIn) {
            return (
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3">
                        Register your account to start planning you menu!
                    </Typography>
                    <Typography component="p">
                        Cookify is a tool for quick and simple menu creating experience, forget about looking around hours for recipes that fits your restaurant and a place to keep them, with this simple App you can create your menu, look for public recipes of others chefs and more!
                    </Typography>
                </Paper>
            )
        }
        return null;
    }


    return (
        <div>
            <Container className={classes.my_container} style={{maxWidth: '100vw'}}>
                {renderHome()}
            </Container>
        </div>
    );

}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, name: state.auth.userName }
}

export default connect(mapStateToProps)(Home);