import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';
import { updateObject, validateFormEntry } from '../../../shared/utility';

// import FormErrors from './FormErrors';

class ContactData extends Component {
    state = {
        formEntries: {
            name: {
                entryType: 'input',
                entryConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            email: {
                entryType: 'input',
                entryConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    isEmail: true
                },
                touched: false
            },
            telephone: {
                entryType: 'input',
                entryConfig: {
                    type: 'tel',
                    placeholder: 'Your Phone'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    isPhone: true
                },
                touched: false
            },
            street: {
                entryType: 'input',
                entryConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            postal: {
                entryType: 'input',
                entryConfig: {
                    type: 'number',
                    placeholder: 'Zip Code'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    minLen: 5,
                    maxLen: 5,
                    isNumeric: true
                },
                touched: false
            },
            delivery: {
                entryType: 'select',
                entryConfig: {
                    options: [{ val: 'asap', dispVal: 'ASAP' }, { val: 'later', dispVal: 'At a later time' }],
                    config: {}
                },
                value: 'asap',
                //also set for validation purpose later(equality)
                valid: true,
                validation: {}
            },
        },
        // formErrors: { name: '', email: '', street: '', postal: '' },
        valid: false
    }

    inputChangeHandler = (e, id) => {
        const formEntry = updateObject(this.state.formEntries[id], {
            value: e.target.value.trim(),
            valid: validateFormEntry(e.target.value.trim(), this.state.formEntries[id].validation),
            touched: true
        })
        const formEntries = updateObject(this.state.formEntries, {[id]: formEntry});
        let valid = true;
        for(let id in formEntries) {
            valid = formEntries[id].valid && valid;
        }
        this.setState({ formEntries: formEntries, valid: valid });
    }

    // validateAndUpdate = (name, value) => {
    //     const validationErrors = this.state.formErrors;
    //     const formData = this.state.formData;
    //     switch(name) {
    //         case 'name':
    //             formData.name = value;
    //             if(value.length !== 0) validationErrors.name = '';
    //             else validationErrors.name = 'Name is Required.';
    //             break;
    //         case 'email': 
    //             if(value.length !== 0) {
    //                 emailValid = true;
    //                 validationErrors.email = '';
    //             } else validationErrors.email = 'Email Address is Invalid';
    //             break;
    //         case 'street':
    //             streetValid = true;
    //             break;
    //         case 'postal':
    //             if(value.length === 5) postalValid = true;
    //             break;
    //         default: break;
    //     }

    //     this.setState({
    //         [name]: value,
    //         formErrors: validationErrors,
    //         [`${name}Valid`]: 
    //         formValid: nameValid && emailValid && streetValid && postalValid});
    // }

    orderHandler = event => {
        event.preventDefault();
        //submit only the name-value pair of each entry
        const formData = {};
        for(let id in this.state.formEntries) {
            formData[id] = this.state.formEntries[id].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price.toFixed(2),
            orderData: formData,
            userId: this.props.userId
        }
        this.props.purchaseBurger(order, this.props.token);
        // this.props.history.push('/');
    }

    render() {
        let form = <Spinner />;
        if (!this.props.loading) {
            const formEntryArray = [];
            for(let key in this.state.formEntries) {
                formEntryArray.push({
                    id: key,
                    params: this.state.formEntries[key]
                });
            }
            form = (
                <>
                    {/* <FormErrors formErrors={this.state.formErrors} /> */}
                    <form onSubmit={this.orderHandler}>
                        {formEntryArray.map(formEntry => (
                            <Input 
                                key={formEntry.id}
                                id={formEntry.id}
                                entryType={formEntry.params.entryType}
                                entryConfig={formEntry.params.entryConfig}
                                value={formEntry.params.value}
                                invalid={formEntry.params.touched && !formEntry.params.valid}
                                changed={e => this.inputChangeHandler(e, formEntry.id)}/>
                        ))}
                        <Button btnType='Success' disable={!this.state.valid}>ORDER</Button>
                    </form>
                </>
            );
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        purchaseBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));