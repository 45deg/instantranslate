import { ActionsType } from "hyperapp"
import { clipboard, ipcRenderer } from "electron"
import { State } from "../states/State"

export interface Actions {
  clipboardChange(text : string): void,
  receive(text : string): State,
  toggleWatch() : State,
}

export const actions : ActionsType<State, Actions> = {
  clipboardChange: text => ($state, $actions) => {
    let cb = clipboard.readText()
    if(cb !== $state.clipboard && !$state.waiting && $state.enabled) {
      ipcRenderer.send("translate",JSON.stringify({
        text: cb.replace(/\r\n|\n|\r/g, ' '),
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
  }),
  toggleWatch: () => $state => ({
    ...$state,
    enabled: !$state.enabled
  })
}
