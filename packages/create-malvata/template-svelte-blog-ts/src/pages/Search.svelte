<script lang="ts">
    // your script goes here
    import Header from "./../components/Header.svelte";
    import Base from "./../components/Base.svelte";
    import PageTag from "src/components/PageTag.svelte";

    import postConfig from "./../../blog/post/post-config.json";
    import Fuse from "fuse.js";

    let post_config: Array<any> = postConfig;

    let fuse = new Fuse(post_config, {
        includeScore: true,
        includeMatches:true,
        keys: ["title", "tags", "content"],
    });

    let results = [];
    function oninput(evt) {
        let value = evt.target.value.trim();
        let res = fuse.search(value);
        results = res;
    }
</script>

<Base>
    <Header />
    <PageTag>Search</PageTag>
    <div id="searchbox">
        <input
            id="searchInput"
            placeholder="Search ↵"
            aria-label="search"
            type="search"
            autocomplete="off"
            on:input={oninput}
        />
        <ul id="searchResults" aria-label="search results">
            {#each results as res}
                <li class="post-entry">
                    <header class="entry-header">
                        {res.item.title+"  »"}
                    </header>
                    <!-- svelte-ignore a11y-missing-content -->
                    <a
                        href={window.location.origin +
                            "/blog/" +
                            res.item.route}
                    />
                </li>
            {/each}
        </ul>
    </div>
</Base>

<!-- markup (zero or more items) goes here -->
<style >
    #searchbox {
        font-family: -apple-system, BlinkMacSystemFont, segoe ui, Roboto, Oxygen,
            Ubuntu, Cantarell, open sans, helvetica neue, sans-serif;
        font-size: 18px;
        line-height: 1.6;
        word-break: break-word;
        box-sizing: border-box;
        margin: 15px;
    }
    #searchInput {
        word-break: break-word;
        box-sizing: border-box;
        font: inherit;
        background: 0 0;
        outline: 0;
        padding: 4px 10px;
        width: 100%;
        color: rgb(30, 30, 30);
        font-weight: 700;
        border: 2px solid rgb(214, 214, 214);
        border-radius: 8px;
    }
    #searchResults {
        color: rgb(30, 30, 30);
        font-family: -apple-system, BlinkMacSystemFont, segoe ui, Roboto, Oxygen,
            Ubuntu, Cantarell, open sans, helvetica neue, sans-serif;
        font-size: 18px;
        line-height: 1.6;
        word-break: break-word;
        box-sizing: border-box;
        padding: 0;
        margin: 10px 0;
        width: 100%;
    }
    .post-entry {
        font-family: -apple-system, BlinkMacSystemFont, segoe ui, Roboto, Oxygen,
            Ubuntu, Cantarell, open sans, helvetica neue, sans-serif;
        font-size: 18px;
        line-height: 1.6;
        word-break: break-word;
        box-sizing: border-box;
        background: rgb(255, 255, 255);
        transition: transform 0.1s;
        border: 1px solid rgb(238, 238, 238);
        list-style: none;
        border-radius: 8px;
        padding: 10px;
        margin: 10px 0;
        position: relative;
        font-weight: 500;
        text-align: left;
    }

    .entry-header {
        color: rgb(30, 30, 30);
        font-family: -apple-system, BlinkMacSystemFont, segoe ui, Roboto, Oxygen,
            Ubuntu, Cantarell, open sans, helvetica neue, sans-serif;
        font-size: 18px;
        line-height: 1.6;
        word-break: break-word;
        list-style: none;
        font-weight: 500;
        box-sizing: border-box;
        display: block;
    }
    .post-entry >a {
        font-family: -apple-system, BlinkMacSystemFont, segoe ui, Roboto, Oxygen,
            Ubuntu, Cantarell, open sans, helvetica neue, sans-serif;
        font-size: 18px;
        line-height: 1.6;
        word-break: break-word;
        list-style: none;
        font-weight: 500;
        box-sizing: border-box;
        color: rgb(30, 30, 30);
        text-decoration: none;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        outline: none;
    }
    
</style>
