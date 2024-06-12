import * as lodash from "lodash-es";
import { MusicDataType } from "./music-data.type";

export class MusicDetailGetter {

	public static get(num: number): Promise<MusicDataType> {
		return new Promise((resolve) => {
			import(`./inst/music-${num}.data.ts`).then((m) => {
				let d = lodash.cloneDeep<MusicDataType>(m.data);
				resolve(d);
			});
		});
	}

}
