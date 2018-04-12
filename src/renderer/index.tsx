// Initial welcome page. Delete the following line to remove it.
import { h, app, View, ActionsType } from "hyperapp"
import { clipboard, ipcRenderer } from "electron"

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

function beautify(text: string): string {
  return text.replace(/\n/g, ' ');
}

const actions : ActionsType<State, Actions> = {
  clipboardChange: text => ($state, $actions) => {
    let cb = clipboard.readText()
    if(cb !== $state.clipboard && !$state.waiting) {
      ipcRenderer.send("translate",JSON.stringify({
        text: beautify(cb),
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
  <p>{ state.waiting ? '...' : state.translated }</p>
  </div>
)

const main = app(state, actions, view, document.getElementById("app"))

setInterval(main.clipboardChange, 1000, 1) 
ipcRenderer.on("translate-result", (event : any, args : any) => {
  main.receive(args);
})