define([
], function () {
    return {
        app : {
            // default route
            "screen": {
                title: '',
                url: '/',
                component: 'dashboard',
                panelGroup: 'dashboard',
                className: 'dashboard',
                paramsNames: ['query']
            },
            "projects": {
                url: '/projects/',
                title: 'Projects',
                component: "product-list",
                panelGroup: 'product',
                paramsNames: []
            }
        }
    };
});
