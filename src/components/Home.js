import React from 'react';
import $ from 'jquery';
import { Tabs, Spin } from 'antd';
import { API_ROOT, AUTH_PREFIX, TOKEN_KEY } from "../constants";
import {Gallery} from "./Gallery";
import { CreateProductButton} from "./CreateProductButton";


const TabPane = Tabs.TabPane;

export class Home extends React.Component {
    state = {
        products:[],
        error: '',
        loadingProducts: false,
    }

    componentDidMount() {
        this.loadProducts()
    }


    getGalleryPanelContent = () => {
        if (this.state.error) {
            return <div>{this.state.error}</div>;
        } else if (this.state.loadingProducts) {
            return <Spin tip="Loading products..."/>;
        } else if (this.state.products) { //show gallery
            const images = this.state.products.map((product) => {
                return {
                    user: product.user,
                    src: product.url,
                    thumbnail: product.url,
                    caption: product.name,
                    price: product.price,
                    thumbnailWidth: 400,
                    thumbnailHeight: 300,
                };
            });
            console.log(images);
            return (
                <Gallery
                    images={images}
                />
            );
        }
        return null;
    }

    loadProducts = () => {
        this.setState({ loadingProducts: true});  //trigger spin
        return $.ajax({
            url: `${API_ROOT}/search`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
            },
        }).then((response) => { //response is the product array
            this.setState({ loadingProducts: false, products: response, error: ''});
            console.log(response);
        }, (error) => {
            this.setState({ loadingProducts: false, error: error.responseText});
        }).catch((error) => {
            this.setState({error: error}); 
        });
    }



    render() {
        const createProductButton = <CreateProductButton loadProducts={this.loadProducts}/>;
        return (
            <Tabs tabBarExtraContent={createProductButton} className="main-tabs">
                <TabPane tab="Products" key="1">
                    {this.getGalleryPanelContent()}
                </TabPane>
            </Tabs>
        );
    }
}

