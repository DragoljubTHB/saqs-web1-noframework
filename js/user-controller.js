var userController = {
    data: {
        auth0Lock: null,
        config: null
    },
    uiElements: {
        addRowButton02: null
    },
    init: function (config) {
        var that = this;

        this.uiElements.loginButton = $('#auth0-login');

        this.data.config = config;

        this.wireEvents();
    },
    wireEvents: function () {
        var that = this;
    }
};
