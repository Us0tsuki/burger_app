import React, { Component } from 'react';
import { auth } from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import styles from './Auth.module.css';


class Auth extends Component {
    state = {
        formEntries: {
            email: {
                entryType: 'input',
                entryConfig: {
                    type: 'email',
                    placeholder: 'Username'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    isEmail: true
                },
                touched: false
            },
            password: {
                entryType: 'input',
                entryConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    minLen: 6
                },
                touched: false
            },
        },
        isSignUp: true
    }

    validate(value, rules) {
        let isValid = true;
        if(!rules) return isValid;
        if(rules.required && value.trim() === '') isValid = false;
        if(rules.minLen && value.length < rules.minLen) isValid = false;
        if(rules.maxLen && value.length > rules.maxLen) isValid = false;
        if(rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value);
        }
        if(rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value);
        }
        return isValid;
    }

    inputChangeHandler = (e, id) => {
        const updatedEntries = {
            ...this.state.formEntries,
            [id]: {
                ...this.state.formEntries[id],
                value: e.target.value,
                valid: this.validate(e.target.value, this.state.formEntries[id].validation),
                touched: true
            }
        }
        this.setState({formEntries: updatedEntries});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.formEntries.email.value, this.state.formEntries.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        });
    }

    render() {
        const formEntryArray = [];
        for (let key in this.state.formEntries) {
            formEntryArray.push({
                id: key,
                params: this.state.formEntries[key]
            });
        }
        let form = <Spinner />
        if(!this.props.loading) {
            form = formEntryArray.map(formEntry => (
                <Input
                    key={formEntry.id}
                    id={formEntry.id}
                    entryType={formEntry.params.entryType}
                    entryConfig={formEntry.params.entryConfig}
                    value={formEntry.params.value}
                    invalid={formEntry.params.touched && !formEntry.params.valid}
                    changed={e => this.inputChangeHandler(e, formEntry.id)} />
            ));
        }

        return (
            <div className={styles.Auth}>
                {this.props.isAuth && (this.props.modified ? <Redirect to='/checkout'/> : <Redirect to='/'/>)}
                {this.props.error && <p>{this.props.error}</p>}
                <form>
                    {form}
                    <Button clicked={this.submitHandler} btnType='Success'>SUBMIT</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler} btnType='Danger'>SWITCH TO {this.state.isSignUp? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        modified: state.burgerBuilder.totalPrice > 4
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);