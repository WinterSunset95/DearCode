
export const styleAllElements = (container: HTMLDivElement, hiddenInput: HTMLDivElement, lines: HTMLDivElement, editor: HTMLDivElement, cursorContainer: HTMLDivElement) => {
	container.id = 'editor-container';
	container.style.display = 'flex';
	container.style.width = '100%'
	container.style.height = '100%';
	container.style.overflowY = 'scroll';

	lines.id = 'editor-lines';
	lines.style.width = '2rem';
	lines.style.borderRight = '1px solid #ccc';
	lines.style.fontFamily = 'monospace';
	lines.style.fontFamily = 'monospace';

	editor.id = 'editor';
	editor.style.position = 'relative';
	editor.style.paddingLeft = '0.45rem';
	editor.style.flex = '1';

	cursorContainer.id = 'cursor-container';
	cursorContainer.style.position = 'absolute';
	cursorContainer.style.left = '0';
	cursorContainer.style.top = '0';

	hiddenInput.style.position = 'absolute';
	hiddenInput.style.opacity = '0';
	hiddenInput.style.pointerEvents = 'none';
	hiddenInput.style.zIndex = '-1';
}
