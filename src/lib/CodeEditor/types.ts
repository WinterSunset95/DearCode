export type EditorEvent = 'contentChange' | 'cursorPositionChange' | 'themeChange' | 'editorReady';

export type ContentChangeData = {
	key: string;
	keyCode: number;
	row: number;
	col: number;
};

export type EditorStatus = {
	theme: string;
	focused: boolean;
}

