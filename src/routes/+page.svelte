<h1 class="w-52">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#await pokePromise then games }
    {#each games as game}
        <h1>{game.version.name}</h1>
    {/each}
{/await}

<script>
    import axios from "axios";
    const pokePromise = axios.get("https://pokeapi.co/api/v2/pokemon/ditto")
    .then((response) => { 
        return response.data.game_indices});
</script>
