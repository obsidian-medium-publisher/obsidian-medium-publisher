import {
	Editor,
	MarkdownView,
	Notice,
	RequestUrlParam,
	TFile,
	requestUrl,
} from "obsidian";
import { SampleModal } from "../../logo/logo.modal";
import MediumPlugin from "../../../main";
import { MediumApiHandler } from "../../api/medium/handler";
import { PostActiveMdAsync } from "./callback/post-active-md";

export class MediumCommandModule {
	private readonly plugin: MediumPlugin;
	private readonly mediumApiHandler: MediumApiHandler;
	constructor(app: MediumPlugin) {
		this.plugin = app;
		this.mediumApiHandler = new MediumApiHandler(app);

		// 포스팅커맨드
		this.plugin.addCommand({
			id: "post-active-md",
			name: "post active md file to medium",
			callback: PostActiveMdAsync(this.plugin, this.mediumApiHandler),
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
						Accept: "application/json",
						"Content-Type": "application/json",
						Origin: "https://velog.io",
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
						Accept: "application/json",
						"Content-Type": "application/json",
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
