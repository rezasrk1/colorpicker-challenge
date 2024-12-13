export const kernelFunction = function (width, height, hue) {
  const x = this.thread.x % width;
  const y = Math.floor(this.thread.x / width);
  const channel = this.thread.x % 4;

  const normalizedX = x / width;
  const normalizedY = y / height;
  

  // Base RGB values
  let red = 0, green = 0, blue = 0;

  // Lightness (top-to-bottom gradient) and Saturation (left-to-right gradient)
  const lightness = 1 - normalizedY; // Top (white) to bottom (black)
  const saturation = normalizedX;   // Left (desaturated) to right (fully saturated)

  // Calculate hue-based RGB
  if (hue < 1 / 6) { // Red to Yellow
    red = 1;
    green = hue * 6;
    blue = 0;
  } else if (hue < 2 / 6) { // Yellow to Green
    red = 1 - (hue - 1 / 6) * 6;
    green = 1;
    blue = 0;
  } else if (hue < 3 / 6) { // Green to Cyan
    red = 0;
    green = 1;
    blue = (hue - 2 / 6) * 6;
  } else if (hue < 4 / 6) { // Cyan to Blue
    red = 0;
    green = 1 - (hue - 3 / 6) * 6;
    blue = 1;
  } else if (hue < 5 / 6) { // Blue to Magenta
    red = (hue - 4 / 6) * 6;
    green = 0;
    blue = 1;
  } else { // Magenta to Red
    red = 0.5;
    green = 0;
    blue = 0.5 - (hue - 5 / 6) * 6.5;
  }

  // Apply lightness and saturation
  red *= saturation * lightness;
  green *= saturation * lightness;
  blue *= saturation * lightness;

  // Return the appropriate channel value
  if (channel === 0) return red * 255;    // Red channel
  if (channel === 1) return green * 255;  // Green channel
  if (channel === 2) return blue * 255;   // Blue channel
  return 255; // Alpha channel (fully opaque)
};
