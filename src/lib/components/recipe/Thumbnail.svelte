<script lang="ts">
	import { PUBLIC_BASE_URL } from '$env/static/public';

	export let recipe: Recipe;
</script>

<img
	src="{PUBLIC_BASE_URL}/recipes/{recipe.id}/thumbnail"
	alt={recipe.name}
	class="rounded-xl hover:scale-105 transition-all duration-300 w-full object-cover"
	style="height: {Math.floor(Math.random() * 200) + 150}px"
/>
