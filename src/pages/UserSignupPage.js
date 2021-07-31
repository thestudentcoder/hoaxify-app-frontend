import React from "react";

export class UserSignupPage extends React.Component {

  state = {
    displayName: '',
    username: '',
    password: '',
    passwordRepeat: ''
  }

  onChangeDisplayname = (e) => {
    const value = e.target.value;
    this.setState({ displayName: value })
  }

  onChangeUsername = (e) => {
    const value = e.target.value;
    this.setState({ username: value })
  }

  onChangePassword = (e) => {
    const value = e.target.value;
    this.setState({ password: value })
  }

  onChangePasswordRepeat = (e) => {
    const value = e.target.value;
    this.setState({ passwordRepeat: value })
  }

  onClickSignup = () => {
    this.props.actions.postSignup();
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <div>
          <input 
          placeholder="Your display name" 
          value={this.state.displayName}
          onChange={this.onChangeDisplayname}
          />
        </div>
        <div>
          <input
            placeholder="Your username"
            value={this.state.username}
            onChange={this.onChangeUsername}
          />
        </div>
        <div>
          <input
            placeholder="Your password"
            type="password"
            value={this.state.password}
            onChange={this.onChangePassword}
          />
        </div>
        <div>
          <input
            placeholder="Repeat your password"
            type="password"
            value={this.state.passwordRepeat}
            onChange={this.onChangePasswordRepeat}
          />
        </div>
        <div>
          <button onClick={this.onClickSignup}>Sign Up</button>
        </div>
      </div>
    );
  }
}

UserSignupPage.defaultProps = {
  actions: {
    postSignup: () =>
      new Promise((resolve, reject) => {
        resolve({ });
      })
  }
};

export default UserSignupPage;
