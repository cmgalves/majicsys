import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push, set, remove, update } from "firebase-tools"
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  dadosfire: {
    apiKey: "AIzaSyB0cmR7NTJQjxsBCAmU28TJ9gx6MN8dFHE",
    authDomain: "majicserv.firebaseapp.com",
    projectId: "majicserv",
    storageBucket: "majicserv.firebasestorage.app",
    messagingSenderId: "677881248069",
    appId: "1:677881248069:web:6de8e1b31365e1300fa62c",
    measurementId: "G-3105RKTG6R"
  }
};