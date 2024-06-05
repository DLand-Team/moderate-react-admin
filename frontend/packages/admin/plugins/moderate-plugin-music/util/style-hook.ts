const stringIsNull = (s: string | null | undefined): boolean => {
	return s == null || s == '' || s.trim() == '';
}

export const useClass = (content: { [className: string]: boolean }): string => {
	let name = '';
	for (let key in content) {
		if (content[key]) {
			name += key + ' ';
		}
	}
	return name;
}

export const useModuleClass = (
	module: { [className: string]: string },
	content: { [className: string]: boolean },
): string => {
	let name = '';
	for (let key in content) {
		if (content[key]) {
			let n = module[key];
			if (stringIsNull(n)) {
				name += key + ' ';
			} else {
				name += n + ' ';
			}
		}
	}
	return name;
}
