<script>
	import { goto } from '$app/navigation';
	import AutoAwesome from '~icons/ic/baseline-auto-awesome';
</script>

<header
	class="absolute left-0 right-0 top-0 z-50 flex items-center backdrop-blur-md h-20 gap-16"
>
	<div class="flex flex-row">
		<a
			class="flex items-center pl-32 pb-1 text-white bg-primary h-20 pr-8"
			href="/"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="w-9 h-9 stroke-current translate-y-[2px]"
			>
				<path
					d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"
				/>
				<line x1="6" x2="18" y1="17" y2="17" />
			</svg>
			<span class="ml-2 text-4xl font-vina">Wonderbyte</span>
		</a>

		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			class="h-20 text-primary"
		>
			<path
				d="M 0 0 L 100 0 L 0 100 z"
				fill="currentColor"
				class="hidden md:block"
			/>
		</svg>
	</div>

	<nav class="hidden md:flex space-x-4 ml-auto mr-16">
		<a class="px-4 py-2 text-lg btn btn-ghost" href="/"> Home </a>
		<a class=" px-4 py-2 text-lg btn btn-ghost" href="/browse"> Browse </a>

		<a class=" px-4 py-2 text-lg btn btn-primary" href="/generate">
			Generate <AutoAwesome />
		</a>
	</nav>
</header>
