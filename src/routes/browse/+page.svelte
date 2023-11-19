<script lang="ts">
	import { onMount } from 'svelte';
	import MasonryLayout from 'svelte-masonry-layout';

	import Search from '~icons/mdi/magnify';

	import Container from '$lib/components/Container.svelte';
	import Thumbnail from '$lib/components/recipe/Thumbnail.svelte';
	import * as api from '$lib/api';
	import { sleep } from '$lib/util';

	let items: Recipe[] = Array.from({ length: 200 });
	let loading = true;
	let search = '';

	$: filtered =
		search && items[0]
			? items.filter(
					i =>
						i.tags.includes(search.toLowerCase()) ||
						i.name.includes(search) ||
						i.description.includes(search) ||
						i.ingredients.some(i => i.toLowerCase().includes(search)) ||
						i.instructions.some(i => i.toLowerCase().includes(search))
			  )
			: items;

	onMount(async () => {
		items = await api.recipes();

		await sleep(1_000);

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
				Discover a world of flavors at your fingertips—our intuitive AI sorts
				through countless recipes to present you with options that cater to your
				cravings and dietary preferences. Effortlessly browse, select, and savor
				the perfect dish every time, turning meal planning from a chore into a
				delight.
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

	<div class="relative">
		<input
			type="text"
			placeholder="Search"
			class="input input-bordered pl-12 w-full rounded-full"
			bind:value={search}
		/>

		<Search class="absolute left-3 w-7 h-7 top-3" />
	</div>

	<MasonryLayout
		items={filtered}
		gap="1.5rem"
		breakpointCols={{
			default: 4,
			600: 1,
			800: 2,
			1000: 3,
		}}
	>
		{#each filtered as item}
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
