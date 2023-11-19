<script lang="ts">
	import { PUBLIC_BASE_URL } from '$env/static/public';

	export let recipe: Recipe;
</script>

<a href="/recipes/{recipe.id}">
	<div
		class="rounded-xl overflow-hidden hover:scale-105 transition-all duration-300"
	>
		<img
			src="{PUBLIC_BASE_URL}/recipes/{recipe.id}/thumbnail"
			alt={recipe.name}
		/>
	</div>
</a>
