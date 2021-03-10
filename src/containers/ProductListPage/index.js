import React from 'react';
import Layout from '../../components/Layout';
import getQueryParams from '../../utils/getQueryParams';
import ProductPage from './ProductPage';
import ProductStore from './ProductStore';
import './style.css';

const ProductListPage = (props) => {

    const renderProduct = () => {
        console.log(props);
        const params = getQueryParams(props.location.search);
        let content = null;
        switch(params.type){
            case 'store':
                content = <ProductStore {...props} />;
                break;
            case 'page':
                content = <ProductPage {...props} />
                break;
            default:
                content = null;
        }

        return content;
    }

    return (
        <Layout>
            {renderProduct()}
        </Layout>
    )
}

export default ProductListPage