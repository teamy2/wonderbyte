<script>
	import { goto } from '$app/navigation';
</script>

<header class="absolute left-0 right-0 top-0 z-50 flex items-center gap-8 p-4">
	<a class="flex items-center" href="/">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class=" w-8 h-8"
		>
			<path
				d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"
			/>
			<line x1="6" x2="18" y1="17" y2="17" />
		</svg>
		<span class="ml-2 text-2xl font-semibold">Wonderbyte</span>
	</a>

	<nav class="hidden md:flex space-x-4">
		<button
			class="px-4 py-2 text-lg bg-base-200 hover:bg-base-300 rounded-md"
			on:click={() => goto('/')}
		>
			Home
		</button>
		<button
			class=" px-4 py-2 text-lg bg-base-200 hover:bg-base-300 rounded-md"
			on:click={() => goto('/browse')}
		>
			Browse
		</button>
		<button
			class=" px-4 py-2 text-lg bg-base-200 hover:bg-base-300 rounded-md"
			on:click={() => goto('/generate')}
		>
			Generate
		</button>
	</nav>
</header>
