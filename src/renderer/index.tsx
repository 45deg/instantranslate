// Initial welcome page. Delete the following line to remove it.
import { app } from "hyperapp"
import { remote, ipcRenderer } from "electron"

import { state } from "./states/State"
import { actions } from "./actions/Action"
import { Root } from "./views/Root"

// xel framework 
import * as ResizeObserver from 'xel/xel.min'
import 'xel/stylesheets/material.theme.css'
import 'xel/images/icons.svg'
// dirty workaround :P
(window as any).ResizeObserver = ResizeObserver;

// style
import './style.css'


const main = app(state, actions, Root, document.getElementById("app"))

// watch clipboard
setInterval(main.clipboardChange, 1000, 1) 
ipcRenderer.on("translate-result", (event : any, args : any) => {
  main.receive(args);
})

// alwaysOnTop
remote.getCurrentWindow().setAlwaysOnTop(state.config.alwaysOnTop);