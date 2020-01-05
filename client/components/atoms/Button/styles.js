import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 100,
    textTransform: 'initial',
    fontWeight: theme.typography.fontWeightBold,
    padding: '7px 25px',
  },
}));

export default useStyles;
