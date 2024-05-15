import React, { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./lyric-list.module.scss";
import { MusicDataType } from "../../../../../data/music-data.type";

const formatMilliseconds = (time: string): number => {
	let timeArray = time.split(":");
	return (
		Number(timeArray[0]) * 60 * 1000 +
		Number(timeArray[1]) * 1000 +
		Number(timeArray[2])
	);
};

const getColorClass = (): string => {
	let chars = [
		"oriColor1",
		"oriColor1",
		"oriColor1",
		"oriColor1",
		"oriColor2",
		"oriColor2",
		"oriColor3",
		"oriColor3",
		"oriColor4",
		"oriColor5",
		"oriColor6",
		"oriColor7",
		"oriColor8",
		"oriColor9",
	]; // 想让哪个颜色提高触发几率，就多复制几个
	let id = Math.floor(Math.random() * chars.length);
	return chars[id];
};

export type LyricListRef = {};

const LyricListComponent = forwardRef<
	LyricListRef,
	{
		musicInfo?: MusicDataType;
		allSecond: number;
		currentSecond: number;
		turnTo: (e: number) => void;
		ref?: React.Ref<LyricListRef>;
	}
>((props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const lrcItemsRef = useRef<Array<HTMLDivElement | null>>([]);

	const [lyricsHighlightIndex, setLyricsHighlightIndex] = useState<number>(0);
	const lyricsHighlightIndexRef = useRef<number>(0);
	const lastLyricsHighlightIndexRef = useRef<number>(0);
	const [colorClass, setColorClass] = useState<string>("oriColor1");

	useEffect(() => {
		setLyricsHighlightIndex(0);
		lastLyricsHighlightIndexRef.current = 0;
		lyricsHighlightIndexRef.current = 0;
	}, [props.musicInfo]);

	useEffect(() => {
		if (props.musicInfo == null || props.allSecond == 0) {
			return;
		}
		let lyrics = props.musicInfo.lyrics;
		for (let i = 0; i < lyrics.length - 1; i++) {
			let lrcTime = formatMilliseconds(lyrics[i].time) - 1;
			let lrcNextTime = formatMilliseconds(lyrics[i + 1].time);
			if (
				lrcTime / 1000 <= props.currentSecond &&
				props.currentSecond < lrcNextTime / 1000
			) {
				// 使用乘法会丢失精度
				lastLyricsHighlightIndexRef.current =
					lyricsHighlightIndexRef.current;
				lyricsHighlightIndexRef.current = i;
				if (
					lastLyricsHighlightIndexRef.current !=
					lyricsHighlightIndexRef.current
				) {
					lyricsScroll(lyricsHighlightIndexRef.current, false);
				}
				setLyricsHighlightIndex(lyricsHighlightIndexRef.current);
				return;
			}
		}
	}, [props.currentSecond]);

	const lyricsScroll = (index: number, direct: boolean): void => {
		if (
			props.musicInfo == null ||
			containerRef.current == null ||
			lrcItemsRef.current.length == 0
		) {
			return;
		}
		// 第一行
		if (index == 0) {
			scrollTo(0, direct);
			return;
		}
		// 最后一行
		if (index == props.musicInfo.lyrics.length - 1) {
			let allHeight = 0;
			for (let i = 0; i < lrcItemsRef.current.length; i++) {
				let itm = lrcItemsRef.current[i];
				itm && (allHeight += itm.clientHeight);
			}
			scrollTo(allHeight, direct);
			return;
		}
		// 中间行滚动
		let top = 0;
		let topHeight = 0;
		if (containerRef.current.clientHeight >= 105 + 95 + 95) {
			for (let i = 0; i < index - 2; i++) {
				let itm = lrcItemsRef.current[i];
				itm && (topHeight += itm.clientHeight);
			}
			top = topHeight;
		} else {
			let itm = lrcItemsRef.current[index - 1];
			if (itm != null) {
				let thisHeight = itm.clientHeight;
				for (let i = 0; i < index; i++) {
					let itm1 = lrcItemsRef.current[i];
					itm1 && (topHeight += itm1.clientHeight);
				}
				let barHeight = containerRef.current.clientHeight;
				top = topHeight - barHeight / 2 - thisHeight / 2;
			}
		}
		scrollTo(top, direct);
	};
	const scrollTo = (top: number, direct: boolean): void => {
		if (containerRef.current == null) {
			return;
		}
		// DOM在视界范围内时，平滑滚动才生效
		let rect = containerRef.current.getBoundingClientRect();
		let isOutScreen = rect.x >= window.innerWidth;
		containerRef.current.scrollTo({
			top: top,
			behavior: direct || isOutScreen ? "auto" : "smooth",
		});
		// 更新颜色
		setColorClass(getColorClass());
	};

	const turn = (index: number): void => {
		if (props.musicInfo == null) {
			return;
		}
		setLyricsHighlightIndex(index);
		lyricsScroll(index, false);
		props.turnTo(
			formatMilliseconds(props.musicInfo.lyrics[index].time) / 1000
		);
	};

	return (
		<div className={styles.container} ref={containerRef}>
			<div className={styles.lyrics}>
				{props.musicInfo ? (
					<>
						{props.musicInfo.lyrics.map((each, index) => {
							return (
								<div
									key={index}
									ref={(el) =>
										(lrcItemsRef.current[index] = el)
									}
									onClick={() => turn(index)}
									className={
										styles.item +
										(index == lyricsHighlightIndex
											? " " + styles.active
											: "")
									}
								>
									<span
										className={
											styles.ori +
											" " +
											styles[colorClass]
										}
									>
										{each.ori}
									</span>
									<br />
									{each.abc != null && each.abc != "" ? (
										<span className={styles.abc}>
											{each.abc}
										</span>
									) : (
										""
									)}
									{each.abc != null && each.abc != "" ? (
										<br />
									) : (
										""
									)}
									<span className={styles.trans}>
										{each.tran}
									</span>
								</div>
							);
						})}
					</>
				) : (
					""
				)}
			</div>
		</div>
	);
});

export default LyricListComponent;
