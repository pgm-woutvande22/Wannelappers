import stempelKnotwilgen from '#lib/assets/stempel-inkt.svg';
import type { IcoonNaam } from '#lib/utils/iconen.js';

export interface Stop {
	nr: number;
	naam: string;
	/** Naam in een zin, bv. "We zijn bij de knotwilgen". */
	inZin: string;
	icoon: IcoonNaam;
	/** Positie van het midden van de marker op de kaart, in px op de Figma-kaart van 345×418. */
	x: number;
	y: number;
	/** true voor de stops die een stempel (en een cijfer van de kistcode) opleveren. */
	stempel: boolean;
	/** Cijfer voor de kistcode dat je bij deze stop verdient. */
	cijfer?: string;
	/** Afstand en richting vanaf de vorige stop. */
	afstand?: string;
	wegwijzer?: string;
	/** Getekende inktstempel uit Figma; zonder: een eenvoudige stempel met het icoon. */
	inktstempel?: string;
}

/** Afmetingen van de kaartondergrond in Figma. */
export const KAART = { breedte: 345, hoogte: 418 } as const;

/** Positie van "Jij bent hier" (statisch, zoals in het ontwerp). */
export const JIJ = { x: 74.5, y: 298.5 } as const;

/** Totaal aantal stops, inclusief het vertrekpunt (stop 1, de parking). */
export const AANTAL_STOPS = 6;

// TODO: afstanden en wegwijzers voor stop 3 tot 6 aanvullen.
export const stops: Stop[] = [
	{
		nr: 2,
		naam: 'Knotwilgen',
		inZin: 'de knotwilgen',
		icoon: 'verrekijker',
		x: 110.5,
		y: 248.5,
		stempel: true,
		cijfer: '2',
		afstand: '120 m · ± 3 min',
		wegwijzer: 'volg de stippellijn',
		inktstempel: stempelKnotwilgen
	},
	{
		nr: 3,
		naam: 'Vlechtplek',
		inZin: 'de vlechtplek',
		icoon: 'vlecht',
		x: 196.5,
		y: 282.5,
		stempel: true,
		cijfer: '3'
	},
	{
		nr: 4,
		naam: 'Windproef',
		inZin: 'de windproef',
		icoon: 'wind',
		x: 288.5,
		y: 194.5,
		stempel: true,
		cijfer: '4'
	},
	{
		nr: 5,
		naam: 'Molen',
		inZin: 'de molen',
		icoon: 'molen',
		x: 220.5,
		y: 96.5,
		stempel: true,
		cijfer: '5'
	},
	{
		nr: 6,
		naam: 'Schatkist',
		inZin: 'de schatkist',
		icoon: 'kist',
		x: 102.5,
		y: 78.5,
		stempel: false
	}
];
