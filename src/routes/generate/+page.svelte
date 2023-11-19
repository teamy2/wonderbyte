<script lang="ts">
	import RecipeComponent from '$lib/components/recipe/Recipe.svelte';
	import CameraOff from '~icons/mdi/camera-off';
	import CameraPlus from '~icons/mdi/camera-plus';
	import ImagePlus from '~icons/mdi/image-plus';
	import AutoAwesome from '~icons/ic/baseline-auto-awesome';

	import * as api from '$lib/api';
	import { goto } from '$app/navigation';

	const enum VideoStatus {
		ENABLED,
		DISABLED,
		BLOCKED,
	}

	let canvas: HTMLCanvasElement;
	let video: HTMLVideoElement;

	let file: HTMLInputElement;
	let width: number;
	let height: number;

	let preview: string;
	let videoStatus = VideoStatus.DISABLED;

	let submitted = false;
	let recipe: Recipe | null = null;

	async function enableCamera() {
		try {
			video.srcObject = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: false,
			});

			await video.play();
			videoStatus = VideoStatus.ENABLED;
		} catch (e) {
			videoStatus = VideoStatus.BLOCKED;
		}
	}

	function takePicture() {
		clearCanvas();

		canvas.getContext('2d')!.drawImage(video, 0, 0);
		preview = canvas.toDataURL('image/png');
	}

	function submitFile() {
		clearCanvas();

		let reader = new FileReader();

		reader.onload = function (e) {
			preview = e.target!.result as string;
		};

		reader.readAsDataURL(file.files![0]);
	}

	async function submitPicture() {
		submitted = true;
		recipe = await api.createRecipe(preview.slice(22));

		goto(`/recipes/${recipe!.id}`);
	}

	function clearCanvas() {
		canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height);
	}
</script>

{#if submitted}
	<div class="mt-16">
		<RecipeComponent />
	</div>
{:else}
	<div class="grid place-content-center h-screen w-full mt-16">
		<div class="w-full h-full flex flex-col gap-8">
			<div class="w-full prose">
				<h1 class="text-xl">Recipe generation AI</h1>

				<p>
					Upload a picture of your dish and we'll generate a recipe for you!
				</p>
			</div>

			<div
				class="grid grid-cols-2 w-full max-w-7xl aspect-video gap-4 place-items-center h-3/5"
			>
				{#if videoStatus !== VideoStatus.ENABLED}
					{#if videoStatus === VideoStatus.BLOCKED}
						<div
							class="bg-base-200 rounded-3xl w-full grid place-items-center hover:bg-base-300 transition-all duration-300 aspect-square"
						>
							<CameraOff class="w-8 h-8" />
						</div>
					{:else}
						<button
							class="bg-base-200 rounded-3xl w-full grid place-items-center hover:bg-base-300 transition-all duration-300 aspect-square"
							on:click={enableCamera}
						>
							<CameraPlus class="w-8 h-8" />
						</button>
					{/if}
				{/if}

				<div
					class="relative bg-black rounded-3xl overflow-hidden h-full flex place-items-center w-full aspect-square"
					class:hidden={videoStatus !== VideoStatus.ENABLED}
				>
					<video
						muted
						bind:this={video}
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

				<label class="w-full cursor-pointer aspect-square">
					{#if preview}
						<div
							class="relative bg-black rounded-3xl h-full overflow-hidden flex place-items-center w-full"
							class:hidden={!preview}
						>
							<img alt="Could not load" class="object-cover" src={preview} />
						</div>
					{:else}
						<div
							class="bg-base-200 rounded-3xl h-full w-full grid place-items-center hover:bg-base-300 transition-all duration-300"
						>
							<ImagePlus class="w-8 h-8" />
						</div>
					{/if}

					<input
						accept="image/*"
						bind:this={file}
						type="file"
						on:change={submitFile}
						class="hidden"
					/>
				</label>
			</div>

			<button
				class="btn btn-primary btn-lg place-self-end"
				disabled={!preview}
				on:click={submitPicture}
			>
				Generate <AutoAwesome />
			</button>
		</div>
	</div>
{/if}

<canvas bind:this={canvas} class="hidden" {width} {height} />
