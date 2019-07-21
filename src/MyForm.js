import React from 'react';
import './myForm.css';
import {withRouter} from 'react-router-dom';


class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            pwd: '',
            repeatPwd: '',
            submited: false
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    validPwd = (pwd ) =>{
        // eslint-disable-next-line
        const isValidPwd = new RegExp(/^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(^[a-zA-Z0-9@\$=!:.#%]+$)/);
        if ( pwd.match(isValidPwd)) return true;
    };

    validate = (event) => {
        event.preventDefault();
        const {mail, pwd, repeatPwd} = this.state;
        if (!(mail && pwd && repeatPwd)) {
            return;
        }
        this.setState({
            submited: true
        });
        if (this.validPwd(pwd) && pwd === repeatPwd && mail.includes('@gmail.com')) {
            alert('valid');
            localStorage.setItem('user', 'userPassword');
            this.props.history.push("home");
        }
        else {
            alert('Invalid data , please try again.');
        }

    };

    render() {
        const {mail, pwd, repeatPwd,submited} = this.state;
        if (localStorage.getItem('user')) {
            this.props.history.push("home");
        }
        return (
            <form onSubmit={this.validate}>
                <div>
                    <label>Mail : </label>
                    <input type="email" name="mail" value={mail} onChange={this.handleChange}/>
                    {submited && !mail.includes('@gmail.com') &&
                    <div style = {{color : 'red'}}>
                        Mail should include @gmail.com !
                    </div>
                    }
                </div>

                <div>
                    <label>Password : </label>
                    <input type="password" name="pwd" value={pwd} onChange={this.handleChange}/>
                    { submited && !this.validPwd(pwd) &&
                    <div style = {{color : 'red'}}>
                        Password invalid!
                    </div>
                    }
                </div>
                <div>
                    <label>Repeat password : </label>
                    <input type="password" name="repeatPwd" value={repeatPwd} onChange={this.handleChange}/>
                    {submited && !(pwd === repeatPwd) &&
                    <div style = {{color : 'red'}}>
                        Passwords didn't match!
                    </div>
                    }
                </div>
                <input type="submit"/>
            </form>
        )
    }


}

export default withRouter(MyForm);
