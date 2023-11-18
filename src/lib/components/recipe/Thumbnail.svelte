<script lang="ts">
	export let recipe: Recipe;

	const images = [
		'https://plus.unsplash.com/premium_photo-1696879452108-aa341c92fe3e?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1699264971363-8e71bb67daad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1682695795931-a546abdb6733?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1700212966732-4e0ebd08ad42?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
		'https://images.unsplash.com/photo-1699247334203-da0063ab6db3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D',
	];
</script>

<a href="/recipes/{recipe.id}">
	<div
		class="rounded-xl overflow-hidden hover:scale-105 transition-all duration-300"
	>
		<img
			src={images[Math.floor(Math.random() * images.length)]}
			alt={recipe.name}
		/>
	</div>
</a>
