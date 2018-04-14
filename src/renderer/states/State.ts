import { Config, config } from './Config'

export interface State {
  clipboard: string
  translated: string
  waiting: boolean
  enabled: boolean
  showConfig: boolean
  needReload: boolean
  config: Config
}

export const state: State = {
  clipboard : "",
  translated : "",
  waiting : false,
  enabled : true,
  showConfig: false,
  needReload: false,
  config : config
}