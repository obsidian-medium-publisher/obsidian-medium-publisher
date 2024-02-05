import { ApiInterface } from "../interface/api.interface";
import { requestUrl, RequestUrlResponsePromise } from "obsidian";

export class MediumApi implements ApiInterface {
	baseUrl: string;
	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	deletePost(post: string): RequestUrlResponsePromise {
		return requestUrl({
			url: `${this.baseUrl}/posts/${post}`,
			method: "DELETE",
		});
	}

	getPosts(): RequestUrlResponsePromise {
		return requestUrl({
			url: `${this.baseUrl}/posts`,
			method: "GET",
		});
	}

	modifyPost(post: never): RequestUrlResponsePromise {
		return requestUrl({
			url: `${this.baseUrl}/posts/${post}`,
			method: "PUT",
		});
	}

	publishPost(post: never): RequestUrlResponsePromise {
		return requestUrl({
			url: `${this.baseUrl}/posts`,
			method: "POST",
		});
	}
}
