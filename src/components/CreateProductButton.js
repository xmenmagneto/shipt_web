import React from 'react';
import { Modal, Button, message } from 'antd';
import { WrappedCreatePostForm } from './CreateProductForm';
import { API_ROOT, AUTH_PREFIX, TOKEN_KEY } from "../constants";
import $ from 'jquery';
import { PropTypes } from 'prop-types';


export class CreateProductButton extends React.Component {
    static propTypes = {
        loadProducts: PropTypes.func.isRequired,
    }

    state = {
        visible: false,
        confirmLoading: false,
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        //1.get value
        const form = this.form.getWrappedForm(); //get outer form
        form.validateFields((err, values) => {
            if (err) { return; } //do not submit
            console.log('Received values of form: ', values);

            //prepare formData

            const formData = new FormData();
            formData.append('name', form.getFieldValue('name'));
            formData.append('price', form.getFieldValue('price'));
            formData.append('image', form.getFieldValue('image')[0]);

            console.log(formData.get("name"))

            //send request
            this.setState({ confirmLoading: true });

            $.ajax({
                method: 'POST',
                url: `${API_ROOT}/post`,
                headers: {
                    Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
                },
              //  enctype: '',
                // processData: false,
                 contentType: false,
                //dataType: 'text',
               // data: formData,
            }).then(() => {
                message.success('created a product successfully.');
                form.resetFields();
            },(error) => {  //error while sending request
                message.error(error.responseText);
                form.resetFields();
            }).then(() => {
                this.props.loadProducts().then(() => {
                    this.setState({ visible: false, confirmLoading: false });
                });
            }).catch((e) => {
                message.error('create post failed.');
                console.error(e);
            });

        });
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    saveFormRef = (form) => { //get inner form
        this.form = form; //save form
    }


    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>Create New Product</Button>
                <Modal title="Create New Product"
                       visible={visible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}
                       okText="Create"
                       cancelText="Cancel"
                       confirmLoading={confirmLoading}
                >
                    <WrappedCreatePostForm wrappedComponentRef={this.saveFormRef}/>
                </Modal>
            </div>
        );
    }
}