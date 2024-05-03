// Export the code module

// Create a class called Editor
// This class will create a code editor on a given Element
// Passed in the constructor. Preferably a div.

// Some of the methods will be:
// - getEditorContent(): string
// - setEditorContent(content: string): void
// - setEditorTheme(theme: string): void
// - getCursorPosition(): {line: number, column: number}
// - insertAtPosition(content: string, line: number, column: number): void
// Events:
// - onContentChange(callback: (content: string, key: string, keyCode: number, row: number, col: number) => void): void
// - onCursorPositionChange: (line: number, column: number) => void
// - onThemeChange: (theme: string) => void

// Since we are planning to use this as a form of multiplayer editor,
// It should have a method for adding fake cursors on the editor
// We can achieve this by having an absolutely positioned div on the editor
// Which will then contain a blinking cursor div for each instance of a new user
// Methods:
// - addCursor(cursorId: string, userName: string, row: number, col: number): void
// - removeCursor(cursorId: string): void

import type { ContentChangeData, EditorStatus, EditorEvent } from "./types";
import { styleAllElements } from "./styles";

export default class Editor {
	// The element on which the editor is created
	element: HTMLDivElement;
	// Contains the line numbers and the editor
	container: HTMLDivElement;
	lines: HTMLDivElement;
	editor: HTMLDivElement;
	cursorContainer: HTMLDivElement;
	// The current div that is being edited
	currentLine: HTMLDivElement = document.createElement('div');
	// The current row and column
	row: number = 0;
	col: number = 1;
	// Cursors, a key value pair of cursorId and the corresponding cursor element
	cursors: Map<string, HTMLDivElement> = new Map();
	// The editor status
	editorStatus: EditorStatus = {
		theme: 'light',
		focused: false
	};

	// We will need a hidden input element (actually a contenteditable div) in order to get the onscreen keyboard 
	// for mobile
	hiddenInput: HTMLInputElement;

	// The constructor will take an element and create the editor on it
	constructor(element: HTMLDivElement) {
		// Get the element from the constructing function and put it in the class
		this.element = element;
		// Contain both the editor and the line numbers in a flex container
		this.container = document.createElement('div');
		// Create the editor
		this.editor = document.createElement('div');
		// Create the container that holds the cursors
		this.cursorContainer = document.createElement('div');
		// Create the line number div
		this.lines = document.createElement('div');
		// Create the hidden input
		this.hiddenInput = document.createElement('input');
		this.hiddenInput.type = 'text';

		// Style these elements
		styleAllElements(this.container, this.hiddenInput, this.lines, this.editor, this.cursorContainer);

		// Append the editor and the line numbers to the container
		this.container.appendChild(this.lines);
		this.container.appendChild(this.editor);
		this.editor.appendChild(this.cursorContainer);

		// Append the container to the element
		this.element.appendChild(this.container);

		// Append the hidden input to the element
		this.element.appendChild(this.hiddenInput);

		// Initialize a line
		this.addNewLine();
		this.row++;
		this.updateLine();
		this.addCursor('local', 'You', this.row, this.col);
		this.updateCursor('local', this.row, this.col);

		// Listen for click on parent element
		// When the parent element is clicked, focus on the hidden input
		this.element.addEventListener('click', () => {
			this.hiddenInput.focus();
			this.editorStatus.focused = true;
			this.updateCursor('local', this.row, this.col)
		});

		this.hiddenInput.addEventListener('focusout', () => {
			this.editorStatus.focused = false;
			this.updateCursor('local', this.row, this.col)
		})

		this.hiddenInput.addEventListener('keydown', (e) => {
			this.hiddenInput.value = '';
			this.hiddenInput.innerHTML = '';
			if (!this.currentLine) {
				console.log("no current line")
				return;
			}
			if (e.key === 'Enter') {
				// Add a new line
				this.addNewLine();
				// Increment the row and update the current line
				this.row++;
				this.updateLine()
				this.col = 1;
			} else if (e.key == 'Backspace') {
				// Backspace?? Delete the last character
				if (this.col == 1) {
					// If we are at the beginning of the line, go to the previous line... If there is one
					if (this.row > 1) {
						this.row--;
						this.updateLine()
						this.col = this.currentLine.innerHTML.length + 1;
					} else {
						// If we are at the beginning of the first line, do nothing
						console.log("Do nothing")
					}
				} else {
					// If we are not at the beginning of the line, delete the character before the cursor
					const text = this.currentLine.innerHTML;
					this.col--;
					this.currentLine.innerHTML = text.slice(0, this.col-1) + text.slice(this.col);
				}
			} else if (e.keyCode >= 37 && e.keyCode <= 40) {
				if (e.keyCode == 37) {
					// Left arrow
					if (this.col > 1) {
						// Not the first character? Decrement
						this.col--;
					} else {
						// Is the first character? Move to the end of the previous line
						if (this.row > 1) {
							// Is there a previous line?
							this.row--;
							this.updateLine()
							this.col = this.currentLine.innerHTML.length + 1;
						} else {
							// If there is no previous line, do nothing
							console.log("Do nothing")
						}
					}
				} else if (e.keyCode == 38) {
					// Up arrow
					if (this.row > 1) {
						// Is there a previous line?
						this.row--;
						this.updateLine()
						if (this.col > this.currentLine.innerHTML.length) {
							// If the current col is greater than the length of the previous line, set the col to the length of the previous line
							this.col = this.currentLine.innerHTML.length + 1;
						} else {
							// Do nothing
							console.log("Do nothing")
						}
					}
				} else if (e.keyCode == 39) {
					// Right arrow
					if (this.col <= this.currentLine.innerHTML.length) {
						// Not at the end of the present line? Increment
						this.col++;
					} else {
						// Go to the beginning of the next line
						if (this.row < this.editor.children.length - 1) {
							// Is there a next line?
							this.row++;
							this.updateLine()
							this.col = 1;
						} else {
							// If there is no next line, do nothing
							console.log("Do nothing")
						}
					}
				} else if (e.keyCode == 40) {
					// Down arrow
					if (this.row < this.editor.children.length - 1) {
						// Is there a next line?
						this.row++;
						this.updateLine()
						if (this.col > this.currentLine.innerHTML.length) {
							// If the current col is greater than the length of the next line, set the col to the length of the next line
							this.col = this.currentLine.innerHTML.length + 1;
						} else {
							// Do nothing
							console.log("Do nothing")
						}
					}
				}
			} else {
				// If it is a printable character, add it to the current line at the col position
				// and increment the column
				if (e.key.length === 1) {
					let text = this.currentLine.innerHTML;
					this.currentLine.innerHTML = text.slice(0, this.col-1) + e.key + text.slice(this.col-1);
					this.col++;
				}
			}
			this.updateCursor('local', this.row, this.col);
		})
	}

	// Cursor methods
	addCursor(cursorId: string, userName: string, row: number, col: number): void {
		this.cursors.set(cursorId, document.createElement('div'));
		let cursor = this.cursors.get(cursorId);
		cursor!.style.position = 'absolute';
		cursor!.style.width = '2px';
		cursor!.style.height = '1rem';
		// Random color for the cursor
		let color = Math.floor(Math.random()*16777215).toString(16);
		cursor!.style.backgroundColor = `#${color}`;
		cursor!.style.left = `${7.20 * col-1}px`;
		cursor!.style.top = `${row-1}rem`;

		// The username
		let username = document.createElement('div');
		username.textContent = userName;
		username.style.position = 'absolute';
		username.style.top = '-1rem';
		username.style.left = '0';
		username.style.zIndex = '10';
		username.style.fontFamily = 'monospace';
		username.style.fontSize = '0.5rem';
		username.style.padding = '0.1rem';
		// Background color is the opposite of the cursor color
		username.style.backgroundColor = `#${(0xFFFFFF - parseInt(color, 16)).toString(16)}`;
		username.style.color = `#${color}`;
		cursor!.appendChild(username);

		this.cursorContainer.appendChild(cursor!);
	}

	updateCursor(cursorId: string, row: number, col: number): void {
		let cursor = this.cursors.get(cursorId);
		cursor!.style.left = `${7.20 * col-1}px`;
		cursor!.style.top = `${row-1}rem`;
		if (this.editorStatus.focused) {
			cursor!.style.display = 'block';
		} else {
			cursor!.style.display = 'none';
		}
	}

	deleteCursor(cursorId: string): void {
		let cursor = this.cursors.get(cursorId);
		this.cursorContainer.removeChild(cursor!);
		this.cursors.delete(cursorId);
	}

	// Lets make the get and set methods
	// getEditorContent(): string
	// it should return the content of the editor
	getEditorContent(): string {
		return this.element.innerHTML;
	}

	// setEditorContent(content: string): void
	// it should set the content of the editor
	setEditorContent(content: string): void {
		this.element.innerHTML = content;
		this.updateLine()
	}

	// getCursorPosition(): {line: number, column: number}
	getCursorPosition(): {line: number, column: number} {
		return {line: this.row, column: this.col};
	}

	// insertAtPosition(content: string, line: number, column: number): void
	// it should insert content at a given position
	// line and column are 1-indexed
	// 'content' here will be only one character
	insertAtPosition(content: string, line: number, column: number): void {
		// If 'line' is greater than the number of lines, add the necessary amount of lines
		while (line >= this.editor.children.length) {
			this.addNewLine();
			this.updateLine();
		}
		// Get the line div
		let lineDiv = this.editor.children[line] as HTMLDivElement;

		// If the content is not a typable character
		if (content.length !== 1) {
			if (content == 'Backspace') {
				lineDiv.innerHTML = lineDiv.innerHTML.slice(0, column-1) + lineDiv.innerHTML.slice(column);
			}
			return;
		}

		// If the column is greater than the length of the line, append the content to the end of the line
		if (column > lineDiv.innerHTML.length) {
			lineDiv.innerHTML += content;
		} else {
			// If the column is less than the length of the line, insert the content at the column position
			lineDiv.innerHTML = lineDiv.innerHTML.slice(0, column-1) + content + lineDiv.innerHTML.slice(column-1);
		}
	}

	// addNewLine(): void
	addNewLine(): void {
		this.hiddenInput.value = '';
		let linesChildren = this.lines.children.length;
		let editorChildren = this.editor.children.length;

		// Add the new lines
		const newLine = document.createElement('div');
		newLine.style.width = '100%';
		newLine.style.textAlign = 'center';
		newLine.style.height = '1rem'
		newLine.textContent = `${linesChildren + 1}`;
		newLine.style.fontFamily = 'monospace';
		this.lines.appendChild(newLine);

		const newEditorLine = document.createElement('div');
		newEditorLine.style.width = '100%';
		newEditorLine.style.height = '1rem';
		newEditorLine.style.fontFamily = 'monospace';
		newEditorLine.textContent = '';
		this.editor.appendChild(newEditorLine);
	}

	updateLine(): void {
		if (this.row > this.editor.children.length) {
			this.currentLine = this.editor.children[this.editor.children.length - 1] as HTMLDivElement;
		} else {
			this.currentLine = this.editor.children[this.row] as HTMLDivElement;
		}
	}

	// Event listeners
	onContentChange(callback: (e: ContentChangeData) => void) {
		this.hiddenInput.addEventListener('keydown', (e) =>{
			let key = e.key;
			let keyCode = e.keyCode;
			let row = this.row;
			let col = this.col;
			let data: ContentChangeData = {
				key,
				keyCode,
				row,
				col
			}
			callback(data);

		})
	}
}
