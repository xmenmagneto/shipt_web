import React from 'react';
import { Form, Input, Upload, Icon  } from 'antd';
const FormItem = Form.Item;

class CreateProductForm extends React.Component {
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    beforeUpload = () => {
        return false;
    }

    getWrappedForm = () => {
        return this.props.form;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        return(
            <Form layout="vertical">
                <FormItem
                    {...formItemLayout}
                    label="Name">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input the name of product.' }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Price">
                    {getFieldDecorator('price', {
                        rules: [{ required: true, message: 'Please input the price of product.' }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Image"
                >
                    <div className="dropbox">
                        {getFieldDecorator('image', {
                            rules: [{ required: true, message: 'Please choose an image for the product.' }],
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload.Dragger
                                name="files"
                                beforeUpload={this.beforeUpload} //return false -->not upload immediately
                            >
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            </Upload.Dragger>
                        )}
                    </div>
                </FormItem>

            </Form>
        );
    }
}

export const WrappedCreatePostForm = Form.create()(CreateProductForm);