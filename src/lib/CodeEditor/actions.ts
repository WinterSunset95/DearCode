
export const actionsInit = (element: HTMLDivElement, container: HTMLDivElement, hiddenInput: HTMLDivElement, lines: HTMLDivElement, editor: HTMLDivElement) =>{
		hiddenInput.addEventListener('keydown', (e) => {
			console.log('Keydown', e.key);
			hiddenInput.innerHTML = ''
		})
}

export const addNewLine = (container: HTMLDivElement, lines: HTMLDivElement, editor: HTMLDivElement, currentLine: HTMLDivElement) => {
	let linesChildren = lines.children.length;
	let editorChildren = editor.children.length;

	const newLine = document.createElement('div');
	newLine.style.width = '100%';
	newLine.style.textAlign = 'center';
	newLine.style.height = '1rem'
	newLine.textContent = `${linesChildren + 1}`;
	newLine.style.fontFamily = 'monospace';
	lines.appendChild(newLine);

	currentLine = document.createElement('div');
	currentLine.style.width = '100%';
	currentLine.style.height = '1rem';
	currentLine.style.fontFamily = 'monospace';
	currentLine.textContent = '';
	editor.appendChild(currentLine);

	console.log(currentLine)
}
