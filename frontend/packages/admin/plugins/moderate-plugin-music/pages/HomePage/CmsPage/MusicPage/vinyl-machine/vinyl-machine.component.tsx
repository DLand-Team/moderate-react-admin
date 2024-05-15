import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import styles from "./vinyl-machine.module.scss";
import { imageDataGetter } from "./image-data";
import { ResizeObserverWrap } from "../../../../../player/ext/resize-observer.wrap";
import { useModuleClass } from "../../../../../util/style-hook";
import { MusicDataType } from "../../../../../data/music-data.type";

export type VinylMachineRef = {
	effect2Dom: HTMLDivElement | null;
	videoTurnTo: (time: number) => void;
};

const VinylMachineComponent = forwardRef<
	VinylMachineRef,
	{
		musicInfo?: MusicDataType;
		playing: boolean;
		currentSecond: number;
		ref?: React.Ref<VinylMachineRef>;
	}
>((props, ref: React.Ref<VinylMachineRef>) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const effect2DomRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const resizeObserver = useRef<ResizeObserverWrap>();
	const stateChangeInterval = useRef<any>();
	const playingRef = useRef<boolean>(props.playing);

	const [hasVideo, setHasVideo] = useState<boolean>(false);
	const videoPlayingRef = useRef<boolean>(false);

	const [imageContentWidth, setImageContentWidth] = useState<number>(0);
	const [imageContentHeight, setImageContentHeight] = useState<number>(0);

	const [effectSwitchContainerWidth, setEffectSwitchContainerWidth] =
		useState<number>(0);
	const [effectSwitchContainerHeight, setEffectSwitchContainerHeight] =
		useState<number>(0);
	const [effectSwitchWidth, setEffectSwitchWidth] = useState<number>(0);
	const [effectSwitchHeight, setEffectSwitchHeight] = useState<number>(0);

	const [vinylPoleContainerWidth, setVinylPoleContainerWidth] =
		useState<number>(0);
	const [vinylPoleContainerHeight, setVinylPoleContainerHeight] =
		useState<number>(0);
	const [vinylPoleWidth, setVinylPoleWidth] = useState<number>(0);
	const [vinylPoleHeight, setVinylPoleHeight] = useState<number>(0);

	const rightSwitchImageIndexRef = useRef<number>(3);
	const [rightSwitchImageIndex, setRightSwitchImageIndex] =
		useState<number>(3);

	useImperativeHandle(ref, () => ({
		effect2Dom: effect2DomRef.current,
		videoTurnTo: (e: number) => playVideo(e),
	}));

	useEffect(() => {
		if (containerRef.current) {
			resizeObserver.current = new ResizeObserverWrap(
				containerRef.current,
				(e) => {
					let width = e.clientWidth;
					let height = e.clientHeight;
					let imageContentWidth = 0;
					let imageContentHeight = 0;
					if (width >= height) {
						imageContentWidth = height;
						imageContentHeight = height;
					} else {
						imageContentWidth = width;
						imageContentHeight = width;
					}
					// effectSwitch
					let effectSwitchWidth = imageContentWidth * 0.08;
					let effectSwitchHeight = effectSwitchWidth * (156 / 90);
					let effectSwitchContainerWidth =
						effectSwitchWidth * ((68 * 2) / 90);
					let effectSwitchContainerHeight =
						effectSwitchHeight * ((115 * 2) / 156);
					// vinylPole
					let vinylPoleWidth = (imageContentHeight * 248) / 990;
					let vinylPoleHeight = imageContentHeight;
					let vinylPoleContainerWidth =
						vinylPoleWidth * ((71 * 2) / 124);
					let vinylPoleContainerHeight =
						vinylPoleHeight * ((384 * 2) / 495);
					// set
					setImageContentWidth(imageContentWidth);
					setImageContentHeight(imageContentHeight);
					setEffectSwitchContainerWidth(effectSwitchContainerWidth);
					setEffectSwitchContainerHeight(effectSwitchContainerHeight);
					setEffectSwitchWidth(effectSwitchWidth);
					setEffectSwitchHeight(effectSwitchHeight);
					setVinylPoleContainerWidth(vinylPoleContainerWidth);
					setVinylPoleContainerHeight(vinylPoleContainerHeight);
					setVinylPoleWidth(vinylPoleWidth);
					setVinylPoleHeight(vinylPoleHeight);
				},
			);
			stateChangeInterval.current = setInterval(() => {
				if (playingRef.current) {
					if (rightSwitchImageIndexRef.current > 0) {
						rightSwitchImageIndexRef.current -= 1;
						setRightSwitchImageIndex(
							rightSwitchImageIndexRef.current,
						);
					}
				} else {
					if (rightSwitchImageIndexRef.current < 3) {
						rightSwitchImageIndexRef.current += 1;
						setRightSwitchImageIndex(
							rightSwitchImageIndexRef.current,
						);
					}
				}
			}, 100);
		}
		return () => {
			clearInterval(stateChangeInterval.current);
			resizeObserver.current?.unmount();
		};
	}, []);

	useEffect(() => {
		setHasVideo(
			props.musicInfo?.video != null && props.musicInfo?.video != "",
		);
	}, [props.musicInfo]);

	useEffect(() => {
		playingRef.current = props.playing;
	}, [props.playing]);

	useEffect(() => {
		if (props.playing) {
			setTimeout(() => {
				playVideo(props.currentSecond);
			});
		} else {
			pauseVideo();
		}
	}, [props.playing]);

	const imageData = () => {
		return imageDataGetter(2);
	};

	const playVideo = (time: number): void => {
		pauseVideo();
		if (hasVideo && videoRef.current != null) {
			videoRef.current.currentTime = time;
			if (props.playing) {
				videoRef.current.play().then((_) => {
					videoPlayingRef.current = true;
				});
			}
		}
	};

	const pauseVideo = (): void => {
		if (hasVideo && videoRef.current != null) {
			videoRef.current.pause();
			videoPlayingRef.current = false;
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.container} ref={containerRef}>
				{/*-- 底图 --*/}
				<div
					className={styles.vinylMachine}
					style={{
						width: imageContentWidth + "px",
						height: imageContentHeight + "px",
					}}
				>
					<img
						className={styles.baseImage}
						src={imageData().player_vinyl_machine}
					></img>
					<img
						className={styles.leftLampImage}
						src={imageData().player_vinyl_sounds_effect_lamp_off}
					></img>
					<img
						className={styles.leftLampImage}
						src={imageData().player_vinyl_sounds_effect_lamp_on}
						style={{
							opacity: props.playing ? 1 : 0,
							transition: props.playing ? "0.25s" : "0",
						}}
					></img>
					<div
						className={styles.effectSwitchContainer}
						style={{
							width: effectSwitchContainerWidth + "px",
							height: effectSwitchContainerHeight + "px",
							transform: props.playing
								? "rotate(-27deg)"
								: "rotate(0deg)",
							transition: props.playing ? "0.25s" : "0",
						}}
					>
						<img
							className={styles.effectSwitchImage}
							src={imageData().player_vinyl_sounds_effect_switch}
							style={{
								width: effectSwitchWidth + "px",
								height: effectSwitchHeight + "px",
							}}
						></img>
					</div>
					<img
						className={styles.leftDigitalEffectImage}
						src={
							imageData()
								.player_vinyl_digital_album_sounds_effect_off
						}
					></img>
					<img
						className={styles.leftDigitalEffectImage}
						src={
							imageData()
								.player_vinyl_digital_album_sounds_effect_on
						}
						style={{
							opacity: props.playing ? 1 : 0,
							transition: props.playing ? "0.25s" : "0",
						}}
					></img>
					<img
						className={styles.rightDigitalPlayStateImage}
						src={
							imageData()
								.player_vinyl_digital_album_play_state_off
						}
					></img>
					<img
						className={styles.rightDigitalPlayStateImage}
						src={
							imageData().player_vinyl_digital_album_play_state_on
						}
						style={{
							opacity: props.playing ? 1 : 0,
							transition: props.playing ? "0.25s" : "0",
						}}
					></img>
					<img
						className={styles.rightSwitchImage}
						src={
							imageData().player_vinyl_switch_list[
								rightSwitchImageIndex
							]
						}
					></img>
				</div>
				{/*-- 特效 --*/}
				<div className={styles.musicEffect2} ref={effect2DomRef}></div>
				{/*-- 磁盘底图 --*/}
				<img
					src={imageData().player_vinyl_disc_base}
					style={{
						width: imageContentWidth + "px",
						height: imageContentHeight + "px",
					}}
					className={useModuleClass(styles, {
						vinylDisc: true,
						vinylDiscPlayAnimation: true,
						playing: props.playing,
						paused: !props.playing,
					})}
				></img>
				{/*-- 碟片底盘 --*/}
				<img
					className={styles.vinylDiscTop}
					src={imageData().player_vinyl_disc_top}
					style={{
						width: imageContentWidth + "px",
						height: imageContentHeight + "px",
					}}
				></img>
				{/*-- 专辑图像 --*/}
				{!hasVideo ? (
					<img
						src={props.musicInfo?.img ? props.musicInfo.img : ""}
						style={{
							width: imageContentWidth + "px",
							height: imageContentHeight + "px",
						}}
						className={useModuleClass(styles, {
							srcImage: true,
							srcImagePlayAnimation: true,
							playing: props.playing,
							paused: !props.playing,
						})}
					></img>
				) : (
					""
				)}
				{/*-- 专辑图像（视频） --*/}
				{hasVideo ? (
					<video
						src={
							props.musicInfo?.video ? props.musicInfo.video : ""
						}
						poster={props.musicInfo?.videoPoster}
						style={{
							width: imageContentWidth + "px",
							height: imageContentHeight + "px",
						}}
						className={useModuleClass(styles, {
							srcImage: true,
							srcImagePlayAnimation: true,
							playing: props.playing,
							paused: !props.playing,
						})}
						ref={videoRef}
						preload="auto"
						aria-hidden="true"
						data-recon-click="covers,onVideoBtnClick,covers,covers"
						data-recon-globalfocus="covers,playOnBrowserActive,covers,covers"
						data-recon-globalblur="covers,onBrowserBlur,covers,covers"
						muted
						playsInline
					></video>
				) : (
					""
				)}
				{/*-- 覆盖层 --*/}
				<img
					src={imageData().player_vinyl_disc_lighting}
					style={{
						width: imageContentWidth + "px",
						height: imageContentHeight + "px",
					}}
					className={useModuleClass(styles, {
						vinylDisc: true,
						vinylDiscPlayAnimation: true,
						playing: props.playing,
						paused: !props.playing,
					})}
				></img>
				{/*-- 扶手 --*/}
				<div
					className={styles.squareContent}
					style={{
						width: imageContentWidth + "px",
						height: imageContentHeight + "px",
					}}
				>
					<div
						style={{
							width: vinylPoleContainerWidth + "px",
							height: vinylPoleContainerHeight + "px",
						}}
						className={useModuleClass(styles, {
							vinylPoleContainer: true,
							vinylPolePlayAnimation: true,
							playing: props.playing,
							paused: !props.playing,
						})}
					>
						<img
							className={styles.vinylPole}
							src={imageData().player_vinyl_pole}
							style={{
								width: vinylPoleWidth + "px",
								height: vinylPoleHeight + "px",
							}}
						></img>
					</div>
				</div>
			</div>
		</div>
	);
});

export default VinylMachineComponent;
