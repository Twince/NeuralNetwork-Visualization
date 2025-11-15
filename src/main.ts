import AppController from './controller/AppController.js';

const App = new AppController();
await App.initialize();
console.log('App initialized!');
