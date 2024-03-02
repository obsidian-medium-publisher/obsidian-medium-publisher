import { RequestUrlResponsePromise } from "obsidian";

export interface ApiInterface {
	baseUrl: string;

	getPosts(): RequestUrlResponsePromise;
	publishPost(post: never): RequestUrlResponsePromise;
	deletePost(post: never): RequestUrlResponsePromise;
	modifyPost(post: never): RequestUrlResponsePromise;
}
