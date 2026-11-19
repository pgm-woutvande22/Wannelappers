-- Stappen als aparte lijst bij een oefening, en een geheime code per stop.

-- ---------------------------------------------------------------------------
-- Stappen
-- ---------------------------------------------------------------------------
alter table public.oefeningen add column stappen text[] not null default '{}';

-- ---------------------------------------------------------------------------
-- Codes per stop (enkel leesbaar voor admins; de app controleert via functies)
-- ---------------------------------------------------------------------------
create table public.stop_codes (
	stop_nr smallint primary key references public.stops (nr) on delete cascade,
	code text not null check (char_length(code) between 1 and 20)
);

alter table public.stop_codes enable row level security;

create policy "codes beheren" on public.stop_codes
	for all to authenticated using (true) with check (true);

-- 'geen' als de stop nog geen code heeft, anders 'cijfers' of 'tekst'
-- (zo kan de app het juiste toetsenbord tonen zonder de code te verklappen).
create function public.code_soort(stop smallint)
returns text
language sql
stable
security definer
set search_path = ''
as $$
	select coalesce(
		(select case when code ~ '^[0-9]+$' then 'cijfers' else 'tekst' end
		 from public.stop_codes where stop_nr = stop),
		'geen'
	);
$$;

-- 'juist', 'fout' of 'geen'. Hoofdletters en spaties maken niet uit.
create function public.controleer_code(stop smallint, poging text)
returns text
language sql
stable
security definer
set search_path = ''
as $$
	select coalesce(
		(select case
			when upper(regexp_replace(code, '\s', '', 'g')) = upper(regexp_replace(coalesce(poging, ''), '\s', '', 'g'))
				then 'juist'
			else 'fout'
		 end
		 from public.stop_codes where stop_nr = stop),
		'geen'
	);
$$;

revoke execute on function public.code_soort(smallint) from public;
revoke execute on function public.controleer_code(smallint, text) from public;
grant execute on function public.code_soort(smallint) to anon, authenticated;
grant execute on function public.controleer_code(smallint, text) to anon, authenticated;
