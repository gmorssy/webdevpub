<script>
    export let json;
    import { fly, fade, slide, draw } from "svelte/transition";


    function splitLink(str) {

        let parts = str.split('/');
        let link = '';

        for (let i = 0; i < parts.length; i++) {
            link += parts[i];
            link += (i <= 1) ? '/' : (i < parts.length-1) ? ' › ' : '';
        }

        return link;
    }

    function splitDate(str) {
        let published = str.split('T');
        published[1] = published[1].slice(0, -1);

        let time = published[1].split(':');

        return published[0] + ' (' + time[0] + ':' + time[1] + ')';
    }

    function shorterText(str, length) {
        let words = str.split(' ');
        let description = '';
        
        if (words.length > length) {
            for (let i = 0; i < length; i++) {
                description += words[i];
                description += ' ';
            }

            description += '...';
        }
        else {
            description = str;
        }

        return description;
    }
</script>

{#if json && "data" in json && "items" in json.data && json.data.items.length > 0 && json.data.q != "edvin"}
    <div class="display-res">
        {#each json.data.items as item}
            <div in:fade="{{ duration: 300 }}" out:fade="{{ duration: 100 }}" class="results">    
                <div style="display: flex; flex-direction: column">
                    <a class="link-display" href="{item.url}"> {splitLink(item.url)} </a>
                        <div class="link">
                            <a href="{item.url}" class="text" style="margin: 0px; color:#1a0dab">{shorterText(item.name, 15)}</a>
                            {#if item.type == 'file'}
                                <i class="fa fa-download" aria-hidden="true" style="margin-top: 4.5px; margin-left: 10px"/>
                            {/if}
                        </div>
                </div>
                {#if item.hasOwnProperty('description')}
                    <p class="text">{shorterText(item.description, 50)}</p>
                {/if}
                <p class="text" style="font-size: 10px"><strong>Published:</strong> {splitDate(item.published_at)}</p>
                
            </div>
        {/each}
    </div>
{:else if json && json.data.q.toLowerCase() == 'edvin'}
    <div class="display-res">
        <!-- Extra search result -->
        <div class="results" in:fade="{{ duration: 300 }}" out:fade="{{ duration: 100 }}" style="display: flex; flex-direction: row">
            <img id="extra-image" src="https://cdn.discordapp.com/attachments/751047986141855744/948928781790367814/edvin.png" alt="edvin"/>
            <div style="display: flex; flex-direction: column; text-align: center">
                <p style="font-size: 20px"><strong>This is Edvin</strong></p>
                <p style="margin-top: 30px">He's one of the most bad ass people you've ever interfered with. If you ever meet him on the streets, be careful! He is a professional Bong user. Typically tall, strong, and handsome. Is always looking fresh. That guy is dangerous, that's Edvin.
                
                <p><strong>Origin of Edvin</strong></p>
                <p>Edvin is a Scandinavia, Estonian, Hungarian and Finnish form of the Old English name Edwin.</p>
                
                <p><strong>Meaning of Edvin</strong></p>
                <p>Edvin means “rich friend” (from Old English “ead” =wealth/fortune + “wine” = friend).</p>

                <p><strong>Sources</strong></p>
                <a href="https://charlies-names.com/en/edvin/">charlies-names.com</a>
                <a href="https://www.urbandictionary.com/define.php?term=Edvin">urbandictionary.com</a>
                <p>Edvin told me a lot of the information too.</p>
            </div>
        </div>
    </div>
{:else if json}
    <p style="position: fixed; top: 100px" in:fade out:fade="{{ duration: 100 }}">No results found.</p>
    
{/if}

<style>
    .display-res {
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;
        overflow-y: auto;
        box-sizing: border-box;
        padding-left: 10%;
        padding-right: 10%;
        max-width: 100%;
        min-width: 100%;
        padding-bottom: 0px;
        margin-top: 10px;
    }

    .results {
        border-radius: 25px;
        background-color: rgba(245, 245, 245, 0.864);
        padding: 20px;
        width: 100%;
        box-sizing: border-box;
        word-wrap: break-word;
        margin: 10px 0;

        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 4px 5px 0 rgba(0, 0, 0, 0.09);
        transition: box-shadow 0.1s
    }

    .results:hover {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.19);
    }

    .link-display {
        font-size: 10px;
        color: gray;
        margin: 20px 0px 5px 0px;
        text-decoration: none;
    }

    .link {
        display: flex;
        flex-direction: row;
        
        color: #1a0dab;
    }

    #extra-image {
        width: 25%; 
        margin-right: 10px;
    }

    p {
        margin-bottom: 5px;
    }

    /** https://onaircode.com/html-css-custom-scrollbar-examples/ */
    ::-webkit-scrollbar {
        width: 15px;
        height: 15px;
    }
    ::-webkit-scrollbar-track {
        margin: 10px 0;
        border-radius: 10px;
        background-color: rgba(204, 204, 204, 0.387);
    }
    ::-webkit-scrollbar-thumb {
        background-image: linear-gradient(45deg, rgb(208, 0, 255), rgb(242, 142, 255));
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        -webkit-box-shadow: rgba(0, 0, 0, 0.12) 0 3px 13px 1px;
    }

    @media screen and (max-width: 400px) {
        .text {
            font-size: 90%;
        }

        .link-display {
            font-size: 8px;
        }
    }

    @media screen and (max-width: 560px) {
        #extra-image {
            width: 0px;
            margin-right: 0px;
        }
    }
</style>