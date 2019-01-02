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
            user: null,
            isAuthenticated: false
        }
    }

    componentDidMount = () => {
        const token = localStorage.getItem('token');
        axios({
            method: 'GET',
            params: {
                token: token,
                fingerprint: 'fingerprint'
            },
            url: 'https://sso.coachingcloud.com/jwt',
        })
        .then(res => {
            if(res.status === 200){
                return axios({
                    method: 'GET',
                    headers: {
                        "access-control-allow-origin" : "*",
                        "Authorization": "Bearer " + token,
                        "X-Fingerprint": 'fingerprint'
                    },
                    url: 'https://sso.coachingcloud.com/me',
                })
            }
        })
        .then(res => {
            this.setState({
                isAuthenticated: true,
                user: res.data
            })
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
        const { email, password } = this.state;
        const user = {
            email, password, fingerprint: 'fingerprint'
        }
        
        axios({
            method: 'POST',
            headers: {
                "access-control-allow-origin" : "*",
                "Content-type": "application/json; charset=UTF-8"
            },
            url: 'https://sso.coachingcloud.com/jwt',
            data: user
        })
        .then(res => {
            const {token} = res.data;
            localStorage.setItem("token", token);
            // this.setState({isAuthenticated: true})
            return axios({
                method: 'GET',
                headers: {
                    "access-control-allow-origin" : "*",
                    "Authorization": "Bearer " + token,
                    "X-Fingerprint": 'fingerprint'
                },
                url: 'https://sso.coachingcloud.com/me',
            })
        })
        .then(res => {
            this.setState({
                isAuthenticated: true,
                user: res.data
            })
        })
        .catch(console.log)
    }

    logout = () => {
        this.setState({
            email: "",
            password: "",
            isAuthenticated: false,
            user: null
        })
        localStorage.removeItem('token')
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
