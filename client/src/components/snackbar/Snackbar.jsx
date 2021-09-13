import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { deactivateSnackbar } from 'redux/snackbar.slice';

const SnackBar = () => {
  const dispatch = useDispatch();
  const { showSnackbar, snackbarContent, snackbarSeverity } = useSelector((state) => state.snackbar);

  const handleCloseSnackbar = () => dispatch(deactivateSnackbar());
  return (
    <Snackbar open={showSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
      <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbarSeverity}>
        {snackbarContent}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackBar;
