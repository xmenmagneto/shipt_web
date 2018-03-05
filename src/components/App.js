import React, { Component } from 'react';
import {Header} from './Header';
import {Main} from './Main'
import '../styles/App.css';
import { TOKEN_KEY } from "../constants"

class App extends Component {
    state = {
        //if TOKEN_KEY is not empty string, set isLoggedIn as true, else false
        isLoggedIn: !!localStorage.getItem(TOKEN_KEY)  //！！=> convert string to bool
    }

    handleLogin = (token) => {
        localStorage.setItem(TOKEN_KEY, token); // save token into localStorage
        this.setState({ isLoggedIn: true});  //not depend on previous state
    }

    handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY); // remove token
        this.setState({ isLoggedIn: false});
    }

    render() {
        return (
            <div className="App">
                <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
                <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
            </div>
        );
    }
}

export default App;
