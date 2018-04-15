import { h, Component } from "hyperapp"

import { State } from "../states/State"
import { Actions } from "../actions/Action"

// @ts-ignore:7016
import * as languages from "google-translate-api/languages"

interface ValueChangedEvent<T> {
  target : {
    value: T
  }
}
interface ToggleChangedEvent {
  target : {
    toggled: boolean
  }
}

export const Config: Component<{}, State, Actions> = () => (state, actions) => (
  <div>
    <h1>Configuration</h1>
    <p>
      <x-box>
        <x-label>Font size: </x-label>
        <x-numberinput value={state.config.fontSize} suffix=" px" min={1} max={100}
          onchange={(e : ValueChangedEvent<number>) => actions.updateSetting({ fontSize: e.target.value }) }>
          <x-stepper></x-stepper>
        </x-numberinput>
      </x-box>
    </p>
    <p>
      <x-box>
        <x-label>Language: </x-label>
        <x-select value={state.config.targetLanguage}
          ontoggle={(e : ValueChangedEvent<string>) => actions.updateSetting({ targetLanguage: e.target.value })}>
          <x-menu>{ Object.entries(languages)
          .filter(([k,v]) => k !== 'auto' && typeof v === 'string')
          .map(([code, lang]) =>
            <x-menuitem value={code} key={code}><x-label>{lang} ({code})</x-label></x-menuitem>
          )}</x-menu>
        </x-select>
      </x-box>
    </p>
    <p>
      <x-box>
        <x-checkbox id="alwaysOnTop" toggled={state.config.alwaysOnTop} 
          ontoggle={(e : ToggleChangedEvent) => actions.updateSetting({ alwaysOnTop: e.target.toggled })}></x-checkbox>
        <x-label for="alwaysOnTop"> Show always on top of other windows</x-label>
      </x-box>
    </p>
    <p>
      <x-box>
        <x-checkbox id="ignorelb" toggled={state.config.ignoreLineBreak} 
          ontoggle={(e : ToggleChangedEvent) => actions.updateSetting({ ignoreLineBreak: e.target.toggled })}></x-checkbox>
        <x-label for="ignorelb"> Ignore line breaks</x-label>
      </x-box>
    </p>
    <p>
      <x-box>
        <x-label>Window opacity: </x-label>
        <x-slider min="0" max="1" step="0.01" value={state.config.windowOpacity}
          onchangeend={(e : ValueChangedEvent<number>) => actions.updateSetting({ windowOpacity: e.target.value })}></x-slider>
        <x-label> {state.config.windowOpacity}</x-label>
      </x-box>
    </p>
  </div>
)