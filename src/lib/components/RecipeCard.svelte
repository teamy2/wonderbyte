<script lang="ts">
	export let recipe: Recipe;
</script>

<a href="/recipes/{recipe.id}">
	<div
		class="flex flex-col overflow-hidden gap-4 hover:outline outline-white outline-2 p-5 rounded-3xl cursor-pointer"
	>
		<div class="rounded-2xl overflow-hidden w-full h-48">
			<img
				src="https://images.unsplash.com/photo-1700127272763-b775d79ecd8c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="Album"
				class="object-cover"
			/>
		</div>

		<div class="flex flex-col gap-2 rounded-3xl text-neutral-300">
			<h2 class="font-semibold text-2xl">{recipe.name}</h2>
			<p class="line-clamp-4 whitespace-pre-wrap">{recipe.description}</p>
		</div>
	</div>
</a>
