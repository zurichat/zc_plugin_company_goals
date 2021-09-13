import { useEffect } from 'react';
import CentrifugeClient from 'centrifuge';
import { useDispatch } from 'react-redux';
import { saveVision } from 'redux/organizationVision.slice';
import { activateSnackbar } from 'redux/snackbar.slice';
import Home from './pages/Home';

const App = () => {
  const dispatch = useDispatch();
  const centrifugeConnect = new CentrifugeClient('wss://realtime.zuri.chat/connection/websocket', { minRetry: 100000 });
  // const centrifugeConnect = new CentrifugeClient('ws://localhost:8000/connection/websocket');
  // centrifugeConnect.setToken(
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM3MjIiLCJleHAiOjE2MzIwMzAyNjV9.mR1EBjkfXce2CZ0H3UEYLOQCxdLlhtg32XBJldSqbno'
  // );
  useEffect(() => {
    centrifugeConnect.on('connect', function (ctx) {
      console.log('connected', ctx);
      dispatch(activateSnackbar({ content: 'Connected to Centifugo 🥳', severity: 'info' }));
    });

    centrifugeConnect.on('disconnect', function (ctx) {
      console.log('disconnected', ctx);
      dispatch(activateSnackbar({ content: 'Failed to connect to Centifugo 😭', severity: 'error' }));
    });

    centrifugeConnect.subscribe('goalstest', function (ctx) {
      console.log('goalstest', ctx);
    });
    centrifugeConnect.subscribe('edit_vision', function (ctx) {
      console.log('edit_vision', ctx);
      dispatch(saveVision(ctx.data));
    });

    centrifugeConnect.connect();
  }, []);
  return <Home />;
};

export default App;
