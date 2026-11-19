-- Design v5: hint bij een oefening, uitleg bij de code, en het aantal vakjes in het codepaneel.

alter table public.oefeningen add column hint text not null default ''
	check (char_length(hint) <= 200);

-- Uitleg voor de volwassene in het codepaneel, bv. "Het schermpje hangt naast de verrekijker."
alter table public.stop_codes add column uitleg text not null default ''
	check (char_length(uitleg) <= 200);

-- Alles wat de app over de code mag weten, zonder de code zelf:
-- soort ('geen' | 'cijfers' | 'tekst'), lengte (aantal vakjes) en uitleg.
create function public.code_info(stop smallint)
returns json
language sql
stable
security definer
set search_path = ''
as $$
	select coalesce(
		(select json_build_object(
			'soort', case when code ~ '^[0-9]+$' then 'cijfers' else 'tekst' end,
			'lengte', char_length(regexp_replace(code, '\s', '', 'g')),
			'uitleg', uitleg
		 )
		 from public.stop_codes where stop_nr = stop),
		json_build_object('soort', 'geen', 'lengte', 0, 'uitleg', '')
	);
$$;

revoke execute on function public.code_info(smallint) from public;
grant execute on function public.code_info(smallint) to anon, authenticated;

-- code_soort is vervangen door code_info.
drop function public.code_soort(smallint);
