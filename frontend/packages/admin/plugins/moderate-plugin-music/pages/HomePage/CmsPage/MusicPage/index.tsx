import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { AudioEffectPlayer } from "../../../../player/audio-effect.player";
import { AudioContextPlayer } from "../../../../player/impl/audio-context.player";
import { AudioEle2CtxPlayer } from "../../../../player/impl/audio-ele2ctx.player";
import VinylMachineComponent, {
	VinylMachineRef,
} from "./vinyl-machine/vinyl-machine.component";
import { MusicDetailGetter } from "../../../../data/music-detail.getter";
import { MusicDataType } from "../../../../data/music-data.type";
import LyricListComponent from "./lyric-list/lyric-list.component";
import { Button } from "antd";

const IndexComponent: React.FC = () => {
	const [musicInfo, setMusicInfo] = useState<MusicDataType>();

	const secondRef = useRef<number>(0);
	const [allSecond, setAllSecond] = useState<number>(0);
	const [currentSecond, setCurrentSecond] = useState<number>(0);
	const [percentage, setPercentage] = useState<number>(0);
	const [playing, setPlaying] = useState<boolean>(false);

	const vinylMachine = useRef<VinylMachineRef>(null);
	const effect1Ref = useRef<HTMLDivElement>(null);
	const effect3Ref = useRef<HTMLDivElement>(null);

	const player = useRef<AudioEffectPlayer>();

	const createPlayer = async (type: string) => {
		if (
			effect1Ref.current == null ||
			vinylMachine.current?.effect2Dom == null ||
			effect3Ref.current == null
		) {
			return;
		}
		if (player.current != null) {
			return;
		}
		let result = await MusicDetailGetter.get(2); // 加载编号为*的歌曲
		setMusicInfo(result);
		switch (type) {
			case "AudioContextPlayer":
				player.current = new AudioContextPlayer({
					file: result.audio,
					musicEffectOption: {
						e1: { show: true, dom: effect1Ref.current },
						e2: {
							show: true,
							dom: vinylMachine.current.effect2Dom,
						},
						e3: { show: true, dom: effect3Ref.current },
					},
					loadFinish: (e: number) => {
						setAllSecond(e);
						secondRef.current = e;
					},
					playCallback: (e: number) => {
						setCurrentSecond(e);
						setPercentage((100 * e) / secondRef.current);
					},
					statusToPlayCallback: () => {
						console.log("statusToPlayCallback");
						setPlaying(true);
					},
					statusToPauseCallback: () => {
						console.log("statusToPauseCallback");
						setPlaying(false);
					},
					finishCallback: () => {
						console.log("finishCallback");
					},
				});
				break;
			case "AudioEle2CtxPlayer":
				player.current = new AudioEle2CtxPlayer({
					file: result.audio,
					musicEffectOption: {
						e1: { show: true, dom: effect1Ref.current },
						e2: {
							show: true,
							dom: vinylMachine.current.effect2Dom,
						},
						e3: { show: true, dom: effect3Ref.current },
					},
					loadFinish: (e: number) => {
						setAllSecond(e);
						secondRef.current = e;
					},
					playCallback: (e: number) => {
						setCurrentSecond(e);
						setPercentage((100 * e) / secondRef.current);
					},
					statusToPlayCallback: () => {
						console.log("statusToPlayCallback");
						setPlaying(true);
					},
					statusToPauseCallback: () => {
						console.log("statusToPauseCallback");
						setPlaying(false);
					},
					finishCallback: () => {
						console.log("finishCallback");
					},
				});
				break;
			default:
				break;
		}
	};

	const turnTo = (time: number): void => {
		player.current?.turnTo(time);
		vinylMachine.current?.videoTurnTo(time);
	};

	const destroy = () => {
		player.current?.destroy();
		player.current = undefined;
		setMusicInfo(undefined);
		setAllSecond(0);
		setCurrentSecond(0);
		setPercentage(0);
		setPlaying(false);
	};

	useEffect(() => {
		createPlayer("AudioContextPlayer");
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.effect1} ref={effect1Ref}></div>
			<div className={styles.main}>
				<div className={styles.left}>
					<div className={styles.image}>
						<VinylMachineComponent
							ref={vinylMachine}
							musicInfo={musicInfo}
							playing={playing}
							currentSecond={currentSecond}
						></VinylMachineComponent>
					</div>
					<div className={styles.info}>
						<div className={styles.effect3} ref={effect3Ref}></div>
					</div>
				</div>
				<div className={styles.right}>
					<LyricListComponent
						musicInfo={musicInfo}
						allSecond={allSecond}
						currentSecond={currentSecond}
						turnTo={(e) => turnTo(e)}
					></LyricListComponent>
				</div>
			</div>
			<div className={styles.control}>
				<div className={styles.buttons}>
					<Button onClick={() => createPlayer("AudioContextPlayer")}>
						加载AudioContextPlayer
					</Button>
					<Button onClick={() => createPlayer("AudioEle2CtxPlayer")}>
						加载AudioEle2CtxPlayer
					</Button>
					<Button onClick={() => player.current?.resume()}>
						播放
					</Button>
					<Button onClick={() => player.current?.suspend()}>
						暂停
					</Button>
					<Button onClick={() => turnTo(secondRef.current * 0.3)}>
						跳转到30%
					</Button>
					<Button onClick={() => turnTo(secondRef.current * 0.5)}>
						跳转到50%
					</Button>
					<Button onClick={() => turnTo(secondRef.current * 0.7)}>
						跳转到70%
					</Button>
					<Button onClick={() => player.current?.stop()}>停止</Button>
					<Button onClick={() => destroy()}>销毁</Button>
				</div>
				<div className={styles.info}>
					<span>总时长：{allSecond.toFixed(2)}秒</span>
					<span>当前已播放：{currentSecond.toFixed(2)}秒</span>
					<span>进度：{percentage.toFixed(2)}%</span>
				</div>
			</div>
		</div>
	);
};

export default IndexComponent;
