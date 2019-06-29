import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { List, Grid } from '@material-ui/core';
import MainListItems from './MainListItems';
import VideoCall from '../Components/VideoCall';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import { logout, getUsers } from '../../config/firebaseFunctions'
import { LoginConsumer } from '../../config/contextConfig.js';
import Chat from '../Components/Chat'
import Input from '../Components/Input'
import * as firebase from 'firebase'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    // position:'fixed',
    display: 'flex'
  },
  toolbar: {
    backgroundColor: '#0b222b',
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    backgroundColor: '#0b222b',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  }
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      data: [],
      msgToSndUid: '',
      userUid: '',
      emailAddress: '',
      recipientName: '',
      searchData: [],
      toSearch: ''
    };

    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  logoutBtnHandler = (isLogin) => {
    try {
      const res = logout()
      res.then(() => {
        isLogin();
        this.props.history.push('/');
        console.log('promise Works');
      })
    }
    catch (e) {
      console.log(e)
    }
  }
  
  componentDidMount() {
    this.getUserUid()
    this.getUsersOnLoad()
  }

  getUserUid = () => {
    let uid = sessionStorage.getItem('userUid')
    let email = sessionStorage.getItem('email')
    this.setState({
      userUid: uid,
      emailAddress: email
    })
  }

  getUsersOnLoad = () => {
    let uid = sessionStorage.getItem('userUid')
    try {
      const res = getUsers()
      res.then((result) => {
        console.log(result)
        console.log('uid ===>', uid)
        const newMessage = result.filter(item => item.uid === uid)
        console.log('new', newMessage)
      })
    }
    catch (e) {
      console.log(e)
    }
  }

  setRecipientUid = (uid, name) => {
    this.setState({
      msgToSndUid: uid,
      recipientName: name
    })
  }

  searchInList = (val) => {
    const toSearch = val.target.value;
    // const toSearch = this.state.search;
    const searchData = this.state.data.filter(item => {
      return item.name.substring(0, toSearch.length).toLowerCase() === toSearch.toLowerCase()
    })
    this.setState({ toSearch, searchData })
  }

  sendMesg = (message) => {
    const { userUid, msgToSndUid } = this.state;
    let time = firebase.database.ServerValue.TIMESTAMP
    const messageObj = {
      sender: userUid,
      reciever: msgToSndUid,
      message,
      time
    }
    console.log('userUid ===>', userUid)
    console.log('msgToSndUid===> ', msgToSndUid)
    firebase.database().ref('chats').child(userUid).child(msgToSndUid).push(messageObj)
      .then(() => {
        firebase.database().ref('chats').child(msgToSndUid).child(userUid).push(messageObj)
          .then(() => {
            firebase.database().ref('users').child(msgToSndUid).child('newMessage').push(userUid)
              .then(() => { })
              .catch((e) => {
                console.log(e)
              })
          })
          .catch((e) => {
            console.log(e)
          })
      })
      .catch((error) => {
        console.log(error)
      })

  }

  render() {
    const { classes } = this.props;
    console.log('data from render ===>', data);
    const { data, toSearch, searchData } = this.state;
    const list = toSearch ? searchData : data
    return (
      <div className={classes.root}>

        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Email : {this.state.emailAddress}
            </Typography>
            <LoginConsumer>
              {({ isLogin }) => (
                <IconButton onClick={() => this.logoutBtnHandler(isLogin)} color="inherit" title="Logout">
                  <LogoutIcon />
                </IconButton>
              )}

            </LoginConsumer>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon} >
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon style={{ color: "#fff" }} />
            </IconButton>
          </div>
          <Divider />
          <Input value={this.state.toSearch} name='toSearch' onChange={this.searchInList} placeholder='Search...' />
          <List>
            {
              list.map((item, i) => {
                return (
                  <ListItem button onClick={() => this.setRecipientUid(item.uid, item.name)} key={i} >
                    <ListItemIcon>
                      <Avatar>{item.name.slice(0, 1).toUpperCase()}</Avatar>
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                )
              })
            }
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Grid container >
            <Grid item sx={12} sm={6} md={6} lg={6} >
              <Chat
                sendMesg={this.sendMesg}
                recipient={this.state.msgToSndUid}
                recipientName={this.state.recipientName}
              />
            </Grid>
            <Grid item sx={12} sm={6} md={6} lg={6} >
              <VideoCall />
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};


export default (withStyles(styles)(Dashboard));
