import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    };
    
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error) {
            // Check for register error
            if(error.id === "REGISTER_FAIL"){
                this.setState({
                    msg: error.msg.msg
                })
            } else {
                this.setState({ msg: null })
            }
        }

        // If authenticated, close out the modal
        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle();
            }
        }

    }

    toggle = () => {
        // Clear Errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    } 

    onSubmit = (e) => {
        e.preventDefault();

        // Pull data from state
        const { name, email, password } = this.state;
        console.log(name + " " + email + " " + password);
    
        // Create user obj
        const newUser = {
            name,
            email,
            password
        }

        // Attempt to register new user
        this.props.register(newUser);
    }

    render() {
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to shopping list</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    className="mb-3"
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    onChange={this.onChange}
                                />

                                <Label for="name">Email</Label>
                                <Input
                                    className="mb-3"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onChange={this.onChange}
                                />

                                <Label for="name">Password</Label>
                                <Input
                                    className="mb-3"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="PassWord Here"
                                    onChange={this.onChange}
                                />

                                <Button color="dark" style={{ marginTop: '2rem' }} block>
                                    Register
                                </Button>

                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapsStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});


export default connect(mapsStateToProps, { register, clearErrors })(RegisterModal);