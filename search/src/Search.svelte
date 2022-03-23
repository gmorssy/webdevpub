<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<script>
    import { promise } from "./stores.js";
    import { fly, fade, slide, draw } from "svelte/transition";

    // Variables
    let join = 0;
    
    let emptyTop = 100;
    let searchbar = {width: 100};
    let icon = {size: 0, color: 'transparent'};

    let searchTips = ['cat', 'car', 'house', 'web', 'fish', 'job', 'US', 'England', 'New York', 'Edvin'];

    let blurAdd = 0;
    let displayed = false;

    let question;
    async function search() {
        const res = await fetch(
            `https://demo.dataverse.org/api/search?q=` + question
        );
        const json = await res.json();

         if (res.ok) {
            return json;
        } else {
            throw new Error(json);
        }
    }

    function enterSearch() {
        if (question != undefined) {
            $promise = search();
            // Run when search
            emptyTop = 10;
            blurAdd = 3;
            displayed = true;
            
        }
    }
    
    function updateIntro() {
        icon.size = (join >= 1) ? 37 : 0;
        icon.color = (join >= 2) ? 'white' : 'transparent';

        searchbar.width = (join >= 1) ? 99 : 1;
        
        join += 1;
    }

    function randomWord() {
        let rng = Math.floor(Math.random() * searchTips.length);
        return searchTips[rng];
    }

    setTimeout(updateIntro, 1)
    setTimeout(updateIntro, 500)
    setTimeout(updateIntro, 700)
</script>

<div id="search" style="margin-top: {emptyTop}px">
    <form on:submit|preventDefault={enterSearch}>
        {#key join >= 1}
            <input id="searchbar" placeholder="Search '{randomWord()}'" in:fly="{{ y: -200, duration: 1000 }}" style="width: {searchbar.width}%" bind:value="{question}" />
            <div class="icon" style="height: {icon.size}px" on:click="{enterSearch}" title="Search">    
                <i in:fade="{{ duration: 1000 }}" class="fa fa-search" style="color: {icon.color}"></i>
            </div> 
        {/key}
    </form>
</div>

{#if displayed}
    <div id="top-div" in:fade={{ delay: 500}}/>
{/if}

<!--Logo-->
{#key join >= 1}
    <svg id="logo" class="logo-attributes" width="500" height="500" in:fly="{{ y: 200, duration: 1000 }}" viewBox="0 0 500 500" style="filter: drop-shadow(0px 0px 10px rgba(244, 84, 255, 0.673)) blur({blurAdd}px)">
        <!--https://www.w3schools.com/graphics/svg_grad_linear.asp-->
        <defs>
            <linearGradient id="logo-gradient" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:rgb(242,142,255);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(208,0,255);stop-opacity:1" />
            </linearGradient>
        </defs>
        
        <mask id="logo-remove">
            <rect x="0" y="0" width="500" height="500" fill="white"/>
            <rect x="250" y="225" width="200" height="50" fill="black"/>
        </mask>

        <circle cx="250" cy="250" r="20" stroke-width="40" fill="none" stroke="url(#logo-gradient)"/>
        <circle cx="250" cy="250" r="100" stroke-width="30" fill="none" stroke="url(#logo-gradient)" mask="url(#logo-remove)"/>
        <circle cx="250" cy="250" r="170" stroke-width="30" fill="none" stroke="url(#logo-gradient)" mask="url(#logo-remove)"/>
        <rect x="325" y="240" width="115" height="20" fill="url(#logo-gradient)"/>
    </svg>
{/key}


<style>
    #logo {
        position: fixed;
        top: 150px;
        z-index: -1;
    }

    #searchbar {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.09);
    }

    #searchbar:focus {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    #top-div {
        position: fixed;
        padding: 28px 100%;
        background-color: #d3d3d3;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .logo-attributes {
        transition: filter 0.5s;
    }

    #search {
        display: flex;
        width: 50%;
        justify-self: center;
        align-items: center;
        z-index: 3;

        transition: margin 0.5s;
    }

    form,
    form input {
        display: flex;
        align-items: center;
        width: 99%;
        border-radius: 20px;

        transition: width 1.5s, box-shadow 0.1s;

        cursor: text;
    }

    .icon {
        display: flex;
        position: fixed;
        width: 37px;
        height: 0px;
        margin-left: 50%;
        border-radius: 50%;
        align-items: center;
        background-image: linear-gradient(45deg, rgb(208, 0, 255), #f28eff);
        
        transition: height 1s, border-radius 0.3s;

        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

        cursor: pointer;
    }

    i {
        margin: 10px;
        color: transparent;
        transition: color 1s;
    }
    
    .icon:hover {
        border-radius: 10px;
    }

    @media screen and (max-width: 400px) {
        #logo {
            width: 80%;
            height: 80%;
        }
    }

    @media screen and (max-height: 370px) {
        #logo {
            top: 100px;
        }
    }
</style>