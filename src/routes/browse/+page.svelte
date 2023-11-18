<script>
	import Container from '$lib/components/Container.svelte';
	import Thumbnail from '$lib/components/recipe/Thumbnail.svelte';
	import { onMount } from 'svelte';

	import MasonryLayout from 'svelte-masonry-layout';

	let items = Array.from({ length: 200 });
	let loading = true;

	onMount(async () => {
		const response = await fetch('http://localhost:4040/recipes');
		const data = await response.json();

		items = data.data;
		loading = false;
	});
</script>

<Container>
	<div
		class="w-full bg-base-300 p-8 rounded-3xl gap-8 grid grid-cols-2 relative mt-32 shadow-xl"
	>
		<div class="prose">
			<h1 class="max-w-lg text-4xl font-bold">Browse recipes, easily.</h1>

			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
				maxime recusandae corporis fugit, quas aliquid eaque vitae pariatur quia
				officia odit eum sint aut illum rerum
			</p>
		</div>

		<div>
			<img
				src="/images/cappuccino.webp"
				class="absolute -right-12 lg:-bottom-24 w-72 lg:w-[32rem]"
				alt="Cappuccino"
			/>
		</div>
	</div>

	<MasonryLayout
		{items}
		gap="1.5rem"
		breakpointCols={{
			default: 4,
			600: 1,
			800: 2,
			1000: 3,
		}}
	>
		{#each items as item}
			<div class="h-fit">
				{#if loading}
					<div
						class="w-full skeleton rounded-xl"
						style="height: {Math.floor(Math.random() * 300) + 150}px"
					/>
				{:else}
					<Thumbnail recipe={item} />
				{/if}
			</div>
		{/each}
	</MasonryLayout>
</Container>
