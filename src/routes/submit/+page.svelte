<script lang="ts">
	import RecipeComponent from '$lib/components/recipe/Recipe.svelte';
	import CameraOff from '~icons/mdi/camera-off';
	import CameraPlus from '~icons/mdi/camera-plus';
	import ImagePlus from '~icons/mdi/image-plus';

	import * as api from '$lib/api';

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
	}

	function clearCanvas() {
		canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height);
	}
</script>

{#if submitted}
	<div class="mt-16">
		<RecipeComponent {recipe} />
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
							class="bg-base-200 rounded-3xl h-full w-full grid place-items-center hover:bg-base-300 transition-all duration-300"
						>
							<CameraOff class="w-8 h-8" />
						</div>
					{:else}
						<button
							class="bg-base-200 rounded-3xl h-full w-full grid place-items-center hover:bg-base-300 transition-all duration-300"
							on:click={enableCamera}
						>
							<CameraPlus class="w-8 h-8" />
						</button>
					{/if}
				{/if}

				<div
					class="relative bg-black rounded-3xl overflow-hidden h-full flex place-items-center w-full"
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

				<label class="w-full h-full">
					{#if preview}
						<div
							class="relative bg-black rounded-3xl overflow-hidden h-full flex place-items-center w-full"
							class:hidden={!preview}
						>
							<img alt="Could not load" class="object-cover" src={preview} />

							<div
								class="absolute bottom-4 left-0 right-0 flex place-content-center"
							>
								<button
									class="hover:opacity-80 swap swap-rotate hover:swap-active"
									on:click={submitPicture}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class=" swap-off fill-success w-10 h-10"
										viewBox="0 0 24 24"
									>
										<path
											d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z"
										/>
									</svg>

									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="swap-on fill-success w-10 h-10"
										viewBox="0 0 24 24"
									>
										<path
											d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z"
										/>
									</svg>
								</button>
							</div>
						</div>
					{:else}
						<div
							class="bg-base-200 rounded-3xl h-full w-full grid place-items-center"
						>
							<ImagePlus class="w-8 h-8" />
						</div>
					{/if}

					<input
						accept="image/png"
						bind:this={file}
						type="file"
						on:change={submitFile}
						class="opacity-0"
					/>
				</label>
			</div>

			<canvas bind:this={canvas} class="hidden" {width} {height} />
		</div>
	</div>
{/if}
