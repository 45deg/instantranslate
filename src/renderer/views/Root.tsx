import { h, View } from "hyperapp"

import { State } from "../states/State"
import { Actions } from "../actions/Action"

export const Root: View<State, Actions> = (state, actions) => (
  <div>
    <x-card><main>
      <p>{ state.waiting ? <x-throbber></x-throbber> : state.translated }</p>
    </main></x-card>
    <div class="btn-control">
      <x-button skin="iconic" onclick={actions.toggleWatch}>
        <x-icon name={ state.enabled ? "pause" : "play-arrow" } iconset="./imgs/icons--images.svg">
        </x-icon>
      </x-button>
    </div>
    <div class="btn-config">
      <x-button skin="iconic">
        <x-icon name="settings" iconset="./imgs/icons--images.svg"></x-icon>
      </x-button>
    </div>
  </div>
)