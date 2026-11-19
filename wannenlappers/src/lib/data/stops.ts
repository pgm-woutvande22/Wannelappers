import illustratieKnotwilg from '#lib/assets/illustratie-knotwilg.svg';
import stempelKnotwilgen from '#lib/assets/stempel-knotwilgen.svg';
import type { IcoonNaam } from '#lib/utils/iconen.js';

export interface Stop {
	nr: number;
	naam: string;
	/** Korte naam voor de stopbalk op het Onderweg-scherm, bv. "Wilg". */
	kort: string;
	/** Naam in een zin, bv. "We zijn bij de knotwilgen". */
	inZin: string;
	icoon: IcoonNaam;
	/** Positie van het midden van de marker op de kaart, in px op de Figma-kaart van 345×540. */
	x: number;
	y: number;
	/** true voor de stops die een stempel (en een cijfer van de kistcode) opleveren. */
	stempel: boolean;
	/** Cijfer voor de kistcode dat je bij deze stop verdient. */
	cijfer?: string;
	/** Afstand en richting vanaf de vorige stop. */
	afstand?: string;
	wegwijzer?: string;
	/** Getekende stempel uit Figma (ring + icoon, zonder tekst); zonder: een getekende ring met het icoon. */
	inktstempel?: string;
	/** Illustratie op het opdrachtscherm als er geen foto uit de admin is. */
	illustratie?: string;
}

/** Afmetingen van de kaartondergrond in Figma. */
export const KAART = { breedte: 345, hoogte: 540 } as const;

/** Positie van "Jij bent hier" (statisch, zoals in het ontwerp). */
export const JIJ = { x: 70, y: 420 } as const;

/** "de knotwilgen" -> "De knotwilgen", als titel (Figma v5). */
export const alsTitel = (stop: Stop) => stop.inZin[0].toUpperCase() + stop.inZin.slice(1);

/** Totaal aantal stops, inclusief het vertrekpunt (stop 1, de parking). */
export const AANTAL_STOPS = 6;

// TODO: afstanden en wegwijzers voor stop 3 tot 6 aanvullen.
export const stops: Stop[] = [
	{
		nr: 2,
		naam: 'Knotwilgen',
		kort: 'Wilg',
		inZin: 'de knotwilgen',
		icoon: 'verrekijker',
		x: 130,
		y: 340,
		stempel: true,
		cijfer: '2',
		afstand: '120 m · ± 3 min',
		wegwijzer: 'volg de stippellijn',
		inktstempel: stempelKnotwilgen,
		illustratie: illustratieKnotwilg
	},
	{
		nr: 3,
		naam: 'Vlechtplek',
		kort: 'Vlecht',
		inZin: 'de vlechtplek',
		icoon: 'vlecht',
		x: 226,
		y: 380,
		stempel: true,
		cijfer: '3'
	},
	{
		nr: 4,
		naam: 'Windproef',
		kort: 'Wind',
		inZin: 'de windproef',
		icoon: 'wind',
		x: 300,
		y: 260,
		stempel: true,
		cijfer: '4'
	},
	{
		nr: 5,
		naam: 'Molen',
		kort: 'Molen',
		inZin: 'de molen',
		icoon: 'molen',
		x: 236,
		y: 130,
		stempel: true,
		cijfer: '5'
	},
	{
		nr: 6,
		naam: 'Schatkist',
		kort: 'Kist',
		inZin: 'de schatkist',
		icoon: 'kist',
		x: 110,
		y: 112,
		stempel: false
	}
];
