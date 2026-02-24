(function() {
    'use strict';

    var ENV_CONFIG = {
        local: {
            name: '本地环境',
            baseUrl: 'http://127.0.0.1',
            loginUrl: 'http://127.0.0.1/login',
            productIntroUrl: 'http://127.0.0.1'
        },
        production: {
            name: '生产环境',
            baseUrl: 'http://121.5.177.201',
            loginUrl: 'http://121.5.177.201/login',
            productIntroUrl: 'http://121.5.177.201'
        }
    };

    var currentEnv = 'production';

    function setEnvironment(env) {
        if (ENV_CONFIG[env]) {
            currentEnv = env;
            localStorage.setItem('currentEnv', env);
            return true;
        }
        return false;
    }

    function getCurrentEnv() {
        return currentEnv;
    }

    function getConfig() {
        var env = getCurrentEnv();
        return ENV_CONFIG[env];
    }

    window.EnvConfig = {
        setEnvironment: setEnvironment,
        getCurrentEnv: getCurrentEnv,
        getConfig: getConfig,
        getBaseUrl: function() {
            return getConfig().baseUrl;
        },
        getLoginUrl: function() {
            return getConfig().loginUrl;
        },
        getProductIntroUrl: function() {
            return getConfig().productIntroUrl;
        },
        getEnvName: function() {
            return getConfig().name;
        },
        clearCache: function() {
            localStorage.removeItem('currentEnv');
            location.reload();
        }
    };
})();
