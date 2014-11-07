websocket-test
===============

Test if WebSockets message will be sent to server if page is reloading.

It seems that WS is the most reliable method of sending data right before changing the page (ex. on click on external link). XHR and Image requests are canceled by browser, but WS disconnects after finishing sending queued messages.
