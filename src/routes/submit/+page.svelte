<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	let canvas: HTMLCanvasElement;
	let video: HTMLVideoElement;

	let file: HTMLInputElement;
	let image: HTMLImageElement;
	let width: number;
	let height: number;

	let imageSrc: string;
	onMount(async () => {
		video = document.getElementById('video')! as HTMLVideoElement;
		file = document.getElementById('file')! as HTMLInputElement;
		canvas = document.getElementById('canvas')! as HTMLCanvasElement;

		image = document.getElementById('image')! as HTMLImageElement;
		let stream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: false,
		});

		video.srcObject = stream;
		video.play();
	});

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

		await fetch('http://localhost:4040/recipes', {
			method: 'POST',
			body: JSON.stringify({ thumbnail: base64 }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	function clearCanvas() {
		const ctx = canvas.getContext('2d')!;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
</script>

<div class="flex flex-col justify-center items-center h-screen gap-4">
	<h2 class="text-xl">Upload your image!</h2>
	<input
		accept="image/*"
		id="file"
		type="file"
		on:change={submitFile}
		class="file-input w-full max-w-xs input-bordered"
	/>

	<h2>Or...</h2>
	<div class="flex gap-4 flex-wrap justify-center">
		<video
			muted
			id="video"
			class=" rounded-2xl"
			bind:videoWidth={width}
			bind:videoHeight={height}
		>
			Video stream not available.
		</video>

		<img
			alt="shutuop"
			id="image"
			class:hidden={!imageSrc}
			class=" rounded-2xl"
			{width}
			{height}
		/>

		{#if !imageSrc}
			<div class="skeleton h-full" style="width: {width}px" />
		{/if}
	</div>
	<div class="flex gap-2">
		<button id="start" class="btn input-bordered" on:click={takePicture}
			>Take Photo</button
		>
		<button class="btn input-bordered" on:click={submitPicture}
			>Submit Photo</button
		>
	</div>

	<canvas id="canvas" class="hidden" {width} {height} />
</div>
