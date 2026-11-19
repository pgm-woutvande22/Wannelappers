-- Oefeningen worden inhoud per stop: titel, tekst, foto's en audio.
-- De quizvelden (type, opties, antwoord) verdwijnen; 'opdracht' heet voortaan 'tekst'.

alter table public.oefeningen drop column type;
alter table public.oefeningen drop column opties;
alter table public.oefeningen drop column antwoord;
alter table public.oefeningen rename column opdracht to tekst;

-- ---------------------------------------------------------------------------
-- Foto's bij een oefening
-- ---------------------------------------------------------------------------
create table public.oefening_fotos (
	id uuid primary key default gen_random_uuid(),
	oefening_id uuid not null references public.oefeningen (id) on delete cascade,
	-- Pad in de storage-bucket 'fotos', bv. '<oefening-id>/1763551234-knotwilg.jpg'.
	pad text not null unique,
	-- Alt-tekst voor schermlezers.
	beschrijving text not null check (char_length(beschrijving) between 1 and 300),
	volgorde smallint not null default 0,
	aangemaakt_op timestamptz not null default now()
);

create index oefening_fotos_oefening_idx on public.oefening_fotos (oefening_id, volgorde);

alter table public.oefening_fotos enable row level security;

create policy "fotos van actieve oefeningen lezen" on public.oefening_fotos
	for select to anon
	using (exists (select 1 from public.oefeningen o where o.id = oefening_id and o.actief));
create policy "fotos beheren" on public.oefening_fotos
	for all to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Storage: fotos
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
	'fotos',
	'fotos',
	true,
	10485760, -- 10 MB
	array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
);

create policy "fotos uploaden door admin" on storage.objects
	for insert to authenticated with check (bucket_id = 'fotos');
create policy "fotos lezen door admin" on storage.objects
	for select to authenticated using (bucket_id = 'fotos');
create policy "fotos wijzigen door admin" on storage.objects
	for update to authenticated using (bucket_id = 'fotos');
create policy "fotos verwijderen door admin" on storage.objects
	for delete to authenticated using (bucket_id = 'fotos');
