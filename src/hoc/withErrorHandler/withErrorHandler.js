import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
//This is a common function that returns a component
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                error: null
            }
            
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
                return Promise.reject(error);
            });
        }

        componentWillUnmount() {
            // console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }
        render() {
            return (
                <>
                    <Modal show={this.state.error} closeModal={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} /> 
                </>
            );
        }
    }
}

export default withErrorHandler;