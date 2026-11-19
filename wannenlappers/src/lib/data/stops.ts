import type { IcoonNaam } from '#lib/utils/iconen.js';

export interface Stop {
	nr: number;
	naam: string;
	/** Positie van het midden van de marker op de kaart, in px op de Figma-kaart van 345×372. */
	x: number;
	y: number;
	/** Icoon op de kaart. */
	kaartIcoon: IcoonNaam;
	/** Icoon op de kaart als dit de volgende stop is (wit op groen). */
	kaartIcoonVolgende?: IcoonNaam;
	/** Icoon op de stempelkaart: open en volgende. */
	stempelIcoon: IcoonNaam;
	stempelIcoonVolgende?: IcoonNaam;
	/** true voor de stops die een stempel opleveren. */
	stempel: boolean;
	/** Hint onderweg naar deze stop. */
	wegwijzer?: string;
}

/** Afmetingen van de kaartondergrond in Figma. */
export const KAART = { breedte: 345, hoogte: 372 } as const;

/** Positie van "Jij bent hier" (statisch, zoals in het ontwerp). */
export const JIJ = { x: 74.5, y: 266.5 } as const;

export const stops: Stop[] = [
	{
		nr: 2,
		naam: 'Knotwilgen',
		x: 110.5,
		y: 224.5,
		kaartIcoon: 'verrekijkerWit',
		kaartIcoonVolgende: 'verrekijkerWit',
		stempelIcoon: 'verrekijkerGroen',
		stempelIcoonVolgende: 'verrekijkerGroen',
		stempel: true,
		wegwijzer: 'Volg de stippellijn langs de beek.'
	},
	{
		nr: 3,
		naam: 'Vlechtplek',
		x: 196.5,
		y: 254.5,
		kaartIcoon: 'vlechtGroen',
		stempelIcoon: 'vlechtGrijs',
		stempel: true
	},
	{
		nr: 4,
		naam: 'Windproef',
		x: 288.5,
		y: 174.5,
		kaartIcoon: 'windGroen',
		stempelIcoon: 'windGrijs',
		stempel: true
	},
	{
		nr: 5,
		naam: 'Molen',
		x: 220.5,
		y: 86.5,
		kaartIcoon: 'molenGroen',
		stempelIcoon: 'molenGrijs',
		stempel: true
	},
	{
		nr: 6,
		naam: 'Schatkist',
		x: 102.5,
		y: 70.5,
		kaartIcoon: 'kistBlauw',
		stempelIcoon: 'kistGrijs',
		stempel: false
	}
];
