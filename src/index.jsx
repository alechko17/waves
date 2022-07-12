import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App'



//  async function clicked (){
//      const result = await myApp.sayHello("Hello from client");
//      console.log(result);
//  }


const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);