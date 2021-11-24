import React, { useEffect, useRef, useState } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from "../redux/actions/authActions";
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));


export default function UserMenu() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)


    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    let history = useHistory();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };



    function handleClose() {
        setAnchorEl(null);
      }
      
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const handleSignIn = () => {
        history.push('/signIn');
    }

    const handleSignUp = () => {
        history.push('/signUp');
    }

    const handleLogout = () => {
        history.push('/');
        dispatch(signOut());
    }

    const handleUserSettings = (e) => {
        history.push('/userSettings');
    }

    function handleClick(event) {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    }

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <IconButton
                ref={anchorRef}
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                aria-owns={anchorEl ? "simple-menu" : undefined}
                onClick={handleClick}
                color="inherit"
            >
                {(auth.id === null || auth.id === undefined)
                    ? <AccountCircle fontSize="large" />
                    : <Avatar {...stringAvatar(`${auth.firstName} ${auth.lastName}`)} style={{ height: '35px', width: '35px' }} />
                }
                <Menu
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  MenuListProps={{ onMouseLeave: handleClose }}
                  getContentAnchorEl={null}
                  disableAutoFocusItem={true}
                >               <MenuList id="simple-menu" onKeyDown={handleListKeyDown}>
                        {auth.id === null && (

                            <MenuItem onClick={() => [handleSignIn(), handleClose()]}>Sign In</MenuItem>
                        )}

                        {auth.id === null && (

                            <MenuItem onClick={() => [handleSignUp(), handleClose()]}>Sign Up</MenuItem>
                        )}


                        {auth.id !== null && (

                            <MenuItem onClick={() => [handleUserSettings(), handleClose()]}>Settings</MenuItem>
                        )}
                        {auth.id !== null && (

                            <MenuItem onClick={() => [handleLogout(), handleClose()]}>Logout</MenuItem>
                        )}
                    </MenuList>
                </Menu>

            </IconButton>
        </div>
    );
}
