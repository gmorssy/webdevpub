<script>
    import Spinner from "./Spinner.svelte";
    import Results from "./Results.svelte";
    import Search from "./Search.svelte";
    import { promise } from "./stores.js";

    import { fly, fade, slide, draw } from "svelte/transition";

</script>

<main>

    <Search/>

    {#await $promise}
        <Spinner />
    {:then result}
        <Results json={result} />
    {:catch error}
        <p style="position: fixed; top: 100px" in:fade out:fade="{{ duration: 100 }}">Failed to connect. Please check your internet connection.</p>
    {/await}
</main>

<style>
    :global(body) {
        padding: 0;
        margin: 0;
    }

    main {
        height: 100vh;
        width: 100vw;
        background: linear-gradient(
            -45deg,
            #a152b92f,
            #81658a3a,
            #939ea13d,
            #ddf5ef3f
        );
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;
        padding-left: 5px;
        padding-right: 5px;
        box-sizing: border-box;
    }



    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>