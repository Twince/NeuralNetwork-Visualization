import AppController from './controller/AppContoller.js';
import { DataStore } from "./controller/DataStore.js";

const App = new AppController({DataStore});
await App.initialize();
console.log("App initialized!");