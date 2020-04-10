import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userActions, skyActions } from '../_actions';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    marginTop: 100,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  logout: {
    color: '#ffffff'
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  cardTitle: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function HomePage() {
    const users = useSelector(state => state.users);
    const states = useSelector(state => state.sky);
    const user = useSelector(state => state.authentication.user);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userActions.getAll());
        dispatch(skyActions.getAllStates());
    }, []);

    function rand() {
      return Math.round(Math.random() * 20) - 10;
    }


    function getModalStyle() {
      const top = 50;
      const left = 50;

      return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
      };
    }
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Text in a modal</h2>
        <p id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
      </div>
    );

    function getCityInfo(value) {
      console.log(value);
      setOpen(true);
    }

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <div>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar)}>
          <Toolbar className={classes.toolbar}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography>
            <Typography component="h1" variant="h6" noWrap>
              <Link href="login" className={classes.logout}>
                  Logout
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container justify="center">
              {states !== undefined && states.items !== undefined && states.items.states.map(value => (
                <Card className={classes.root} variant="outlined" key={value[0]}>
                  <CardContent>
                    <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                      {value[2]}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {value[1]}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Latitude : {value[5]}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Longitude : {value[6]}
                      <br />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => {getCityInfo(value);}}>Flight Info</Button>
                  </CardActions>
                </Card>
              ))}
            </Grid>
          </Container>
        </main>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">
          {body}
        </Modal>
      </div>
    );
}

export { HomePage };
