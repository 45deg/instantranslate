import { remote } from "electron"
import { ActionsType } from "hyperapp"
import { clipboard, ipcRenderer } from "electron"
import { State } from "../states/State"
import { Config } from "../states/Config"

export interface Actions {
  clipboardChange(text : string): void
  receive(text : string): State
  toggleWatch() : State
  toggleConfig() : State
  updateSetting(data: Partial<Config>) : State
}

export const actions : ActionsType<State, Actions> = {
  clipboardChange: text => ($state, $actions) => {
    let cb = clipboard.readText()
    if(cb !== $state.clipboard && !$state.waiting && $state.enabled) {
      ipcRenderer.send("translate",JSON.stringify({
        text: $state.config.ignoreLineBreak ? cb.replace(/\r\n|\n|\r/g, ' ') : cb,
        to: $state.config.targetLanguage
      }))
      return { waiting: true, clipboard: cb }
    } else {
      return $state
    }
  },
  receive: text => $state => ({
    waiting: false,
    translated: text
  }),
  toggleWatch: () => $state => ({
    enabled: !$state.enabled
  }),
  toggleConfig: () => $state => ({
    showConfig: !$state.showConfig
  }),
  updateSetting: (update : Partial<Config>) => $state => {
    //console.log({ ...$state, config: { ...$state.config, d} })
    if('alwaysOnTop' in update) {
      remote.getCurrentWindow().setAlwaysOnTop(update.alwaysOnTop)
    }
    let updatedConfig = { ...$state.config, ...update }
    localStorage.setItem('settings', JSON.stringify(updatedConfig))
    return { ...$state, config: updatedConfig }
  }
}
