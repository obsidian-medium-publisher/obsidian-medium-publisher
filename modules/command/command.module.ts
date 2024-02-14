import { Editor, MarkdownView, Notice, RequestUrlParam, TFile, requestUrl } from "obsidian";
import { SampleModal } from "../logo/logo.modal";
import MediumPlugin from "../../main";

export class CommandModule {
	private plugin: MediumPlugin;
	constructor(app: MediumPlugin) {
		this.plugin = app;



		// ==================================
		async function getUserId() {
			const url = "https://api.medium.com/v1/me";
			console.log('app', app);
			console.log('app.settingModule', app.settingModule);
			console.log('app.settingModule.settings', app.settingModule.settings);
			const token = app.settingModule.settings.mySetting;
			console.log('token: ', token);
			const requestUrlParam: RequestUrlParam = {
				method: "GET",
					headers: {
						'Authorization': `Bearer ${token}`,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
				url,
			};
			const result = await requestUrl(requestUrlParam);
			console.table(result);
			console.log('your id is...', result?.json?.data?.id);
			const id = result?.json?.data?.id;
			// id를 MyPluginSettings의 userId에 저장
			// this.plugin.settingModule.settings.userId = id;
			if (id === undefined || id === '') throw Error('userId is undefined');
			return id;
		}
		// ==================================

		// setting값을 console.log하는 command 추가.
		this.plugin.addCommand({
			id: "console-log-my-setting",
			name: "Console log my setting",
			callback: () => {
				console.log(this.plugin.settingModule.settings);
			},
		});

		this.plugin.addCommand({
			id: "what-is-my-token-value",
			name: "Console log my token value",
			callback: async () => {
				const url = "https://api.medium.com/v1/me";
				const token = this.plugin.settingModule.settings.mySetting;
				console.log('token: ', token);

				// try {
				// 	const response = await fetch(url, {
				// 		method: "GET",
				// 		headers: {
				// 			// Authorization: `Bearer ${token}`,
				// 			Accept: 'application/json',
				// 			'Content-Type': 'application/json',
				// 		},
				// 	});

				// 	if (response.ok) {
				// 		const data = await response.json();
				// 		console.log(data);
				// 	} else {
				// 		console.error("Request failed:", response.status);
				// 	}
				// } catch (error) {
				// 	console.error("An error occurred:", error);
				// }

				// require('request')('http://example.com/', (error: any, response: any, body: any) => {
				// 		console.log(JSON.parse(body));
				// });
				const requestUrlParam: RequestUrlParam = {
					method: "GET",
						headers: {
							'Authorization': `Bearer ${token}`,
							'Accept': 'application/json',
							'Content-Type': 'application/json',
						},
					url,
				};
				const result = await requestUrl(requestUrlParam);
				console.table(result);
				console.log('your id is...', result?.json?.data?.id);
				const id = result?.json?.data?.id;
				// id를 MyPluginSettings의 userId에 저장
				this.plugin.settingModule.settings.userId = id;
			},
		});

		// 고정된 포스팅객체 post
		this.plugin.addCommand({
			id: "publish-medium-post",
			name: "Publish Medium Post",
			callback: async () => {
				const token = this.plugin.settingModule.settings.mySetting;
				let userId = this.plugin.settingModule.settings.userId;
				if (userId === '') userId = await getUserId();
				const url = `https://api.medium.com/v1/users/${userId}/posts`;
				const result = await requestUrl({
					method: "POST",
						headers: {
							'Authorization': `Bearer ${token}`,
							'Accept': 'application/json',
							'Content-Type': 'application/json',
						},
					url,
					body: JSON.stringify({
						title: "Post by Obsidian plugin",
						contentFormat: "html",
						content: "<h1>Hello, Medium!</h1><p>This is my first Medium post!</p>",
					}),
				});
				console.log(result);
			},
		});

		// 포스팅 유틸함수1 - 현재켜져있는 md파일을 read하여 문자열로 반환하는 함수.
		this.plugin.addCommand({
			id: "read-active-md",
			name: "Read active md file",
			callback: async () => {
				const { vault, workspace } = this.plugin.app;
				const activeView = this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
				// Handle case when the active view is not a Markdown file
				if (!activeView) {
					new Notice("Note not found. click the note and retry 🤔");
					throw new Error("현재 노트가 열려있지 않습니다.");
				}
				// Get File
				const currentFile = activeView.file as TFile;
				// Parse Question
				console.log('currentFile', currentFile);
				const title = currentFile.basename;
				const content = await this.plugin.app.vault.cachedRead(currentFile);
				console.log('content', content);

			}
		});

		// 포스팅커맨드
		this.plugin.addCommand({
			id: "post-active-md",
			name: "post active md file to medium",
			callback: async () => {
				const { vault, workspace } = this.plugin.app;
				const activeView = this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
				// Handle case when the active view is not a Markdown file
				if (!activeView) {
					new Notice("Note not found. click the note and retry 🤔");
					throw new Error("현재 노트가 열려있지 않습니다.");
				}
				const currentFile = activeView.file as TFile;
				const title = currentFile.basename;
				const content = await this.plugin.app.vault.cachedRead(currentFile);

				const token = this.plugin.settingModule.settings.mySetting;
				let userId = this.plugin.settingModule.settings.userId;
				if (userId === '') userId = await getUserId();
				const url = `https://api.medium.com/v1/users/${userId}/posts`;
				const result = await requestUrl({
					method: "POST",
						headers: {
							'Authorization': `Bearer ${token}`,
							'Accept': 'application/json',
							'Content-Type': 'application/json',
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
			}
		});

		// 포스팅 유틸함수2 - 문자열에 이미지가 포함되어 있으면 이미지를 업로드하고 이미지의 url로 변경하는 함수.
		// 	ㄴ 이미지를 업로드하는 한도가 존재하는가? (한도가 존재한다면 한도를 초과하는 이미지는 어떻게 처리할 것인가?)

		// 포스팅 커맨드 - 지정 디렉토리의 모든 파일 업로드.

		this.plugin.addCommand({
			id: "velog-sample-origin",
			name: "velog sample origin",
			callback: async () => {
				const url = "https://velog.io/";
				// const token = this.plugin.settingModule.settings.mySetting;
				// console.log('token: ', token);
				const requestUrlParam: RequestUrlParam = {
					method: "GET",
						headers: {
							// 'Authorization': `Bearer ${token}`,
							'Accept': 'application/json',
							'Content-Type': 'application/json',
							'Origin': 'https://velog.io'
						},
					url,
				};
				const result = await requestUrl(requestUrlParam);
				console.log(result);
				console.log(result?.text);
			},
		});
		this.plugin.addCommand({
			id: "velog-sample",
			name: "velog sample",
			callback: async () => {
				const url = "https://velog.io/";
				// const token = this.plugin.settingModule.settings.mySetting;
				// console.log('token: ', token);
				const requestUrlParam: RequestUrlParam = {
					method: "GET",
						headers: {
							// 'Authorization': `Bearer ${token}`,
							'Accept': 'application/json',
							'Content-Type': 'application/json',
						},
					url,
				};
				const result = await requestUrl(requestUrlParam);
				console.log(result);
				console.log(result?.text);
			},
		});

		// This adds a simple command that can be triggered anywhere
		this.plugin.addCommand({
			id: "open-sample-modal-simple",
			name: "Open sample modal (simple)",
			callback: () => {
				new SampleModal(this.plugin.app).open();
			},
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.plugin.addCommand({
			id: "sample-editor-command",
			name: "Sample editor command",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection("Sample Editor Command");
			},
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.plugin.addCommand({
			id: "open-sample-modal-complex",
			name: "Open sample modal (complex)",
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView =
					this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.plugin.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			},
		});
	}
}
