<script lang="ts">
	import { onMount } from 'svelte';
	let canvas: HTMLCanvasElement;
	let video: HTMLVideoElement;
	let photo: HTMLImageElement;

	let width = 400;
	let height = 400;

	onMount(() => {
		video = document.getElementById('video')! as HTMLVideoElement;

		canvas = document.getElementById('canvas')! as HTMLCanvasElement;
		photo = document.getElementById('photo')! as HTMLImageElement;
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
		photo.setAttribute('src', data);
	}
</script>

<div class="flex flex-col justify-center items-center h-screen gap-4">
	<h2 class=" text-xl">Upload your image!</h2>
	<input type="file" class="file-input w-full max-w-xs input-bordered" />

	<h2>Or...</h2>

	<video muted id="video">Video stream not available.</video>
	<button id="start" on:click={takePicture}>Take photo</button>

	<canvas id="canvas" {width} {height} class=" hidden" />
	<img alt="Test" {width} {height} class=" border-white border-2" id="photo" />
</div>
