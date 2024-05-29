/*
# 3. Screen

A screen is a collection of pixels in a 2D array (an array of array of Pixels).
The Screen class below has a private field called pixels that stores the 2D array of Pixels.
The class has a method called getPixel that returns the Pixel at a given row and column.
The class also has a method called setPixel that sets the Pixel at a given row and column.

The constructor of the Screen class takes a 2D array of initial pixels and creates a deep copy of
the data, so that changes to the original arrays or pixel objects do not affect the Screen object.

3.1. Modify the constructor to also check that the input array is rectangular (all rows have the same length).
    If the input array is not rectangular, throw an error with the message "Input array is not rectangular".
    If the input array is empty, the constructor should not throw an error.
3.2. Modify the getPixel and setPixel methods to throw an error if the row or column is out of bounds.
    The error message should be "Index out of bounds: [row], [col]" (without square brackets).
    The row and column indices are 0-based.
    **NOTE**: You can add new fields or methods to the class if needed, such as a method to get the number of
        rows or columns.
*/

import { Pixel } from "./pixel";

/**
 * A class representing a screen with a 2D array of pixels.
 */
export class Screen {
    private pixels: Pixel[][];
    private rows: number;
    private columns: number;
    constructor(pixels: Pixel[][]) {
        for (let i = 0; i < pixels.length; i++) {
            if (pixels[0].length !== pixels[i].length) {
                throw new Error("Input array is not rectangular");
            }
        }
        this.pixels = this.deepCopy(pixels);
        if (this.pixels.length === 0) {
            this.rows = 0;
            this.columns = 0;
        } else {
            this.rows = this.pixels.length;
            this.columns = this.pixels[0].length;
        }
    }

    /**
     * Create a deep copy of the 2D array of pixels by iterating through each row and column, cloning
     * each pixel in the process.
     * @param pixels The 2D array of pixels to deep copy.
     * @returns A deep copy of the 2D array of pixels.
     */
    private deepCopy(pixels: Pixel[][]): Pixel[][] {
        const deepCopyGrid = [];
        for (let y = 0; y < pixels.length; y++) {
            const deepCopyRow = [];
            for (let x = 0; x < pixels[y].length; x++) {
                deepCopyRow.push(pixels[y][x].clone());
            }
            deepCopyGrid.push(deepCopyRow);
        }
        return deepCopyGrid;
    }

    getRowNumber(): number {
        return this.rows;
    }

    getColNumber(): number {
        return this.columns;
    }

    /**
     * Get the pixel at the given row and column.
     * @param row The row of the pixel.
     * @param col The column of the pixel.
     * @returns The pixel at the given row and column.
     */
    getPixel(row: number, col: number): Pixel {
        if (
            row < 0 ||
            row >= this.getRowNumber() ||
            col < 0 ||
            col >= this.getColNumber()
        ) {
            throw new Error("Index out of bounds: " + row + ", " + col);
        }
        return this.pixels[row][col];
    }

    /**
     * Set the pixel at the given row and column.
     * @param row The row of the pixel.
     * @param col The column of the pixel.
     * @param pixel The pixel to set.
     */
    setPixel(row: number, col: number, pixel: Pixel): void {
        if (
            row < 0 ||
            row >= this.getRowNumber() ||
            col < 0 ||
            col >= this.getColNumber()
        ) {
            throw new Error("Index out of bounds: " + row + ", " + col);
        } else {
            this.pixels[row][col] = pixel.clone();
        }
    }
}
