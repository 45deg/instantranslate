import { Config, config } from './Config'

export interface State {
  clipboard: string
  translated: string
  waiting: boolean
  error: string | null
  enabled: boolean
  showConfig: boolean
  needReload: boolean
  config: Config
}

export const state: State = {
  clipboard : "",
  translated : "",
  waiting : false,
  error : null,
  enabled : true,
  showConfig: false,
  needReload: false,
  config : config
}