import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import swal from 'sweetalert'

// import components
import EmailForm from './components/sso/email-form/EmailForm';
import PasswordForm from './components/sso/password-form/PasswordForm';
import AccountInfo from './components/sso/account-info/AccountInfo';
import Loading from './components/sso/loading/Loading';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            user: null,
            isAuthenticated: false,
            renderComponent: "email",
        }
    }

    componentDidMount = () => {
        const token = localStorage.getItem('token');
        if(token){
            this.setState({renderComponent: "loading"})
            axios({
                method: 'GET',
                params: {
                    token: token,
                    fingerprint: 'fingerprint'
                },
                url: '/jwt',
            })
            .then(res => {
                if(res.status === 200){
                    this.getUser(token)
                }
            })
            .catch(console.log)
        }
    }

    getEmail = (email) => {
        this.setState({ email })
    }

    getPassword = (password) => {
        this.setState({ password }, () => {

            this.login()
        })
    }

    changeRenderComponent = (renderComponent) => {
        this.setState({renderComponent})
    }

    getUser = (token) => {
        axios({
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token,
                "X-Fingerprint": 'fingerprint'
            },
            url: '/me',
        })
        .then(res => {
            this.setState({
                isAuthenticated: true,
                user: res.data
            })
        })
        .catch(console.log)
    }

    login = () => {
        const { email, password } = this.state;
        const user = {
            email, password, fingerprint: 'fingerprint'
        }
        this.setState({renderComponent: "loading"})
        axios({
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },

            url: '/jwt',
            data: user
        })
        .then(res => {
            console.log(res.data)
            const {token} = res.data;
            localStorage.setItem("token", token);
            // this.setState({isAuthenticated: true})
            this.getUser(token)
        })
        .catch(err => {
            swal ( "Oops" ,  `${err.response.data.message}` ,  "error" )
            this.setState({renderComponent: "email"})
        })
    }

    logout = () => {
        this.setState({
            email: "",
            password: "",
            isAuthenticated: false,
            user: null,
            renderComponent: "email"
        })
        localStorage.removeItem('token')
    }

    render() {
        const { isAuthenticated, renderComponent } = this.state;
        let elmSSO;

        if (!isAuthenticated) {
            if (renderComponent === "email") {
                elmSSO = <EmailForm
                    getEmail={this.getEmail}
                    changeRenderComponent={this.changeRenderComponent}
                    {...this.state}
                />
            } else if (renderComponent === "password") {
                elmSSO = <PasswordForm
                    {...this.state}
                    getPassword={this.getPassword}
                    changeRenderComponent={this.changeRenderComponent}
                />
            } else {
                elmSSO = <Loading />
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
