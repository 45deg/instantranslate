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

export const config = defaultConfig