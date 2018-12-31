import React, { Component } from 'react';
import '../sso.css';
import './EmailForm.css';

class EmailForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        }
    }
    
    onSubmit = (e) => {
        e.preventDefault()
        this.props.getEmail(this.state.email)
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        console.log("email")
        return (
            <div className="sso-card login-form mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title">
                    <h3>Get started</h3>
                </div>
                <div className="mdl-card__actions">
                    <p>Use your social media account</p>

                    <ul className="mdl-list">
                        <li className="mdl-list__item">
                            <a className="mdl-list__item-primary-content" href="/auth">
                                <img src="./img/facebook.png" alt="facebook" width="50px" height="50px" />
                            </a>
                        </li>
                        <li className="mdl-list__item">
                            <a className="mdl-list__item-primary-content" href="/auth">
                                <img src="./img/google-plus.png" alt="facebook" width="50px" height="50px" />
                            </a>
                        </li>
                        <li className="mdl-list__item">
                            <a className="mdl-list__item-primary-content" href="/auth">
                                <img src="./img/linkedin.png" alt="facebook" width="50px" height="50px" />
                            </a>
                        </li>
                    </ul>

                    <div className="seperate-line">
                        <span>OR</span>
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input 
                                className="mdl-textfield__input" 
                                type="email" 
                                onChange={this.onChange}
                                name="email"
                                value={this.state.email}
                                
                            />
                            <label 
                                className="mdl-textfield__label" 
                                htmlFor="sample3"
                            >
                                Email
                            </label>
                        </div>
                        <div className="align-button">
                            <button className="mdl-button button-navigate mdl-js-button mdl-button--raised mdl-button--colored">
                                NEXT
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

export default EmailForm;