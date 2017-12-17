var userController = {
    data: {
        stompClient: null,
        config: null
    },
    uiElements: {
        containerDiv: null
    },
    init: function (config) {
        let that = this;

        this.uiElements.containerDiv = $('#container');

        this.data.config = config;

        this.wireEvents();

        this.connect();
    },
    wireEvents: function () {
        let that = this;
    },
    connect() {
        const url = configConstants.eisSocketServer.protocolType +
                    configConstants.eisSocketServer.host +
                    ':' +
                    configConstants.eisSocketServer.port +
                    '/' +
                    configConstants.eisSocketServer.endpointName;

        let socket = new SockJS(url);
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/basestations', function (greeting) {
                console.log(JSON.parse(greeting.body).content);
            });
        });
    },
    disconnect() {
        if (stompClient !== null) {
            stompClient.disconnect();
        }
        console.log("Disconnected");
    },
    sendInput() {
        stompClient.send(configConstants.eisSocketServer.inputEndpointName,
                        {},
                        JSON.stringify({'name': $("#name").val()}));
    },
    showResponse(message) {
        console.log(message);
    }
};
