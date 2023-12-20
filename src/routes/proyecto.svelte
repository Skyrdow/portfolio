<script>
    export let nombre = "error";
    export let descripcion = "error";
    export let link = "error";
</script>

<div
    class="min-w-[40vh] max-w-[40vh] rounded-lg border text-card-foreground shadow-sm bg-white"
>
    <div class="p-6 flex flex-row items-center gap-4">
        <img
            class="w-12 h-12"
            width="48"
            height="48"
            src="https://img.icons8.com/color/48/workstation.png"
            alt="workstation"
        />
        <div class="grid gap-1">
            <h3
                class="text-2xl font-semibold leading-none tracking-tight text-gray-700"
            >
                {nombre}
            </h3>
            {#if link !== "google.com"}
                <p class="text-sm text-gray-500">{link}</p>
            {/if}
        </div>
    </div>
    <div class="p-6 grid gap-2">
        <div class="text-sm font-semibold text-gray-700">
            {descripcion}
        </div>
        <a
            href="/about"
            class="items-center rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-gray-700 text-gray-700"
        >
            Learn More
    </a>
    </div>
</div>
