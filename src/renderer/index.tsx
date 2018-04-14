// Initial welcome page. Delete the following line to remove it.
import { h, app, View, ActionsType } from "hyperapp"
import { clipboard, ipcRenderer } from "electron"

// xel framework 
import 'xel/xel.min'
import 'xel/stylesheets/material.theme.css'
import 'xel/images/icons.svg'

// style
import './style.css'

interface State {
  clipboard: string,
  translated: string,
  waiting: boolean
}

interface Actions {
  clipboardChange(text : string): void,
  receive(text : string): State,
}

const state: State = {
  clipboard: "",
  translated: "",
  waiting: false,
}

function format(text: string): string {
  return text.replace(/\r\n|\n|\r/g, ' ');
}

const actions : ActionsType<State, Actions> = {
  clipboardChange: text => ($state, $actions) => {
    let cb = clipboard.readText()
    if(cb !== $state.clipboard && !$state.waiting) {
      ipcRenderer.send("translate",JSON.stringify({
        text: format(cb),
        to: "ja"
      }))
      return { ...$state, waiting: true, clipboard: cb }
    } else {
      return $state
    }
  },
  receive: text => $state => ({
    ...$state,
    waiting: false,
    translated: text
  })
}

const view: View<State, Actions> = (state, actions) => (
  <div>
    <x-card><main>
      <p>{ state.waiting ? <x-throbber></x-throbber> : state.translated }</p>
    </main></x-card>
    <div class="btn-control">
      <x-button skin="iconic">
        <x-icon name="pause" iconset="./imgs/icons--images.svg"></x-icon>
      </x-button>
    </div>
    <div class="btn-config">
      <x-button skin="iconic">
        <x-icon name="settings" iconset="./imgs/icons--images.svg"></x-icon>
      </x-button>
    </div>
  </div>
)

const main = app(state, actions, view, document.getElementById("app"))

setInterval(main.clipboardChange, 1000, 1) 
ipcRenderer.on("translate-result", (event : any, args : any) => {
  main.receive(args);
})
