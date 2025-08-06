import AppController from './controller/AppContoller.js';

const App = new AppController();
await App.initialize();
console.log('App initialized!');
