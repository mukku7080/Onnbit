importScripts('https://www.gstatic.com/firebasejs/10.3.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.3.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAtKO5evooW2D2v31SOLzXVemnl3eJsmwI",
  authDomain: "onnbit-64749.firebaseapp.com",
  projectId: "onnbit-64749",
  messagingSenderId: "920396326566",
  appId: "1:920396326566:web:2c851fbd7ba7d581f37667",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Background message:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
