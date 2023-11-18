<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import * as api from '$lib/api';
	import RecipeComponent from '$lib/components/recipe/Recipe.svelte';

	let recipe: Recipe | null = null;

	onMount(async () => {
		recipe = await api.recipe(parseInt($page.params.id));
	});
</script>

<div class="mt-16">
	<RecipeComponent {recipe} />
</div>
