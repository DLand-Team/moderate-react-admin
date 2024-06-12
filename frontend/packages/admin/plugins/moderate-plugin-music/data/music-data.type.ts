export type MusicDataType = {

	title: string,
	singer: string,

	img: string,
	audio: string,
	video?: string,
	videoPoster?: string,

	lyrics: MusicDataLyricsType,

}

export type MusicDataLyricsType = Array<{
	time: string,
	ori: string, // 普通歌词
	tran: string,
	abc: string
}>
