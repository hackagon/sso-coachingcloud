import React, { Component } from 'react';
import '../sso.css'
import './PasswordForm.css'

class PasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
        }
    }

    componentDidMount() {
        this.setState({password: this.props.password})
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.getPassword(this.state.password)
        
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    render() {
        return (
            <div className="sso-card password-form mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title">
                    <h3>Sign-in</h3>
                </div>
                <div className="mdl-card__actions">
                    <p>Please provide your password</p>

                    <span className="mdl-chip mdl-chip--contact">
                        <span className="mdl-chip__contact mdl-color--grey mdl-color-text--white">
                            <i className="material-icons mdl-list__item-icon">person</i>
                        </span>
                        <span className="mdl-chip__text">{this.props.email}</span>
                    </span>

                    <form onSubmit={this.onSubmit}>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input 
                                className="mdl-textfield__input" 
                                type="password" 
                                name="password"
                                onChange={this.onChange}
                                value={this.state.password}
                            />
                            <label 
                                className="mdl-textfield__label" 
                                htmlFor="sample3"
                            >   
                                Password
                            </label>
                        </div>

                        <div className="forgot-password">
                            <a href="/">Forgot your password</a>
                        </div>

                        <div className="align-button">
                            <button 
                                className="mdl-button button-navigate mdl-js-button mdl-button--raised mdl-button--colored"
                                type="button"
                                onClick={this.props.changeRenderComponent.bind(this, "email")}
                            >
                                BACK
                            </button>
                            <button 
                                className="mdl-button button-navigate mdl-js-button mdl-button--raised mdl-button--colored"
                                type="submit"
                            >
                                NEXT
                            </button>
                            
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

export default PasswordForm;