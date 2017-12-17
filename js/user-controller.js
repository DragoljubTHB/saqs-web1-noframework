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

        //this.connectToEisSocketServer();
        this.connectToEisRestServer();
    },
    wireEvents: function () {
        let that = this;
    },
    connectToEisSocketServer() {
        let that = this;
        const url = that.data.config.eisSocketServer.protocolType +
                    that.data.config.eisSocketServer.host +
                    ':' +
                    that.data.config.eisSocketServer.port +
                    '/' +
                    that.data.config.eisSocketServer.endpointName;

        let socket = new SockJS(url);
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/basestations', function (message) {
                console.log(message);
                console.log(message.body);
                console.log(message.body.content);
                console.log(JSON.parse(message.body).content);
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
    },
    connectToEisRestServer() {
        let that = this;

        let url = that.data.config.eisRESTServer.protocolType +
                that.data.config.eisRESTServer.host +
                ':' +
                that.data.config.eisRESTServer.port +
                '/stations';
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            processData: false,
            success: function (data, textStatus, jQxhr) {
                let table = $('#table');

                $(function () {
                    //const parsedData = JSON.parse(data);
                    const parsedData = data
                    let columns = that.buildTableHeaders(parsedData[0]);
                    console.log(columns)
console.log(table.bootstrapTable('destroy'))
                    table.bootstrapTable('destroy');
                    table.bootstrapTable({
                        columns: columns,
                        data: parsedData
                    });
                });
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    },
    buildTableHeaders(cleanJson) {
        let columns = [];
        Object.keys(cleanJson).forEach(function (t){
            columns.push({
                field: t,
                title: t,
                sortable: true
            });
        });
        return columns
    },
};
