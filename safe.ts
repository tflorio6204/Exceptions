/*
# 6. Safe Execution

This module imports a few different classes you have just created that throw errors.
Now you will use try/catch blocks to safely execute code that may throw errors, and handle it in a few different
ways.

6.1. Create a void function called `safeMath` that consumes an `Expression` object and console.logs the result.
    If the `Expression` object throws an error, pass the error to console.error instead;
    This demonstrates logging an error as a way to handle it.
    **NOTE:** You must catch the error and pass the error object directly to console.error, not a string message.
6.2. Create a class named `SilentAccount` that extends `ExceptionalAccount` and overrides both the `withdraw` 
    and `deposit` methods to catch any errors and ignore them. The methods should always return 0 if an error 
    occurred.
    This demonstrates silencing an error as a way to handle it.
6.3. Create a class named `Laptop` that composes an `OperatingSystem` object with a field named `os`.
    Add a method called `writeFile` that consumes a filename (string) and contents (string), and either creates
    the file if it does not exist or overwrites the contents if it does.
    This demonstrates using a default value as a way to handle an error.
    **Note:** I said composes, not extends. Do not use inheritance here.
6.4. Create a new method named `loadStartupFile` in the `Laptop` class that consumes nothing but returns
    the contents of a file named "startup.txt" if it exists. If the file does not exist, throw an error
    with the message "Startup file not found".
    This demonstrates catching an error and rethrowing it with a different message.
6.5. The `colorLog` method of the `utilities/colorize` module can be used to colorize and log text.
    When you pass a string to the `colorLog` function, you can include commands in square bracket to change the
    output color and style. Here is an example of how to use the `colorLog` method to make some red and green text:
    ```typescript
    colorLog("[red]", "This text will be red.");
    colorLog("[green]", "This text will be green.");
    colorLog("[reset]");
    ```
    Notice that the `reset` command at the end resets the color to the default, this is important to do at the
    end of the string, or the rest of the terminal output may be affected!

    Create a function named `colorMath` that consumes an `Expression` object similar to `safeMath`.
    - If no error is thrown, `colorLog` the result in `"[blue]"` text.
    - If an error is thrown, `colorLog` the message `"Oh no!"` in `"[yellow]"` text.
    - Finally, regardless of whether an error was thrown or not, `colorLog` the "[reset]" command to reset
        the terminal.

    This demonstrates using the finally block to ensure that a command is always executed after the try/catch.
    
    **NOTE**: You should not use the console.log or console.error function this time, just colorLog the error
        message in red text.
*/

import { ExceptionalAccount } from "./bank";
import { Expression } from "./math";
import { OperatingSystem } from "./os";
import { EditableFile } from "./utilities/files";
import { colorLog } from "./utilities/colorize";

export function safeMath(expression: Expression): void {
    try {
        console.log(expression.evaluate());
    } catch (e) {
        console.error(e);
    }
}

export function colorMath(expression: Expression): void {
    try {
        colorLog("[blue]", expression.evaluate());
    } catch (e) {
        colorLog("[yellow]", "Oh no!");
    } finally {
        colorLog("[reset]");
    }
}

export class SilentAccount extends ExceptionalAccount {
    deposit(amount: number): number {
        try {
            return super.deposit(amount);
        } catch (e) {
            return 0;
        }
    }
    withdraw(amount: number): number {
        try {
            return super.withdraw(amount);
        } catch (e) {
            return 0;
        }
    }
}

export class Laptop {
    private os: OperatingSystem;
    constructor() {
        this.os = new OperatingSystem();
    }
    writeFile(filename: string, contents: string): void {
        try {
            this.os.openFile(filename).write(contents);
        } catch (e) {
            this.os.createFile(new EditableFile(filename, contents));
        }
    }
    loadStartupFile(): string {
        try {
            return this.os.openFile("startup.txt").getContents();
        } catch (e) {
            throw new Error("Startup file not found");
        }
    }
}
