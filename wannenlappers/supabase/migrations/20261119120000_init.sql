-- Wannenlappers: stops, oefeningen, tochten, kinderen en audio-opslag.
--
-- Rechten:
--   * iedereen (anon) leest stops, actieve oefeningen en audio;
--   * de app registreert tochten alleen via de functies start_tocht / beeindig_tocht;
--   * ingelogde gebruikers (authenticated) zijn admins: ze beheren alles en lezen de statistieken.
--     Zet daarom "Allow new users to sign up" UIT in Supabase (Authentication > Sign In / Providers).

-- ---------------------------------------------------------------------------
-- Stops
-- ---------------------------------------------------------------------------
create table public.stops (
	nr smallint primary key,
	naam text not null,
	in_zin text not null,
	icoon text not null,
	x real not null,
	y real not null,
	stempel boolean not null default false,
	cijfer text,
	afstand text,
	wegwijzer text
);

insert into public.stops (nr, naam, in_zin, icoon, x, y, stempel, cijfer, afstand, wegwijzer) values
	(2, 'Knotwilgen', 'de knotwilgen', 'verrekijker', 110.5, 248.5, true, '2', '120 m · ± 3 min', 'volg de stippellijn'),
	(3, 'Vlechtplek', 'de vlechtplek', 'vlecht', 196.5, 282.5, true, '3', null, null),
	(4, 'Windproef', 'de windproef', 'wind', 288.5, 194.5, true, '4', null, null),
	(5, 'Molen', 'de molen', 'molen', 220.5, 96.5, true, '5', null, null),
	(6, 'Schatkist', 'de schatkist', 'kist', 102.5, 78.5, false, null, null, null);

-- ---------------------------------------------------------------------------
-- Oefeningen
-- ---------------------------------------------------------------------------
create table public.oefeningen (
	id uuid primary key default gen_random_uuid(),
	stop_nr smallint not null references public.stops (nr) on delete cascade,
	titel text not null check (char_length(titel) between 1 and 120),
	type text not null check (type in ('keuze', 'code', 'open', 'luister')),
	opdracht text not null default '',
	-- Antwoordmogelijkheden bij type 'keuze'.
	opties text[] not null default '{}',
	antwoord text,
	-- Pad in de storage-bucket 'audio', bv. 'stop-2/opdracht.mp3'.
	audio_pad text,
	volgorde smallint not null default 0,
	actief boolean not null default true,
	aangemaakt_op timestamptz not null default now(),
	bijgewerkt_op timestamptz not null default now()
);

create index oefeningen_stop_idx on public.oefeningen (stop_nr, volgorde);

create function public.zet_bijgewerkt_op()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
	new.bijgewerkt_op = now();
	return new;
end;
$$;

create trigger oefeningen_bijgewerkt_op
before update on public.oefeningen
for each row execute function public.zet_bijgewerkt_op();

-- ---------------------------------------------------------------------------
-- Tochten en kinderen (anoniem: geen namen)
-- ---------------------------------------------------------------------------
create table public.tochten (
	id uuid primary key default gen_random_uuid(),
	gestart_op timestamptz not null default now(),
	beeindigd_op timestamptz,
	duur interval generated always as (beeindigd_op - gestart_op) stored,
	check (beeindigd_op is null or beeindigd_op >= gestart_op)
);

create index tochten_gestart_idx on public.tochten (gestart_op desc);

create table public.kinderen (
	id uuid primary key default gen_random_uuid(),
	tocht_id uuid not null references public.tochten (id) on delete cascade,
	leeftijd smallint not null check (leeftijd between 1 and 18)
);

create index kinderen_tocht_idx on public.kinderen (tocht_id);

-- Start een tocht met de leeftijd van elk kind; geeft het id van de tocht terug.
create function public.start_tocht(leeftijden smallint[])
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
	nieuw_id uuid;
begin
	if leeftijden is null or cardinality(leeftijden) = 0 or cardinality(leeftijden) > 20 then
		raise exception 'Geef tussen 1 en 20 leeftijden mee.';
	end if;

	insert into public.tochten default values returning id into nieuw_id;
	insert into public.kinderen (tocht_id, leeftijd)
	select nieuw_id, l from unnest(leeftijden) as l;

	return nieuw_id;
end;
$$;

-- Sluit een tocht af (één keer, binnen 12 uur na de start).
create function public.beeindig_tocht(tocht uuid)
returns void
language sql
security definer
set search_path = ''
as $$
	update public.tochten
	set beeindigd_op = now()
	where id = tocht
		and beeindigd_op is null
		and gestart_op > now() - interval '12 hours';
$$;

revoke execute on function public.start_tocht(smallint[]) from public;
revoke execute on function public.beeindig_tocht(uuid) from public;
grant execute on function public.start_tocht(smallint[]) to anon, authenticated;
grant execute on function public.beeindig_tocht(uuid) to anon, authenticated;

-- Statistieken voor de admin. security_invoker: de RLS van de tabellen blijft gelden.
create view public.tocht_statistieken
with (security_invoker = true)
as
select
	(select count(*) from public.tochten) as aantal_tochten,
	(select count(*) from public.tochten where beeindigd_op is not null) as aantal_afgerond,
	(select round(extract(epoch from avg(duur)))::integer from public.tochten where beeindigd_op is not null)
		as gemiddelde_duur_seconden,
	(select count(*) from public.kinderen) as aantal_kinderen,
	(select round(avg(leeftijd), 1) from public.kinderen) as gemiddelde_leeftijd;

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------
alter table public.stops enable row level security;
alter table public.oefeningen enable row level security;
alter table public.tochten enable row level security;
alter table public.kinderen enable row level security;

create policy "stops lezen" on public.stops
	for select to anon, authenticated using (true);
create policy "stops beheren" on public.stops
	for all to authenticated using (true) with check (true);

create policy "actieve oefeningen lezen" on public.oefeningen
	for select to anon using (actief);
create policy "oefeningen beheren" on public.oefeningen
	for all to authenticated using (true) with check (true);

create policy "tochten lezen door admin" on public.tochten
	for select to authenticated using (true);
create policy "tochten verwijderen door admin" on public.tochten
	for delete to authenticated using (true);

create policy "kinderen lezen door admin" on public.kinderen
	for select to authenticated using (true);

-- ---------------------------------------------------------------------------
-- Storage: audio
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
	'audio',
	'audio',
	true,
	20971520, -- 20 MB
	array['audio/mpeg', 'audio/mp4', 'audio/aac', 'audio/wav', 'audio/x-wav', 'audio/ogg', 'audio/webm']
);

create policy "audio uploaden door admin" on storage.objects
	for insert to authenticated with check (bucket_id = 'audio');
create policy "audio lezen door admin" on storage.objects
	for select to authenticated using (bucket_id = 'audio');
create policy "audio wijzigen door admin" on storage.objects
	for update to authenticated using (bucket_id = 'audio');
create policy "audio verwijderen door admin" on storage.objects
	for delete to authenticated using (bucket_id = 'audio');
