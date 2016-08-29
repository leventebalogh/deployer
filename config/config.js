module.exports = {
    // Common (available on both client & server)
    apiBaseUrl: '/rest',

    // Server (only available on the server side)
    server: {
        loglevel: 'info',
        modules: [
            'mongodb',
            'authenticate',
            'config',
            'layouts',
            'ionicons',
            'deployer'
            'notifications'
        ],
        port: 8080,
        mongodb: {
            url: 'mongodb://localhost'
        }
    },

    // Client (only available on the client side)
    client: {},

    // Menu
    menu: {
        client: {
            brand: {
                name: 'Deployer',
                title: 'Deployer - deploy easily',
                link: '/'
            },
            items: [
                { name: 'Login', title: 'Login into our system', link: '/login' }
            ],
            itemsLoggedIn: [
                { name: 'Projects', title: 'Show my projects', link: '/projects' },
                { name: 'Help', title: 'Get more info', link: '/help' },
                { name: 'Log out', title: 'Log out of the system', link: '/rest/logout' }
            ]
        }
    },

    // Authentication
    authentication: {
        login: {
            url: '/login',
            apiUrl: '/rest/login',
            successRedirect: '/projects',
            enabled: true
        },
        registration: {
            url: '/register',
            apiUrl: '/rest/register',
            successRedirect: '/',
            enabled: false
        },
        logout: {
            url: '/logout',
            apiUrl: '/rest/logout',
            successRedirect: '/login'
        },
        // Server only
        server: {
            strategy: 'local',
            file: 'config/.htpasswd',
            model: 'default',
            secret: 'has_to_be_changed_in_live'
        },
        // Client only
        client: {}
    }
};
