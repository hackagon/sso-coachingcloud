import React, { Component } from 'react';
import '../sso.css'
import './AccountInfo.css'

class AccountInfo extends Component {
    render() {
        const user = this.props.user
        console.log(this.props)
        return (
            <div className="sso-card account mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title">
                    <h3>Account</h3>
                </div>
                <div className="mdl-card__actions mdl-card mdl-shadow--2dp">
                    <div className="account__info">
                        <div className="account__info__icon">
                            <img 
                                src={user.avatar ? user.avatar : './img/user.jpg'}
                                alt={`${user.firstname} ${user.lastname}`}
                            />
                        </div>

                        <div className="account__info__text">
                            <p className="account__info__name">
                                {`${user.firstname} ${user.lastname}`}
                            </p>
                            <p className="account__info__email">
                                {user.email}
                            </p>
                        </div>
                    </div>
                    <div className="account__logout">
                        <button 
                            className="mdl-button mdl-js-button mdl-js-ripple-effect"
                            onClick={this.props.logout}
                        >LOG OUT</button>
                    </div>
                </div>
                <div className="account__activities mdl-card__actions">
                    <p>Activities</p>

                    <ul className="demo-list-item mdl-list">
                        <li className="mdl-list__item">
                            <a href="/">
                                <span className="mdl-list__item-primary-content">
                                    Go to CoachingCloud
                                </span>
                            </a>
                        </li>
                        <li className="mdl-list__item">
                            <a href="/">
                                <span className="mdl-list__item-primary-content">
                                    Create new community
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default AccountInfo;