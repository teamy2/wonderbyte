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

<div
	class="grid justify-center px-8 relative overflow-hidden p-8 md:p-12 lg:p-16"
>
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

					<a class="btn btn-primary group" href="/browse">Browse recipes</a>
					<a class="btn btn-accent group" href="/create">
						Get a recipe
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
				Unleash Creativity in Your Kitchen
			</h1>

			<p
				use:reveal={{
					transition: 'slide',
					delay: 200,
					duration: 300,
					x: -5,
				}}
			>
				Welcome to a culinary revolution where your plate is the canvas and AI
				is your personal sous-chef. Our innovative platform transforms the way
				you cook and experience food. Simply upload an image of a dish you're
				craving, and let our cutting-edge AI craft a custom recipe for you. Dive
				into a world of flavor where nutrition meets innovation, ensuring that
				each meal is not only delectable but also perfectly tailored to your
				health goals and taste preferences. Embrace the future of cooking with
				AI, and turn every meal into a masterpiece of taste and nourishment.
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
				Crafted by Technology, Inspired by You
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
				Imagine a world where you're never out of ideas for your next meal. Our
				AI-powered recipes are designed to ignite your passion for cooking,
				offering personalized, easy-to-follow instructions based on your unique
				food images. Whether you're a seasoned chef or a kitchen novice, our
				platform guides you to create culinary delights that cater to your
				lifestyle. Say goodbye to generic recipes and hello to bespoke meal
				plans that inspire and excite. With our AI, you're not just cooking;
				you're crafting a personal dining experience.
			</p>

			<h1
				use:reveal={{
					transition: 'slide',
					delay: 200,
					duration: 300,
					x: -5,
				}}
			>
				Eco-Friendly Eating with AI Assistance
			</h1>

			<p
				use:reveal={{
					transition: 'slide',
					delay: 200,
					duration: 300,
					x: -5,
				}}
			>
				Join us in the movement towards a more sustainable future, one plate at
				a time. Our AI-driven approach encourages the use of seasonal and local
				produce, minimizing your carbon footprint while maximizing flavor. We
				believe that being environmentally conscious doesn't have to compromise
				on taste or variety. Our platform helps you make informed decisions
				about your ingredients, promoting a greener lifestyle that benefits both
				the planet and your palate. With our technology, you'll not only savor
				the taste of your meals but also take pride in the positive impact
				you're making on the environment.
			</p>
		</div>
	</div>
</div>
