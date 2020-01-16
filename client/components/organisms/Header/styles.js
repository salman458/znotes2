import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  opaque: {},
  appBar: {
    backgroundColor: '#020D14',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('md')]: {
      width: ({ withSidebar, sidebarWidth }) => (withSidebar ? `calc(100% - ${sidebarWidth}px)` : '100%'),
      marginLeft: ({ withSidebar, sidebarWidth }) => (withSidebar ? sidebarWidth : 0),
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      marginLeft: 0,
    },
    '&$opaque': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  },
  appBarShift: {
    width: (props) => `calc(100% - ${props.sidebarWidth}px)`,
    marginLeft: (props) => props.sidebarWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
}));

export default useStyles;
