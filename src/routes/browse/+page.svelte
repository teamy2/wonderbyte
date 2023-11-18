<script>
	import Container from '$lib/components/Container.svelte';
	import RecipeCard from '$lib/components/RecipeCard.svelte';

	import MasonryLayout from 'svelte-masonry-layout';

	let items = Array.from({ length: 200 });

	const images = [
		'https://plus.unsplash.com/premium_photo-1696879452108-aa341c92fe3e?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1699264971363-8e71bb67daad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1682695795931-a546abdb6733?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1700212966732-4e0ebd08ad42?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
		'https://images.unsplash.com/photo-1699247334203-da0063ab6db3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D',
	];
</script>

<Container>
	<div
		class="w-full outline outline-white outline-2 p-8 rounded-2xl text-white gap-8 grid grid-cols-2"
	>
		<div>
			<h1 class="max-w-lg text-4xl">Check out some delicious recipes</h1>

			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
				maxime recusandae corporis fugit, quas aliquid eaque vitae pariatur quia
				officia odit eum sint aut illum rerum
			</p>
		</div>
	</div>

	<MasonryLayout
		{items}
		gap="10px"
		breakpointCols={{
			// breakpoint (in px) : number of columns
			default: 4, // display 5 columns by default
			600: 1, // until 600px, display 2 columns
			800: 2, // until 800px, display 3 columns
			1000: 3, // until 1000px, display 4 columns
		}}
	>
		{#each items as item}
			<div class="h-fit">
				<img src={images[Math.floor(Math.random() * images.length)]} />
			</div>
		{/each}
	</MasonryLayout>
</Container>
