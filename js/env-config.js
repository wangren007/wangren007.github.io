(function() {
    'use strict';

    var ENV_CONFIG = {
        local: {
            name: '本地环境',
            baseUrl: '//52order.com',
            loginUrl: '//52order.com/login'
        },
        production: {
            name: '生产环境',
            baseUrl: '//121.5.177.201',
            loginUrl: '//121.5.177.201/login'
        }
    };

    var currentEnv = 'local';

    function setEnvironment(env) {
        if (ENV_CONFIG[env]) {
            currentEnv = env;
            localStorage.setItem('currentEnv', env);
            return true;
        }
        return false;
    }

    function getCurrentEnv() {
        var savedEnv = localStorage.getItem('currentEnv');
        return savedEnv && ENV_CONFIG[savedEnv] ? savedEnv : currentEnv;
    }

    function getConfig() {
        var env = getCurrentEnv();
        return ENV_CONFIG[env];
    }

    function getProtocol() {
        return window.location.protocol;
    }

    function getBaseUrlWithProtocol(baseUrl) {
        var protocol = getProtocol();
        if (baseUrl.startsWith('//')) {
            return protocol + baseUrl;
        }
        return baseUrl;
    }

    window.EnvConfig = {
        setEnvironment: setEnvironment,
        getCurrentEnv: getCurrentEnv,
        getConfig: getConfig,
        getBaseUrl: function() {
            var baseUrl = getConfig().baseUrl;
            return getBaseUrlWithProtocol(baseUrl);
        },
        getLoginUrl: function() {
            var loginUrl = getConfig().loginUrl;
            return getBaseUrlWithProtocol(loginUrl);
        },
        getEnvName: function() {
            return getConfig().name;
        },
        getProtocol: getProtocol
    };
})();
