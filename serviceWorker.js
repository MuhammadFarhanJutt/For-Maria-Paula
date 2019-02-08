/**writing this code for Maria Paula
*@author Muhammad Farhan 
*@class this is web push notification progressive ap sample
***********************************/
self.addEventListener('push', function (event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        console.log('[SW] service not granted');
        return;
    }

    const sendNotification = function(title, body, icon, target) {
        return self.registration.showNotification(title, {
            body,
            icon: icon,
            vibrate: [200, 100, 200, 100, 200, 100, 400],
            tag: target,
            badge: '',
            actions: [
                { action: 'snooze_30', title: '30' },
                { action: 'snooze_60', title: '60' },
                { action: 'gotosetting', title: 'Config' }
            ]
        });
    };
    if (event.data) {
        var dataJson = event.data.json();
        const title = dataJson.title;
        const body = dataJson.body;
        let icon = dataJson.icon;
        var target = dataJson.url;
        if(!icon){
            icon = 'https://hotprospector.com/glu/assests/images/icon_notifications.png'
        }
        var maxActions = Notification.maxActions;
        event.waitUntil(sendNotification(title,body,icon,target));
    }
});
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    var body = event.notification.body || false;
    var title = event.notification.title || false;
    let url = event.notification.tag;
    var target = event.notification.tag || false;
    var badge = event.notification.badge || false;
    var snoozehaystack = ['snooze_10','snooze_30','snooze_60'];
    if(isInArray(event.action, snoozehaystack)){
        
    }else if (event.action == 'gotosetting') {
        gotoWindow(url);
    }else{
        event.waitUntil( gotoWindow(url) );
    }
});
var gotoWindow = function(path =''){
    if (clients.openWindow) {
        return clients.openWindow(path);
    }
}
var postRequest = function(url = '', data = {}) {
    return fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data),
    })
    .then(response => response.json());
}
var isInArray = function (needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle){
            return haystack[i];
        }
    }
    return false;
}
var afterval = function (str){
    return str.substr(str.lastIndexOf('_') + 1);
}