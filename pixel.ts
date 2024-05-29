/*
# 1. Pixel

The Pixel class below has red, green, and blue fields that represent the color of the pixel.
The class allows the values to be outside of the range 0-255, even though that is not valid for RGB values.
This is beneficial for cases where colors are being manipulated, but eventually the values must be valid.
In particular, when the user calls the `getRGB` method, an error should be thrown if the values are outside of the valid range.

1.1. Modify the getRGB() method to throw an error if the red, green, or blue values are outside of the valid range.
    The error message should be "Invalid RGB values: [red], [green], [blue]" (without square brackets).
    You might find it helpful to create a helper function like `inRange` to check if a value is in the valid range.

1.2. Define a new function called `makeColor` that takes a string as input and returns a Pixel object.
    The string will be one of "red", "green", or "blue".
    The function should return a Pixel object with the corresponding color.
    If the string is not recognized, the function should throw an error with the message:
    "Unknown color: [color]" (without square brackets).
    **NOTE**: This is a function, not a method. It creates a new Pixel object, rather than modifying one.
*/

/**
 * A class representing a pixel with red, green, and blue color values.
 */

function inRange(r: number, g: number, b: number): string {
    if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
        throw new Error("Invalid RGB values: " + r + ", " + g + ", " + b);
    }
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

export class Pixel {
    private red: number;
    private green: number;
    private blue: number;

    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    /**
     * Create a new Pixel object with the same red, green, and blue values.
     * @returns A new Pixel object with the same red, green, and blue values.
     */
    clone(): Pixel {
        return new Pixel(this.red, this.green, this.blue);
    }

    /**
     * Get the RGB color string representation of the pixel.
     * @returns The RGB color string.
     * @throws Error if the red, green, or blue values are outside of the valid range.
     */
    getRGB(): string {
        return inRange(this.red, this.green, this.blue);
    }
}

export function makeColor(color: string): Pixel {
    if (color === "red") {
        return new Pixel(255, 0, 0);
    } else if (color === "green") {
        return new Pixel(0, 255, 0);
    } else if (color === "blue") {
        return new Pixel(0, 0, 255);
    } else {
        throw new Error("Unknown color: " + color);
    }
}
