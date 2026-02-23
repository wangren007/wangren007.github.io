(function() {
    'use strict';

    var API_CONFIG = {
        baseUrl: 'http://121.5.177.201',
        endpoints: {
            products: '/api/products',
            product: '/api/product',
            contact: '/api/contact'
        }
    };

    function getApiUrl(endpoint) {
        return API_CONFIG.baseUrl + endpoint;
    }

    function handleResponse(response) {
        if (!response.ok) {
            throw new Error('网络请求失败');
        }
        return response.json();
    }

    function handleError(error) {
        console.error('API Error:', error);
        throw error;
    }

    window.ApiService = {
        getProducts: function() {
            return fetch(getApiUrl(API_CONFIG.endpoints.products))
                .then(handleResponse)
                .then(function(data) {
                    if (data.code === 0) {
                        return data.data;
                    } else {
                        throw new Error(data.msg || '获取产品列表失败');
                    }
                })
                .catch(handleError);
        },

        getProduct: function(id) {
            var url = getApiUrl(API_CONFIG.endpoints.product) + '?id=' + encodeURIComponent(id);
            return fetch(url)
                .then(handleResponse)
                .then(function(data) {
                    if (data.code === 0) {
                        return data.data;
                    } else {
                        throw new Error(data.msg || '获取产品详情失败');
                    }
                })
                .catch(handleError);
        },

        submitContact: function(formData) {
            return fetch(getApiUrl(API_CONFIG.endpoints.contact), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(handleResponse)
            .then(function(data) {
                if (data.code === 0) {
                    return data;
                } else {
                    throw new Error(data.msg || '提交失败');
                }
            })
            .catch(handleError);
        },

        setBaseUrl: function(baseUrl) {
            API_CONFIG.baseUrl = baseUrl;
        }
    };
})();