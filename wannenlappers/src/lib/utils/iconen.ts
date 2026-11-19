import hulp22 from '#lib/assets/iconen/hulp-22.svg';
import hulp24 from '#lib/assets/iconen/hulp-24.svg';
import kaart24 from '#lib/assets/iconen/kaart-24.svg';
import kaartje24 from '#lib/assets/iconen/kaartje-24.svg';
import kind16 from '#lib/assets/iconen/kind-16.svg';
import kist20 from '#lib/assets/iconen/kist-20.svg';
import kist22 from '#lib/assets/iconen/kist-22.svg';
import molen20 from '#lib/assets/iconen/molen-20.svg';
import pen20 from '#lib/assets/iconen/pen-20.svg';
import pijl22 from '#lib/assets/iconen/pijl-22.svg';
import pin22 from '#lib/assets/iconen/pin-22.svg';
import play18 from '#lib/assets/iconen/play-18.svg';
import slot15 from '#lib/assets/iconen/slot-15.svg';
import slot16 from '#lib/assets/iconen/slot-16.svg';
import sluit20 from '#lib/assets/iconen/sluit-20.svg';
import speaker20 from '#lib/assets/iconen/speaker-20.svg';
import speaker22 from '#lib/assets/iconen/speaker-22.svg';
import stempel18 from '#lib/assets/iconen/stempel-18.svg';
import stempel24 from '#lib/assets/iconen/stempel-24.svg';
import terug22 from '#lib/assets/iconen/terug-22.svg';
import thuis24 from '#lib/assets/iconen/thuis-24.svg';
import verrekijker24 from '#lib/assets/iconen/verrekijker-24.svg';
import verrekijker26 from '#lib/assets/iconen/verrekijker-26.svg';
import vinkje20 from '#lib/assets/iconen/vinkje-20.svg';
import vlecht20 from '#lib/assets/iconen/vlecht-20.svg';
import volwassene16 from '#lib/assets/iconen/volwassene-16.svg';
import wandel18 from '#lib/assets/iconen/wandel-18.svg';
import wind20 from '#lib/assets/iconen/wind-20.svg';

/*
 * Iconen uit Figma ("Design · v5"; kaartje, pen, pin en slot nog uit v4), per vorm in de groottes die het ontwerp gebruikt.
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
		{ src: hulp22, vak: 22, breedte: 18.25, hoogte: 18.25, links: 1.876, boven: 1.876 },
		{ src: hulp24, vak: 24, breedte: 19.75, hoogte: 19.75, links: 2.125, boven: 2.125 }
	],
	kaart: [
		{ src: kaart24, vak: 24, breedte: 19.75, hoogte: 17.75, links: 2.125, boven: 3.126 }
	],
	kaartje: [
		{ src: kaartje24, vak: 24, breedte: 20, hoogte: 16, links: 2.000, boven: 4.000 }
	],
	kind: [
		{ src: kind16, vak: 16, breedte: 13.75, hoogte: 13.75, links: 1.125, boven: 1.125 }
	],
	kist: [
		{ src: kist20, vak: 20, breedte: 15.9167, hoogte: 13.8333, links: 2.040, boven: 3.709 },
		{ src: kist22, vak: 22, breedte: 17.3333, hoogte: 15.0417, links: 2.333, boven: 4.168 }
	],
	molen: [
		{ src: molen20, vak: 20, breedte: 12.5833, hoogte: 16.75, links: 3.709, boven: 1.626 }
	],
	pen: [
		{ src: pen20, vak: 20, breedte: 14.5, hoogte: 14.5, links: 2.334, boven: 3.166 }
	],
	pijl: [
		{ src: pijl22, vak: 22, breedte: 14.5833, hoogte: 12.75, links: 3.707, boven: 4.625 }
	],
	pin: [
		{ src: pin22, vak: 22, breedte: 14.8333, hoogte: 18.9583, links: 3.583, boven: 1.292 }
	],
	play: [
		{ src: play18, vak: 18, breedte: 9.625, hoogte: 11.5, links: 5.124, boven: 3.251 }
	],
	slot: [
		{ src: slot15, vak: 15, breedte: 10.325, hoogte: 12.5125, links: 2.337, boven: 1.401 },
		{ src: slot16, vak: 16, breedte: 10.6667, hoogte: 13, links: 2.667, boven: 1.667 }
	],
	sluit: [
		{ src: sluit20, vak: 20, breedte: 11.75, hoogte: 11.75, links: 4.125, boven: 4.125 }
	],
	speaker: [
		{ src: speaker20, vak: 20, breedte: 15.4175, hoogte: 12.5834, links: 2.459, boven: 3.709 },
		{ src: speaker22, vak: 22, breedte: 16.7842, hoogte: 13.6667, links: 2.793, boven: 4.168 }
	],
	stempel: [
		{ src: stempel18, vak: 18, breedte: 13, hoogte: 15.25, links: 2.500, boven: 1.375 },
		{ src: stempel24, vak: 24, breedte: 16.75, hoogte: 19.75, links: 3.626, boven: 2.125 }
	],
	terug: [
		{ src: terug22, vak: 22, breedte: 7.25, hoogte: 12.75, links: 7.375, boven: 4.625 }
	],
	thuis: [
		{ src: thuis24, vak: 24, breedte: 17.75, hoogte: 16.75, links: 3.126, boven: 4.125 }
	],
	verrekijker: [
		{ src: verrekijker24, vak: 24, breedte: 19.75, hoogte: 15.75, links: 2.125, boven: 4.626 },
		{ src: verrekijker26, vak: 26, breedte: 21.25, hoogte: 16.9167, links: 2.374, boven: 5.084 }
	],
	vinkje: [
		{ src: vinkje20, vak: 20, breedte: 13.8667, hoogte: 10.5333, links: 3.066, boven: 4.734 }
	],
	vlecht: [
		{ src: vlecht20, vak: 20, breedte: 16.75, hoogte: 15.5, links: 1.626, boven: 2.460 }
	],
	volwassene: [
		{ src: volwassene16, vak: 16, breedte: 11.75, hoogte: 12.75, links: 2.125, boven: 1.793 }
	],
	wandel: [
		{ src: wandel18, vak: 18, breedte: 7.7503, hoogte: 15.6252, links: 5.875, boven: 1.000 }
	],
	wind: [
		{ src: wind20, vak: 20, breedte: 16.75, hoogte: 14.6667, links: 1.626, boven: 1.626 }
	]
} satisfies Record<string, IcoonData[]>;

export type IcoonNaam = keyof typeof iconen;
