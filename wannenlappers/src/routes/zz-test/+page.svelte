<script lang="ts">
	$effect(() => {
		localStorage.setItem('wannenlappers:tocht', JSON.stringify({ versie: 1, bewaardOp: Date.now(), team: { naam: 'De Wilgenwolven', leeftijden: [6, 9] }, tocht: { id: null, afgemeld: false, verzameld: [2, 99] } }));
		location.replace('/' + (new URLSearchParams(location.search).get('naar') ?? ''));
	});
</script>
<p>test</p>
