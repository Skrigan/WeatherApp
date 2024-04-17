export function openWeatherCodeToIcon(code: number) {
  const firstDigit = Math.floor(code / 100);
  switch (firstDigit) {
    case 2: return 8;
    case 3: return 6;
    case 5: return 13;
    case 6: return 12;
    case 7: return 18;
    case 8:
      if (code === 800) return 1;
      if (code === 801) return 2;
      if (code === 802) return 4;
      return 5;
    default: return 4;
  }
}
