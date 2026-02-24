(function() {
    'use strict';

    var ENV_CONFIG = {
        local: {
            name: '本地环境',
            baseUrl: 'http://52order.com',
            loginUrl: 'http://52order.com/login'
        },
        production: {
            name: '生产环境',
            baseUrl: 'http://121.5.177.201',
            loginUrl: 'http://121.5.177.201/login'
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
        getEnvName: function() {
            return getConfig().name;
        }
    };
})();
