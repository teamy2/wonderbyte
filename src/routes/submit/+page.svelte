<script lang="ts">
	import Recipe from '$lib/components/recipe/Recipe.svelte';
	import { onMount } from 'svelte';
	let canvas: HTMLCanvasElement;
	let video: HTMLVideoElement;

	let file: HTMLInputElement;
	let image: HTMLImageElement;
	let width: number;
	let height: number;

	let cameraBlocked = false;
	let videoEnabled = false;
	let imageSrc: string;

	let recipe: any = null;
	let loading = false;
	onMount(() => {
		video = document.getElementById('video')! as HTMLVideoElement;
		file = document.getElementById('file')! as HTMLInputElement;
		canvas = document.getElementById('canvas')! as HTMLCanvasElement;
		image = document.getElementById('image')! as HTMLImageElement;
	});

	async function enableCamera() {
		try {
			let stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: false,
			});
			videoEnabled = true;
			video.srcObject = stream;
			video.play();
		} catch (e) {
			cameraBlocked = true;
		}
	}
	function takePicture() {
		clearCanvas();

		const ctx = canvas.getContext('2d')!;
		ctx.drawImage(video, 0, 0);

		imageSrc = canvas.toDataURL('image/png');
		image.setAttribute('src', imageSrc);
	}

	function submitFile() {
		clearCanvas();

		let reader = new FileReader();
		reader.onload = function (e) {
			imageSrc = e.target!.result as string;
			image.setAttribute('src', imageSrc);
		};
		reader.readAsDataURL(file.files![0]);
	}

	async function submitPicture() {
		const ctx = canvas.getContext('2d')!;
		ctx.drawImage(image, 0, 0, width, height);
		const base64 = canvas.toDataURL('image/png').slice(22);
		loading = true;

		const response = await fetch('http://localhost:4040/recipes', {
			method: 'POST',
			body: JSON.stringify({ thumbnail: base64 }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const json = await response.json();

		if (json.success) {
			recipe = json.data;
			console.log(json.data);
		}
	}

	function clearCanvas() {
		const ctx = canvas.getContext('2d')!;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
</script>

<div class="flex flex-col justify-center items-center min-h-screen gap-4">
	{#if !loading}
		<h2 class="text-xl">Upload your image!</h2>
		<input
			accept="image/*"
			id="file"
			type="file"
			on:change={submitFile}
			class="file-input w-full max-w-xs input-bordered"
		/>

		<h2>Or...</h2>
		<div
			class="grid grid-cols-2 w-full max-w-7xl aspect-video gap-4 place-items-center h-3/5"
		>
			{#if !videoEnabled}
				<div class="skeleton h-full w-full grid place-items-center">
					{#if cameraBlocked}
						<h2>Camera Blocked</h2>
					{:else}
						<button id="start" class="btn" on:click={enableCamera}
							>Enable Camera</button
						>
					{/if}
				</div>
			{/if}

			<div class="relative" class:hidden={!videoEnabled}>
				<video
					muted
					id="video"
					class=" rounded-2xl my-auto"
					bind:videoWidth={width}
					bind:videoHeight={height}
				>
					Video stream not available.
				</video>
				<div
					class="absolute bottom-0 left-0 right-0 flex place-content-center p-4"
				>
					<button
						id="start"
						class=" w-8 h-8 rounded-full bg-white outline outline-white outline-1 outline-offset-4 hover:bg-gray-300"
						on:click={takePicture}
					/>
				</div>
			</div>

			<div class:hidden={!imageSrc} class="relative">
				<img alt="Could not load" id="image" class="rounded-2xl object-cover" />

				<div
					class="absolute bottom-0 left-0 right-0 flex place-content-center p-4 0"
				>
					<button
						class="opacity-50 hover:opacity-80 swap swap-rotate hover:swap-active"
						on:click={submitPicture}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class=" swap-off fill-success w-10 h-10"
							viewBox="0 0 24 24"
							><path
								d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z"
							/></svg
						>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="swap-on fill-success w-10 h-10"
							viewBox="0 0 24 24"
							><path
								d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z"
							/></svg
						>
					</button>
				</div>
			</div>

			{#if !imageSrc}
				<div class="skeleton h-full w-full grid place-items-center">
					<h2>Your image goes here!</h2>
				</div>
			{/if}
		</div>
		<div class="flex gap-2" />

		<canvas id="canvas" class="hidden" {width} {height} />
	{:else}
		{#if !recipe}
			<span class="loading loading-spinner loading-lg" />
		{/if}

		<Recipe {recipe} />
	{/if}
</div>
