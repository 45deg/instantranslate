import { h, View } from "hyperapp"

import { State } from "../states/State"
import { Actions } from "../actions/Action"
import { Config } from "./Config"

export const Root: View<State, Actions> = (state, actions) => (
  <div>
    <x-card>
      <main> { 
        state.showConfig ? <Config /> :
        state.waiting ? <x-throbber></x-throbber> : 
        <p style={{ fontSize: state.config.fontSize + 'px', opacity: state.enabled ? 1 : 0.7 }}>
          { 
            state.error !== null ? <span class="error">Error: {state.error}</span> : 
            state.translated 
          }
        </p>
      }</main>
    </x-card>
    <div class="btn-control">
      <x-button skin="iconic" onclick={actions.toggleWatch} >
        <x-icon name={ state.enabled ? "pause" : "play-arrow" } iconset="./imgs/icons--images.svg">
        </x-icon>
      </x-button>
    </div>
    <div class="btn-config">
      <x-button skin="iconic" togglable onclick={actions.toggleConfig}>
        <x-icon name="settings" iconset="./imgs/icons--images.svg"></x-icon>
      </x-button>
    </div>
  </div>
)