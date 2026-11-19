import dobbelsteenSrc from '#lib/assets/icoon-dobbelsteen.svg';
import kindSrc from '#lib/assets/icoon-kind.svg';
import kistBlauwSrc from '#lib/assets/icoon-kist-blauw.svg';
import kistGrijsSrc from '#lib/assets/icoon-kist-grijs.svg';
import molenGrijsSrc from '#lib/assets/icoon-molen-grijs.svg';
import molenGroenSrc from '#lib/assets/icoon-molen-groen.svg';
import penSrc from '#lib/assets/icoon-pen.svg';
import playSrc from '#lib/assets/icoon-play.svg';
import slotSrc from '#lib/assets/icoon-slot.svg';
import teamSrc from '#lib/assets/icoon-team.svg';
import verrekijkerGroenSrc from '#lib/assets/icoon-verrekijker-groen.svg';
import verrekijkerWitSrc from '#lib/assets/icoon-verrekijker-wit.svg';
import vlechtGrijsSrc from '#lib/assets/icoon-vlecht-grijs.svg';
import vlechtGroenSrc from '#lib/assets/icoon-vlecht-groen.svg';
import windGrijsSrc from '#lib/assets/icoon-wind-grijs.svg';
import windGroenSrc from '#lib/assets/icoon-wind-groen.svg';

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

/* Kleur zit in de SVG zelf, vandaar varianten per kleur (wit, groen, grijs, blauw). */
export const iconen = {
	play: { src: playSrc, vak: 28, breedte: 14.25, hoogte: 17.1667, links: 8.333, boven: 5.417 },
	team: { src: teamSrc, vak: 16, breedte: 14.5333, hoogte: 11.5333, links: 0.9, boven: 2.233 },
	pen: { src: penSrc, vak: 20, breedte: 14.5, hoogte: 14.5, links: 2.333, boven: 3.167 },
	dobbelsteen: {
		src: dobbelsteenSrc,
		vak: 16,
		breedte: 12.6667,
		hoogte: 12.6667,
		links: 1.667,
		boven: 1.667
	},
	kind: { src: kindSrc, vak: 16, breedte: 14.2, hoogte: 14.2, links: 0.9, boven: 0.9 },
	slot: { src: slotSrc, vak: 16, breedte: 10.8667, hoogte: 13.2, links: 2.567, boven: 1.567 },

	/* Kaartmarkers */
	verrekijkerWit: {
		src: verrekijkerWitSrc,
		vak: 26,
		breedte: 21.7,
		hoogte: 17.3667,
		links: 2.15,
		boven: 4.859
	},
	vlechtGroen: {
		src: vlechtGroenSrc,
		vak: 21,
		breedte: 17.95,
		hoogte: 16.6375,
		links: 1.525,
		boven: 2.401
	},
	windGroen: {
		src: windGroenSrc,
		vak: 21,
		breedte: 17.95,
		hoogte: 15.7625,
		links: 1.525,
		boven: 1.525
	},
	molenGroen: {
		src: molenGroenSrc,
		vak: 21,
		breedte: 13.575,
		hoogte: 17.95,
		links: 3.713,
		boven: 1.525
	},
	kistBlauw: {
		src: kistBlauwSrc,
		vak: 21,
		breedte: 17.075,
		hoogte: 14.8875,
		links: 1.962,
		boven: 3.713
	},

	/* Stempelkaart */
	verrekijkerGroen: {
		src: verrekijkerGroenSrc,
		vak: 28,
		breedte: 22.8,
		hoogte: 18.1333,
		links: 2.6,
		boven: 5.517
	},
	vlechtGrijs: {
		src: vlechtGrijsSrc,
		vak: 28,
		breedte: 22.8,
		hoogte: 21.05,
		links: 2.6,
		boven: 3.768
	},
	windGrijs: {
		src: windGrijsSrc,
		vak: 28,
		breedte: 22.8,
		hoogte: 19.8833,
		links: 2.6,
		boven: 2.6
	},
	molenGrijs: {
		src: molenGrijsSrc,
		vak: 28,
		breedte: 16.9667,
		hoogte: 22.8,
		links: 5.517,
		boven: 2.6
	},
	kistGrijs: {
		src: kistGrijsSrc,
		vak: 34,
		breedte: 25.8833,
		hoogte: 22.3417,
		links: 4.058,
		boven: 6.892
	}
} satisfies Record<string, IcoonData>;

export type IcoonNaam = keyof typeof iconen;
