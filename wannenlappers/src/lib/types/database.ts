/**
 * Types van de Supabase-database, met de hand afgeleid uit
 * supabase/migrations/20261119120000_init.sql.
 * Kan later vervangen worden door `supabase gen types typescript`.
 */

export type OefeningType = 'keuze' | 'code' | 'open' | 'luister';

export type StopRij = {
	nr: number;
	naam: string;
	in_zin: string;
	icoon: string;
	x: number;
	y: number;
	stempel: boolean;
	cijfer: string | null;
	afstand: string | null;
	wegwijzer: string | null;
}

export type OefeningRij = {
	id: string;
	stop_nr: number;
	titel: string;
	type: OefeningType;
	opdracht: string;
	opties: string[];
	antwoord: string | null;
	audio_pad: string | null;
	volgorde: number;
	actief: boolean;
	aangemaakt_op: string;
	bijgewerkt_op: string;
}

export type TochtRij = {
	id: string;
	gestart_op: string;
	beeindigd_op: string | null;
	/** Postgres-interval als tekst, bv. "00:52:10". */
	duur: string | null;
}

export type KindRij = {
	id: string;
	tocht_id: string;
	leeftijd: number;
}

export type TochtStatistiekenRij = {
	aantal_tochten: number;
	aantal_afgerond: number;
	gemiddelde_duur_seconden: number | null;
	aantal_kinderen: number;
	gemiddelde_leeftijd: number | null;
}

type Optioneel<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Database = {
	public: {
		Tables: {
			stops: {
				Row: StopRij;
				Insert: Optioneel<StopRij, 'stempel' | 'cijfer' | 'afstand' | 'wegwijzer'>;
				Update: Partial<StopRij>;
				Relationships: [];
			};
			oefeningen: {
				Row: OefeningRij;
				Insert: Optioneel<
					Omit<OefeningRij, 'aangemaakt_op' | 'bijgewerkt_op'>,
					'id' | 'opdracht' | 'opties' | 'antwoord' | 'audio_pad' | 'volgorde' | 'actief'
				>;
				Update: Partial<Omit<OefeningRij, 'id' | 'aangemaakt_op' | 'bijgewerkt_op'>>;
				Relationships: [
					{
						foreignKeyName: 'oefeningen_stop_nr_fkey';
						columns: ['stop_nr'];
						isOneToOne: false;
						referencedRelation: 'stops';
						referencedColumns: ['nr'];
					}
				];
			};
			tochten: {
				Row: TochtRij;
				Insert: Partial<Omit<TochtRij, 'duur'>>;
				Update: Partial<Omit<TochtRij, 'id' | 'duur'>>;
				Relationships: [];
			};
			kinderen: {
				Row: KindRij;
				Insert: Optioneel<KindRij, 'id'>;
				Update: Partial<Omit<KindRij, 'id'>>;
				Relationships: [
					{
						foreignKeyName: 'kinderen_tocht_id_fkey';
						columns: ['tocht_id'];
						isOneToOne: false;
						referencedRelation: 'tochten';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			tocht_statistieken: {
				Row: TochtStatistiekenRij;
				Relationships: [];
			};
		};
		Functions: {
			start_tocht: { Args: { leeftijden: number[] }; Returns: string };
			beeindig_tocht: { Args: { tocht: string }; Returns: undefined };
		};
		Enums: Record<string, never>;
		CompositeTypes: Record<string, never>;
	};
}
