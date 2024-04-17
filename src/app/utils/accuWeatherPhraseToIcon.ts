import { phraseToIcon } from '../data/phraseToIcon';

export function accuWeatherPhraseToIcon(phrase: keyof typeof phraseToIcon) {
  return phraseToIcon[phrase];
}
