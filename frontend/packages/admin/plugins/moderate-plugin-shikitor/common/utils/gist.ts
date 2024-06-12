export interface GistFile {
	filename: string;
	size: number;
	content: string;
	language: string;
}
interface Gist {
	url: string;
	html_url: string;
	files: Record<string, GistFile>;
	history: {
		version: string;
		url: string;
	}[];
	owner: {
		login: string;
		url: string;
		avatar_url: string;
	};
}
export async function getGist(hash: string, fileName?: string, _?: string) {
	const json = await fetch(`https://api.github.com/gists/${hash}`).then(
		(res) => res.json(),
	);
	if ("message" in json) {
		throw new Error(json.message);
	}
	const { html_url: htmlUrl, files } = json as Gist;
	return {
		htmlUrl,
		file: files[fileName ?? Object.keys(files)[0]] as GistFile | undefined,
		files,
	};
}
