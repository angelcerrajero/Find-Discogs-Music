import React from 'react';
import ErrorBoundary from './components/ErrorBoundary'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from './components/Search'
import Detail from './components/Detail'
import { SnackbarProvider } from 'notistack';
import './App.css';



export default class App extends React.Component {

  
  componentDidMount() {
  
  }

  
  
  render(){
    
    return(
      <div>
      <ErrorBoundary>
				<SnackbarProvider iconVariant={{ success: '✅', error: '✖️', warning: '⚠️', info: 'ℹ️', }}
    anchorOrigin={{ vertical: 'top', horizontal: 'center',}}>

        <Router>
          <Switch>
              <Route exact path="/" component={Search} />
              <Route exact path="/detail/:type/:id/" component={Detail} />
              <Route component={Search}/>
          </Switch>
        </Router>
        </SnackbarProvider>       
			</ErrorBoundary>
      </div>
    );
  }
}
