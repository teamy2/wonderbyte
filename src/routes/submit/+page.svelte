<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	let canvas: HTMLCanvasElement;
	let video: HTMLVideoElement;

	let file: HTMLInputElement;
	let image: HTMLImageElement;
	let width = 400;
	let height = 400;

	onMount(() => {
		video = document.getElementById('video')! as HTMLVideoElement;
		file = document.getElementById('file')! as HTMLInputElement;
		canvas = document.getElementById('canvas')! as HTMLCanvasElement;

		image = document.getElementById('image')! as HTMLImageElement;
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: false })
			.then((stream) => {
				video.srcObject = stream;
				video.play();

				width = video.offsetWidth;
				height = video.offsetHeight;
			})
			.catch((err) => {
				console.log('An error occurred: ' + err);
			});
	});

	function takePicture() {
		const ctx = canvas.getContext('2d')!;
		ctx.drawImage(video, 0, 0, width, height);

		const data = canvas.toDataURL('image/png');
		image.setAttribute('src', data);
	}

	function submitFile() {
		console.log(file.value);
		let reader = new FileReader();
		reader.onload = function (e) {
			image.setAttribute('src', e.target!.result as string);
		};
		reader.readAsDataURL(file.files![0]);
	}

	async function submitPicture() {
		const ctx = canvas.getContext('2d')!;
		ctx.drawImage(image, 0, 0, width, height);
		const base64 = canvas.toDataURL('image/png').slice(22);

		console.log(base64);

		await fetch('http://localhost:4040/recipes', {
			method: 'POST',
			body: JSON.stringify({ thumbnail: base64 }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
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

	<video muted id="video">Video stream not available.</video>
	<div class="flex gap-2">
		<button id="start" class="btn input-bordered" on:click={takePicture}
			>Take Photo</button
		>
		<button class="btn input-bordered" on:click={submitPicture}
			>Submit Photo</button
		>
	</div>
	<canvas id="canvas" {width} {height} class=" hidden" />
	<img alt="Test" {width} {height} id="image" />
</div>
