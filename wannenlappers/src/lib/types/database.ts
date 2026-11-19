/**
 * Types van de Supabase-database, met de hand afgeleid uit
 * supabase/migrations/20261119120000_init.sql.
 * Kan later vervangen worden door `supabase gen types typescript`.
 */

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
	tekst: string;
	stappen: string[];
	/** Optionele hint achter "Hint nodig?". */
	hint: string;
	audio_pad: string | null;
	volgorde: number;
	actief: boolean;
	aangemaakt_op: string;
	bijgewerkt_op: string;
};

export type FotoRij = {
	id: string;
	oefening_id: string;
	/** Pad in de storage-bucket 'fotos'. */
	pad: string;
	/** Alt-tekst. */
	beschrijving: string;
	volgorde: number;
	aangemaakt_op: string;
};

export type StopCodeRij = {
	stop_nr: number;
	code: string;
	/** Uitleg voor de volwassene in het codepaneel. */
	uitleg: string;
};

/** Wat de app over de code van een stop weet (nooit de code zelf). */
export type CodeInfo = {
	soort: CodeSoort;
	lengte: number;
	uitleg: string;
};

/** 'geen' als de stop nog geen code heeft. */
export type CodeSoort = 'geen' | 'cijfers' | 'tekst';
export type CodeResultaat = 'juist' | 'fout' | 'geen';

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
					'id' | 'tekst' | 'stappen' | 'hint' | 'audio_pad' | 'volgorde' | 'actief'
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
			oefening_fotos: {
				Row: FotoRij;
				Insert: Optioneel<Omit<FotoRij, 'aangemaakt_op'>, 'id' | 'volgorde'>;
				Update: Partial<Omit<FotoRij, 'id' | 'oefening_id' | 'aangemaakt_op'>>;
				Relationships: [
					{
						foreignKeyName: 'oefening_fotos_oefening_id_fkey';
						columns: ['oefening_id'];
						isOneToOne: false;
						referencedRelation: 'oefeningen';
						referencedColumns: ['id'];
					}
				];
			};
			stop_codes: {
				Row: StopCodeRij;
				Insert: Optioneel<StopCodeRij, 'uitleg'>;
				Update: Partial<StopCodeRij>;
				Relationships: [
					{
						foreignKeyName: 'stop_codes_stop_nr_fkey';
						columns: ['stop_nr'];
						isOneToOne: true;
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
			code_info: { Args: { stop: number }; Returns: CodeInfo };
			controleer_code: { Args: { stop: number; poging: string }; Returns: CodeResultaat };
		};
		Enums: Record<string, never>;
		CompositeTypes: Record<string, never>;
	};
}
