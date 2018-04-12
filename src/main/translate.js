import * as gtranslate from "google-translate-api"

export default function translate({ text, to }) {
  return gtranslate(text, { to }).then((res) => res.text);
}