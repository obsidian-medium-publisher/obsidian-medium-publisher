import { App, MarkdownView, Notice, requestUrl, TFile } from "obsidian";
import { MediumApiHandler } from "../../../api/medium/handler";
import MediumPlugin from "../../../../main";

export const PostActiveMdAsync = (
	plugin: MediumPlugin,
	handler: MediumApiHandler,
) => {
	return async () => {
		const { vault, workspace } = plugin.app;
		const activeView =
			plugin.app.workspace.getActiveViewOfType(MarkdownView);
		if (!activeView) {
			new Notice("Note not found. click the note and retry 🤔");
			throw new Error("현재 노트가 열려있지 않습니다.");
		}
		const userId = await handler.getUserId();

		const currentFile = activeView.file as TFile;
		const title = currentFile.basename;
		const content = await plugin.app.vault.cachedRead(currentFile);
		await handler.postActiveMd(userId, title, content);
		new Notice(`${title}파일이 성공적으로 Medium에 업로드되었습니다 :)`);
	};
};
