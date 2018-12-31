import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import swal from 'sweetalert'

// import components
import EmailForm from './components/sso/email-form/EmailForm';
import PasswordForm from './components/sso/password-form/PasswordForm';
import AccountInfo from './components/sso/account-info/AccountInfo';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            data: null,
            user: null,
            isAuthenticated: false
        }
    }

    componentDidMount = () => {
        axios.get('http://5c286868dc7d0a00144c2e1a.mockapi.io/users')
            .then(res => {
                this.setState({ data: res.data })
            })
            .catch(console.log)
    }

    getEmail = (email) => {
        this.setState({ email })
    }

    getPassword = (password) => {
        this.setState({ password }, () => {

            this.login()
        })
    }

    getBack = () => {
        
    }

    login = () => {
        const { data, email, password } = this.state;
        let index = -1;
        for (let i in data) {
            if (data[i].email === email && data[i].password === password) {
                index = i;
                this.setState({
                    isAuthenticated: true,
                    user: data[i]
                })
            }
        }

        if (index === -1) {
            swal("NOT MATCH", "Email and password do not match", "error")
                .then(this.setState({email: "", password: ""}))
        }
    }

    logout = () => {
        this.setState({
            email: "",
            password: "",
            isAuthenticated: false,
            user: null
        })
    }

    render() {
        const { email, password, isAuthenticated } = this.state;
        let elmSSO = <EmailForm
            getEmail={this.getEmail}
            {...this.state}
        />;

        if (!isAuthenticated) {
            if (!email) {
                elmSSO = <EmailForm
                    getEmail={this.getEmail}
                    {...this.state}
                />
            } else if (email && !password) {
                elmSSO = <PasswordForm
                    {...this.state}
                    getPassword={this.getPassword}
                />
            }
        } else {
            elmSSO = <AccountInfo
                {...this.state}
                logout={this.logout}
            />
        }

        return (
            <div className="App">
                {elmSSO}
            </div>
        );
    }
}

export default App;
