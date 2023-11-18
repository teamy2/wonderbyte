<script lang="ts">
	import Typewriter from 'svelte-typewriter';
	import { reveal } from 'svelte-reveal';
</script>

<a
	href="#down"
	class="btn btn-ghost btn-circle absolute bottom-0 left-0 right-0 mx-auto my-8 group z-40"
>
	<svg
		viewBox="0 0 24 24"
		class="w-8 h-8 group-hover:translate-y-[0.125rem] transition-transform duration-300"
	>
		<path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
	</svg>
</a>

<div class="grid justify-center px-8 relative overflow-hidden">
	<div class="max-w-4xl w-full">
		<div class="min-h-screen flex items-center">
			<div
				class="absolute z-0 top-96 -right-48 w-[40em] h-[40em] bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
			/>
			<div
				class="hidden md:block absolute z-0 top-96 left-24 w-[30em] h-[30em] bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-1000"
			/>
			<div
				class="hidden md:block absolute z-0 top-40 left-0 right-0 mx-auto w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"
			/>

			<div class="grid gap-8 grid-cols-3 items-center z-10 w-full">
				<span
					class="text-5xl md:text-6xl lg:text-7xl font-extrabold col-span-2"
				>
					<span class="inline-block">We're all about</span>
					<span
						class="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
					>
						<Typewriter
							mode="loop"
							--cursor-width="5px"
							delay={300}
							interval={50}
						>
							<p>nutrition</p>
							<p>food</p>
							<p>cooking</p>
							<p>health</p>
						</Typewriter>
					</span>

					<a class="btn btn-accent group" href="/submit">
						Submit an image
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							class="hidden h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 md:inline-block stroke-current"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
							/>
						</svg>
					</a>
				</span>
			</div>
		</div>

		<div class="prose prose-md py-8 max-w-full relative" id="down">
			<div
				class="hidden md:block absolute z-0 bottom-48 -left-96 w-[25em] h-[25em] bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"
			/>

			<h1
				use:reveal={{
					transition: 'slide',
					delay: 200,
					duration: 300,
					x: -5,
				}}
			>
				Lorem ipsum dolor sit amet.
			</h1>

			<p
				use:reveal={{
					transition: 'slide',
					delay: 200,
					duration: 300,
					x: -5,
				}}
			>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut earum
				voluptatibus modi error illo odio assumenda dignissimos repellendus!
				Explicabo temporibus dolor maiores cupiditate nemo suscipit omnis nulla,
				perferendis corporis ullam, voluptatem natus et. Inventore pariatur at
				perferendis aut id temporibus sit exercitationem. Exercitationem facere
				dolor, laborum eos, corporis et hic sed temporibus ea eveniet dicta
				ducimus commodi necessitatibus quia quaerat earum rem repellat
				laboriosam deserunt sequi voluptatum nesciunt iste doloribus. Culpa quo
				exercitationem rerum expedita nesciunt! Exercitationem nobis accusantium
				eos at. Temporibus optio distinctio porro, praesentium facilis iure sit
				voluptas, quis, necessitatibus suscipit veniam obcaecati dolor excepturi
				delectus tenetur mollitia?
			</p>

			<h1
				use:reveal={{
					transition: 'slide',
					delay: 200,
					duration: 300,
					x: 5,
				}}
				class="text-right"
			>
				Lorem ipsum dolor sit amet.
			</h1>

			<p
				use:reveal={{
					transition: 'slide',
					delay: 200,
					duration: 300,
					x: 5,
				}}
				class="text-right"
			>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut earum
				voluptatibus modi error illo odio assumenda dignissimos repellendus!
				Explicabo temporibus dolor maiores cupiditate nemo suscipit omnis nulla,
				perferendis corporis ullam, voluptatem natus et. Inventore pariatur at
				perferendis aut id temporibus sit exercitationem. Exercitationem facere
				dolor, laborum eos, corporis et hic sed temporibus ea eveniet dicta
				ducimus commodi necessitatibus quia quaerat earum rem repellat
				laboriosam deserunt sequi voluptatum nesciunt iste doloribus. Culpa quo
				exercitationem rerum expedita nesciunt! Exercitationem nobis accusantium
				eos at. Temporibus optio distinctio porro, praesentium facilis iure sit
				voluptas, quis, necessitatibus suscipit veniam obcaecati dolor excepturi
				delectus tenetur mollitia?
			</p>

			<h1
				use:reveal={{
					transition: 'slide',
					delay: 200,
					duration: 300,
					x: -5,
				}}
			>
				Lorem ipsum dolor sit amet.
			</h1>

			<p
				use:reveal={{
					transition: 'slide',
					delay: 200,
					duration: 300,
					x: -5,
				}}
			>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut earum
				voluptatibus modi error illo odio assumenda dignissimos repellendus!
				Explicabo temporibus dolor maiores cupiditate nemo suscipit omnis nulla,
				perferendis corporis ullam, voluptatem natus et. Inventore pariatur at
				perferendis aut id temporibus sit exercitationem. Exercitationem facere
				dolor, laborum eos, corporis et hic sed temporibus ea eveniet dicta
				ducimus commodi necessitatibus quia quaerat earum rem repellat
				laboriosam deserunt sequi voluptatum nesciunt iste doloribus. Culpa quo
				exercitationem rerum expedita nesciunt! Exercitationem nobis accusantium
				eos at. Temporibus optio distinctio porro, praesentium facilis iure sit
				voluptas, quis, necessitatibus suscipit veniam obcaecati dolor excepturi
				delectus tenetur mollitia?
			</p>
		</div>
	</div>
</div>
