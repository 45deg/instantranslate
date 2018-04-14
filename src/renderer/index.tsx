// Initial welcome page. Delete the following line to remove it.
import { app } from "hyperapp"
import { ipcRenderer } from "electron"

import { State } from "./states/State"
import { actions } from "./actions/Action"
import { Root } from "./views/Root"

// xel framework 
import 'xel/xel.min'
import 'xel/stylesheets/material.theme.css'
import 'xel/images/icons.svg'

// style
import './style.css'

const main = app(new State, actions, Root, document.getElementById("app"))

// watch
setInterval(main.clipboardChange, 1000, 1) 
ipcRenderer.on("translate-result", (event : any, args : any) => {
  main.receive(args);
})
