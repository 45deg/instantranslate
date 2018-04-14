import { h, Component } from "hyperapp"

import { State } from "../states/State"
import { Actions } from "../actions/Action"
import * as languages from "google-translate-api/languages"

export const Config: Component<{}, State, Actions> = () => (state, actions) => (
  <div>
    <h1>Configuration</h1>
    <p>
      <x-box>
        <x-label>Font size: </x-label>
        <x-numberinput value={state.config.fontSize} suffix=" px" min="1" max="100">
          <x-stepper disabled="decrement"></x-stepper>
        </x-numberinput>
      </x-box>
    </p>
    <p>
      <x-box>
        <x-label>Language: </x-label>
        <x-select value={state.config.targetLanguage}>
          <x-menu>{ Object.entries(languages)
          .filter(([k,v]) => k !== 'auto' && typeof v === 'string')
          .map(([code, lang]) =>
            <x-menuitem value={code}><x-label>{lang} ({code})</x-label></x-menuitem>
          )}</x-menu>
        </x-select>
      </x-box>
    </p>
    <p>
      <x-box>
        <x-checkbox id="alwaysOnTop"></x-checkbox>
        <x-label for="alwaysOnTop"> Show always on top of other windows</x-label>
      </x-box>
    </p>
    <p>
      <x-box>
        <x-checkbox id="ignorelb"></x-checkbox>
        <x-label for="ignorelb"> Ignore line breaks</x-label>
      </x-box>
    </p>
  </div>
)