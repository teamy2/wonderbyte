<script>
	import Container from '$lib/components/Container.svelte';
	import Thumbnail from '$lib/components/recipe/Thumbnail.svelte';

	import MasonryLayout from 'svelte-masonry-layout';

	let items = Array.from({ length: 200 });
</script>

<Container>
	<div
		class="w-full bg-base-300 p-8 rounded-3xl gap-8 grid grid-cols-2 relative mt-32 shadow-xl"
	>
		<div class="prose text-neutral-100">
			<h1 class="max-w-lg text-4xl font-bold text-neutral-100">
				Browse recipes, easily.
			</h1>

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
				<Thumbnail
					recipe={{
						id: 0,
						name: 'Test',
						description:
							'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam maxime recusandae corporis fugit, quas aliquid eaque vitae pariatur quia officia odit eum sint aut illum rerum',
						ingredients: [],
						instructions: [],
					}}
				/>
			</div>
		{/each}
	</MasonryLayout>
</Container>
