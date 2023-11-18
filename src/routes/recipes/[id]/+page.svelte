<script lang="ts">
	import { page } from '$app/stores';
	import Container from '$lib/components/Container.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import * as api from '$lib/api';

	let data: PageData;
	let recipe: Recipe | null = null;

	onMount(async () => {
		recipe = await api.recipe(parseInt($page.params.id));
	});
</script>

<Container>
	{#if !recipe}
		Loading...
	{:else}
		<h1 class="text-4xl font-semibold">{recipe.name}</h1>
		<p class="text-neutral-300">{recipe.description}</p>
		<div class="flex flex-col gap-4">
			{#each recipe.ingredients as ingredient}
				<div class="flex gap-2">
					<div class="w-8 h-8 rounded-full bg-neutral-300" />
					<div class="flex flex-col gap-1">
						<h2 class="font-semibold">{ingredient.name}</h2>
						<p class="text-neutral-300">{ingredient.amount}</p>
					</div>
				</div>
			{/each}
		</div>
		<div class="flex flex-col gap-4">
			{#each recipe.steps as step}
				<div class="flex gap-2">
					<div class="w-8 h-8 rounded-full bg-neutral-300" />
					<div class="flex flex-col gap-1">
						<h2 class="font-semibold">{step.name}</h2>
						<p class="text-neutral-300">{step.description}</p>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</Container>
