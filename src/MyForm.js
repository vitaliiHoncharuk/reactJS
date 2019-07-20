import React from 'react';
import './myForm.css';
import {withRouter} from 'react-router-dom';


class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            pwd: '',
            repeatPwd: ''
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    validate = (event) => {
        event.preventDefault();
        const {mail, pwd, repeatPwd} = this.state;
        // eslint-disable-next-line
        let isValidPwd = new RegExp(/^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(^[a-zA-Z0-9@\$=!:.#%]+$)/);
        if (!(mail && pwd && repeatPwd)) {
            return;
        }

        if (pwd.match(isValidPwd) && pwd === repeatPwd && mail.includes('@gmail.com')) {
            alert('valid');
            localStorage.setItem('user', 'userPassword');
            this.props.history.push("home");
        }

    };

    render() {
       if (localStorage.getItem('user') ) {
           this.props.history.push("home");
       }
        return (
            <form onSubmit={this.validate}>
                <div>
                    <label>Mail : </label>
                    <input type="email" name="mail" value={this.state.mail} onChange={this.handleChange}/>
                </div>
                <div>
                    <label>Password : </label>
                    <input type="password" name="pwd" value={this.state.pwd} onChange={this.handleChange}/>
                </div>
                <div>
                    <label>Repeat password : </label>
                    <input type="password" name="repeatPwd" value={this.state.repeatPwd} onChange={this.handleChange}/>
                </div>
                <input type="submit"/>
            </form>
        )
    }


}

export default withRouter(MyForm);
