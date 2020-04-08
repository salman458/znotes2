import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: ({ withSidebar, sidebarWidth }) => (withSidebar ? sidebarWidth : 0),
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: 0,
    },
  },
  preserveSpace: {
    whiteSpace: 'pre',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: (props) => props.sidebarWidth,
  },
  footerLogo: {
    width: '2vw',
    minWidth: 50,
  },
  footerMeta: {
    fontSize: '1rem',
  },
}));

export default useStyles;
