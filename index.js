module.exports = (function() {

    var fs = require('fs');
    var SimpleSocket = require('simple-socket');
    var $ = require('jquery');

    var longMessage = fs.readFileSync(__dirname + '/message.txt');
    var $goOut = $('<a href="#" class="disabled">Go out!</a>');


    function sendGet(message) {
        var img = new Image();
        img.src = 'ws://10.10.10.56:8090/test/rest/' + message;

        document.body.appendChild(img);
    }


    var socket = new SimpleSocket({
        url: 'ws://10.10.10.56:8090/test/ws',
        autoConnect: true,
        autoReconnect: true
    });

    socket.on('connect', function() {
        $goOut
        .attr('href', 'http://localhost:1234/')
        .removeClass('disabled')
        .on('click', function() {
            sendGet(longMessage.toString());
            
            socket.send(longMessage.toString());

            console.log(window.performance.now(), 'send');
        });
    });

    socket.on('error', function(err) {
        console.log(err);
    });

    $(window).on('beforeunload', function() {
        console.log(window.performance.now(), 'onload');
    });

    $(function() {
        $(document.body).append($goOut);
    });

})();