const type1 = {
	player_vinyl_machine: '/res/plugins/moderate-plugin-music/player/player_vinyl_digital_album_machine_light.webp',
	player_vinyl_sounds_effect_lamp_off: '',
	player_vinyl_sounds_effect_lamp_on: '',
	player_vinyl_sounds_effect_switch: '',
	player_vinyl_digital_album_sounds_effect_on: '/res/plugins/moderate-plugin-music/player/player_vinyl_digital_album_sounds_effect_light_on.webp',
	player_vinyl_digital_album_sounds_effect_off: '/res/plugins/moderate-plugin-music/player/player_vinyl_digital_album_sounds_effect_light_off.webp',
	player_vinyl_digital_album_play_state_on: '/res/plugins/moderate-plugin-music/player/player_vinyl_digital_album_play_state_on.webp',
	player_vinyl_digital_album_play_state_off: '/res/plugins/moderate-plugin-music/player/player_vinyl_digital_album_play_state_off.webp',
	player_vinyl_switch_list: [],
	player_vinyl_disc_base: '/res/plugins/moderate-plugin-music/player/musicworld_player_record_player_vinyl.png',
	player_vinyl_disc_top: '/res/plugins/moderate-plugin-music/player/player_vinyl_disc_top.png',
	player_vinyl_disc_lighting: '',
	player_vinyl_pole: '/res/plugins/moderate-plugin-music/player/player_vinyl_digital_album_pole_light.webp',
}

const type2 = {
	player_vinyl_machine: '/res/plugins/moderate-plugin-music/player/player_vinyl_machine_light.webp',
	player_vinyl_sounds_effect_lamp_off: '/res/plugins/moderate-plugin-music/player/player_vinyl_sounds_effect_lamp_light_off.png',
	player_vinyl_sounds_effect_lamp_on: '/res/plugins/moderate-plugin-music/player/player_vinyl_sounds_effect_lamp_light_on.webp',
	player_vinyl_sounds_effect_switch: '/res/plugins/moderate-plugin-music/player/player_vinyl_sounds_effect_switch_light.png',
	player_vinyl_digital_album_sounds_effect_on: '',
	player_vinyl_digital_album_sounds_effect_off: '',
	player_vinyl_digital_album_play_state_on: '',
	player_vinyl_digital_album_play_state_off: '',
	player_vinyl_switch_list: [
		'/res/plugins/moderate-plugin-music/player/player_vinyl_switch_light_1.webp',
		'/res/plugins/moderate-plugin-music/player/player_vinyl_switch_light_2.webp',
		'/res/plugins/moderate-plugin-music/player/player_vinyl_switch_light_3.webp',
		'/res/plugins/moderate-plugin-music/player/player_vinyl_switch_light_4.webp',
	],
	player_vinyl_disc_base: '/res/plugins/moderate-plugin-music/player/player_vinyl_disc_lighting.png',
	player_vinyl_disc_top: '/res/plugins/moderate-plugin-music/player/player_vinyl_disc_top.png',
	player_vinyl_disc_lighting: '/res/plugins/moderate-plugin-music/player/player_vinyl_digital_album_disc_lighting.png',
	player_vinyl_pole: '/res/plugins/moderate-plugin-music/player/player_vinyl_pole_light.webp',
}

const type3 = {
	player_vinyl_machine: '/res/plugins/moderate-plugin-music/player/player_vinyl_machine_dark.png',
	player_vinyl_sounds_effect_lamp_off: '/res/plugins/moderate-plugin-music/player/player_vinyl_sounds_effect_lamp_dark_off.webp',
	player_vinyl_sounds_effect_lamp_on: '/res/plugins/moderate-plugin-music/player/player_vinyl_sounds_effect_lamp_dark_on.webp',
	player_vinyl_sounds_effect_switch: '/res/plugins/moderate-plugin-music/player/player_vinyl_sounds_effect_switch_dark.png',
	player_vinyl_digital_album_sounds_effect_on: '',
	player_vinyl_digital_album_sounds_effect_off: '',
	player_vinyl_digital_album_play_state_on: '',
	player_vinyl_digital_album_play_state_off: '',
	player_vinyl_switch_list: [
		'/res/plugins/moderate-plugin-music/player/player_vinyl_switch_dark_1.webp',
		'/res/plugins/moderate-plugin-music/player/player_vinyl_switch_dark_2.webp',
		'/res/plugins/moderate-plugin-music/player/player_vinyl_switch_dark_3.webp',
		'/res/plugins/moderate-plugin-music/player/player_vinyl_switch_dark_4.webp',
	],
	player_vinyl_disc_base: '/res/plugins/moderate-plugin-music/player/player_vinyl_disc_lighting.png',
	player_vinyl_disc_top: '/res/plugins/moderate-plugin-music/player/player_vinyl_disc_top.png',
	player_vinyl_disc_lighting: '/res/plugins/moderate-plugin-music/player/player_vinyl_digital_album_disc_lighting.png',
	player_vinyl_pole: '/res/plugins/moderate-plugin-music/player/player_vinyl_pole_dark.webp',
}

export const imageDataGetter = (type: number) => {
	switch (type) {
		case 1:
			return type1;
		case 2:
			return type2;
		case 3:
			return type3;
		default:
			return type3;
	}
}
