export interface Config {
  fontSize: number
  alwaysOnTop: boolean
  ignoreLineBreak: boolean
  targetLanguage: string
}

export const defaultConfig: Config = {
  fontSize : 18,
  alwaysOnTop : false,
  ignoreLineBreak : true,
  targetLanguage : "ja"
}

const ls = localStorage.getItem("settings")
export const config: Config = ls !== null ?
  JSON.parse(ls) :
  defaultConfig