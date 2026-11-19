import hulp24 from '#lib/assets/iconen/hulp-24.svg';
import kaart24 from '#lib/assets/iconen/kaart-24.svg';
import kaartje24 from '#lib/assets/iconen/kaartje-24.svg';
import kist18 from '#lib/assets/iconen/kist-18.svg';
import kist21 from '#lib/assets/iconen/kist-21.svg';
import kist22 from '#lib/assets/iconen/kist-22.svg';
import kist32 from '#lib/assets/iconen/kist-32.svg';
import molen17 from '#lib/assets/iconen/molen-17.svg';
import molen21 from '#lib/assets/iconen/molen-21.svg';
import molen30 from '#lib/assets/iconen/molen-30.svg';
import pen20 from '#lib/assets/iconen/pen-20.svg';
import pin22 from '#lib/assets/iconen/pin-22.svg';
import play28 from '#lib/assets/iconen/play-28.svg';
import slot15 from '#lib/assets/iconen/slot-15.svg';
import slot16 from '#lib/assets/iconen/slot-16.svg';
import speaker22 from '#lib/assets/iconen/speaker-22.svg';
import stempel22 from '#lib/assets/iconen/stempel-22.svg';
import verrekijker17 from '#lib/assets/iconen/verrekijker-17.svg';
import verrekijker24 from '#lib/assets/iconen/verrekijker-24.svg';
import verrekijker28 from '#lib/assets/iconen/verrekijker-28.svg';
import vinkje18 from '#lib/assets/iconen/vinkje-18.svg';
import vlecht17 from '#lib/assets/iconen/vlecht-17.svg';
import vlecht21 from '#lib/assets/iconen/vlecht-21.svg';
import vlecht30 from '#lib/assets/iconen/vlecht-30.svg';
import wind17 from '#lib/assets/iconen/wind-17.svg';
import wind21 from '#lib/assets/iconen/wind-21.svg';
import wind30 from '#lib/assets/iconen/wind-30.svg';

/*
 * Iconen uit Figma ("Design · v4"), per vorm in de groottes die het ontwerp gebruikt.
 * De SVG wordt als CSS-mask gebruikt, zodat de kleur van de tekst (currentColor) bepaalt
 * welke kleur het icoon krijgt. Gegenereerd uit de Figma-insets; niet met de hand aanpassen.
 */
export interface IcoonData {
	src: string;
	/** Grootte van het icoonvak in Figma (vierkant). */
	vak: number;
	/** Afmetingen van de SVG zelf. */
	breedte: number;
	hoogte: number;
	/** Positie van de SVG binnen het vak, zoals in Figma. */
	links: number;
	boven: number;
}

export const iconen = {
	hulp: [
		{ src: hulp24, vak: 24, breedte: 20, hoogte: 20, links: 2.000, boven: 2.000 }
	],
	kaart: [
		{ src: kaart24, vak: 24, breedte: 20.4, hoogte: 18.4, links: 1.800, boven: 2.800 }
	],
	kaartje: [
		{ src: kaartje24, vak: 24, breedte: 20, hoogte: 16, links: 2.000, boven: 4.000 }
	],
	kist: [
		{ src: kist18, vak: 18, breedte: 14.75, hoogte: 12.875, links: 1.625, boven: 3.125 },
		{ src: kist21, vak: 21, breedte: 17.075, hoogte: 14.8875, links: 1.962, boven: 3.713 },
		{ src: kist22, vak: 22, breedte: 17.5833, hoogte: 15.2917, links: 2.208, boven: 4.042 },
		{ src: kist32, vak: 32, breedte: 24.4667, hoogte: 21.1333, links: 3.767, boven: 6.433 }
	],
	molen: [
		{ src: molen17, vak: 17, breedte: 11.2083, hoogte: 14.75, links: 2.896, boven: 1.125 },
		{ src: molen21, vak: 21, breedte: 13.575, hoogte: 17.95, links: 3.713, boven: 1.525 },
		{ src: molen30, vak: 30, breedte: 18.05, hoogte: 24.3, links: 5.975, boven: 2.850 }
	],
	pen: [
		{ src: pen20, vak: 20, breedte: 14.5, hoogte: 14.5, links: 2.334, boven: 3.166 }
	],
	pin: [
		{ src: pin22, vak: 22, breedte: 14.8333, hoogte: 18.9583, links: 3.583, boven: 1.292 }
	],
	play: [
		{ src: play28, vak: 28, breedte: 14.25, hoogte: 17.1667, links: 8.332, boven: 5.417 }
	],
	slot: [
		{ src: slot15, vak: 15, breedte: 10.325, hoogte: 12.5125, links: 2.337, boven: 1.401 },
		{ src: slot16, vak: 16, breedte: 10.6667, hoogte: 13, links: 2.667, boven: 1.667 }
	],
	speaker: [
		{ src: speaker22, vak: 22, breedte: 17.0342, hoogte: 13.9167, links: 2.667, boven: 4.042 }
	],
	stempel: [
		{ src: stempel22, vak: 22, breedte: 14.8333, hoogte: 17.5833, links: 3.583, boven: 1.750 }
	],
	verrekijker: [
		{ src: verrekijker17, vak: 17, breedte: 14.75, hoogte: 11.9167, links: 1.125, boven: 2.896 },
		{ src: verrekijker24, vak: 24, breedte: 20, hoogte: 16, links: 2.000, boven: 4.500 },
		{ src: verrekijker28, vak: 28, breedte: 23.2, hoogte: 18.5333, links: 2.400, boven: 5.317 }
	],
	vinkje: [
		{ src: vinkje18, vak: 18, breedte: 13.5, hoogte: 10.5, links: 2.250, boven: 3.750 }
	],
	vlecht: [
		{ src: vlecht17, vak: 17, breedte: 14.75, hoogte: 13.6875, links: 1.125, boven: 1.834 },
		{ src: vlecht21, vak: 21, breedte: 17.95, hoogte: 16.6375, links: 1.525, boven: 2.401 },
		{ src: vlecht30, vak: 30, breedte: 24.3, hoogte: 22.425, links: 2.850, boven: 4.101 }
	],
	wind: [
		{ src: wind17, vak: 17, breedte: 14.75, hoogte: 12.9792, links: 1.125, boven: 1.125 },
		{ src: wind21, vak: 21, breedte: 17.95, hoogte: 15.7625, links: 1.525, boven: 1.525 },
		{ src: wind30, vak: 30, breedte: 24.3, hoogte: 21.175, links: 2.850, boven: 2.849 }
	]
} satisfies Record<string, IcoonData[]>;

export type IcoonNaam = keyof typeof iconen;
