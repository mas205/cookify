import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Button from '@material-ui/core/Button'
import { signIn, signOut } from '../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class GoogleAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false
        }
    }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '742637354079-1qbecf2bgir5ehk9gonpe70cv3vnibmv.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });

    }

    onAuthChange = (isSignedIn) => {
        const profile = this.auth.currentUser.get().getBasicProfile()
        if (isSignedIn) {
            this.props.signIn(profile.getId(), profile.getName());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    handleMenu = (event) => {
        this.setState({anchorEl: event.currentTarget, open: true});
    }

    handleClose = () => {
        this.setState({anchorEl: null, open: false});
    }

    renderAuthButtom() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <div>
                    <IconButton
                        aria-label="Account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                    >
                    <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={this.anchorEl || null}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={this.state.open}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleClose} disabled={true}>
                            {this.props.name}
                        </MenuItem>
                        <MenuItem onClick={this.handleClose}>
                            <Link to="/dishes" style={{outline: 'none', color: 'black', textDecoration: 'none'}}>My Dishes</Link>
                        </MenuItem>
                        <MenuItem onClick={this.handleClose}>
                            <Button color="inherit" onClick={this.onSignOutClick}>Logout</Button>
                        </MenuItem>
                    </Menu>
                </div>
            );
        } else {
            return (
                <Button color="inherit" onClick={this.onSignInClick}>Login</Button>
            );
        };
    }

    render() {
        return(
            <div>{this.renderAuthButtom()}</div>
        );
    }
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, name: state.auth.userName }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);