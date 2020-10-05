import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

class LogInPage extends Component{
    state = {
        email: '',
        pw: '',
    }

    componentDidMount(){
        this.props.checkLoginStatus();
    }

    logInHandler = () => {
        const info =
            { email: this.state.email, pw: this.state.pw };
        if(info.email === "swpp@snu.ac.kr" && info.pw === "iluvswpp"){
            this.props.onLogIn(this.props.selectedUser);
            this.props.history.push('/articles');
        }
        else{
            alert("Email or password is wrong");
        }
    }

    render(){
        return(
            <div className = "LogInPage">
                <h1>Login Page</h1>
                <div className = "Email">
                    <label>Email </label>
                    <input id='email-input' type="text" value={this.state.email}
                    onChange={(event) => this.setState({ email: event.target.value })} />
                </div>
                <div className = "LineBreak">
                    <br></br>
                </div>
                <div className = "Password">
                    <label>Password </label>
                    <input id='pw-input' type="text" value={this.state.pw}
                    onChange={(event) => this.setState({ pw: event.target.value })} />
                </div>
                <div className = "LineBreak">
                    <br></br>
                </div>
                <button id='login-button' onClick={() => this.logInHandler()}>Log In</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      selectedUser: state.usr.selectedUser
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
        onLogIn: (usr) =>
            dispatch(actionCreators.updateLoginStatus(usr)),
        checkLoginStatus: () =>
            dispatch(actionCreators.getUser())
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);