export interface Config {
  fontSize: number
  alwaysOnTop: boolean
  ignoreLineBreak: boolean
  targetLanguage: string
  windowOpacity: number
}

export const defaultConfig: Config = {
  fontSize : 18,
  alwaysOnTop : false,
  ignoreLineBreak : true,
  targetLanguage : "ja",
  windowOpacity: 1
}

const ls = localStorage.getItem("settings")
export const config: Config = ls !== null ?
  { ...defaultConfig, ...JSON.parse(ls) } :
  defaultConfig