import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider, useAuth } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
<<<<<<< HEAD
import { BoardContextProvider } from './context/useBoardContext';
=======
>>>>>>> origin/Protected-Route
import './App.css';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
<<<<<<< HEAD
              <BoardContextProvider>
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/dashboard">
                    <Dashboard />
                  </Route>
                  <Route path="*">
                    <Redirect to="/login" />
                  </Route>
                </Switch>
              </BoardContextProvider>
=======
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <ProtectedRoute exact path="/dashboard">
                  <Dashboard />
                </ProtectedRoute>
                <Route path="*">
                  <Redirect to="/login" />
                </Route>
              </Switch>
>>>>>>> origin/Protected-Route
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
