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
		const currentFile = activeView.file as TFile;
		const title = currentFile.basename;
		const content = await plugin.app.vault.cachedRead(currentFile);

		const token = plugin.settingModule.settings.mySetting;
		let userId = plugin.settingModule.settings.userId;
		if (userId === "") userId = await handler.getUserId();
		const url = `https://api.medium.com/v1/users/${userId}/posts`;
		const result = await requestUrl({
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			url,
			body: JSON.stringify({
				title,
				contentFormat: "markdown",
				content,
			}),
		});
		console.log(result);
		new Notice(`${title}파일이 성공적으로 Medium에 업로드되었습니다 :)`);
	};
};
