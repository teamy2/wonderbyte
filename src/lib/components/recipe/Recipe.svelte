<script lang="ts">
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import Container from '../Container.svelte';

	export let recipe: Recipe | null = null;
</script>

<Container>
	<div class="grid grid-cols-5 w-full gap-8">
		{#if recipe}
			<div class="prose col-span-3">
				<h1>{recipe.name}</h1>

				<p>{recipe.description}</p>

				<h2>Ingredients</h2>

				<ul>
					{#each recipe.ingredients as ingredient}
						<li>{ingredient}</li>
					{/each}
				</ul>

				<h2>Instructions</h2>

				<ol>
					{#each recipe.instructions as instruction}
						<li>{instruction}</li>
					{/each}
				</ol>
			</div>
		{:else}
			<div class="prose col-span-3">
				<h1 class="w-[40rem] max-w-full skeleton h-9" />

				<p class="w-96 skeleton h-8" />

				<h2 class="w-72 skeleton h-8" />

				<ul class="w-96">
					{#each Array.from({ length: 5 }) as _}
						<li class="w-full skeleton" />
					{/each}
				</ul>

				<h2 class="w-72 skeleton h-8" />

				<ol class="w-96">
					{#each Array.from({ length: 5 }) as _}
						<li class="w-full skeleton" />
					{/each}
				</ol>
			</div>
		{/if}

		<div class="col-span-2">
			<div class="w-full aspect-square rounded-2xl overflow-hidden mb-2">
				{#if recipe}
					<img
						class="w-full h-full object-cover"
						src="{PUBLIC_BASE_URL}/recipes/{recipe.id}/thumbnail"
						alt="Thumbnail of {recipe.name}"
					/>
				{:else}
					<div class="w-full h-full skeleton" />
				{/if}
			</div>

			<div class="flex flex-row flex-wrap gap-1">
				{#if recipe}
					{#each recipe.tags as tag}
						<div class="badge badge-lg">{tag}</div>
					{/each}
				{:else}
					{#each Array.from({ length: 5 }) as _}
						<div
							class="badge badge-lg skeleton"
							style="width: {Math.floor(Math.random() * 20 + 100)}px"
						/>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</Container>
