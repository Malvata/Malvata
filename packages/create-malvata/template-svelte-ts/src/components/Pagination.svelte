<script lang="ts">
    export let pageSize: number = 1;
    export let total: number = 1;
    export let currentPage: number = 1;
    import left from "./../../assets/chevron-left.svg";
    import right from "./../../assets/chevron-right.svg";
    export let onPage;
    function prev() {
        currentPage--;
        onPage(currentPage);
    }
    function next() {
        currentPage++;
        onPage(currentPage);
    }
    function page(p: number) {
        currentPage = p;
        onPage(p);
    }
    let pageCount = Math.ceil(total / pageSize);

    $: getPageIdx = function (idx: number) {
        if (currentPage < 4) {
            return idx + 1;
        } else if (currentPage > pageCount - 4) {
            return pageCount + idx - 5;
        } else {
            return currentPage - 2 + idx;
        }
    };
    $: pagebuttonclass = function (idx: number) {
        if (idx == currentPage) {
            return "page selected";
        } else {
            return "page";
        }
    };
</script>

<nav>
    <div class="inline-flex">
        <button class="paginator-arrow" on:click={prev}>
            <img src={left} alt="prev" />
        </button>
        {#if pageCount <= 8}
            {#each Array(pageCount) as _, i}
                <button
                    class={pagebuttonclass(i)}
                    on:click={() => {
                        page(i);
                    }}
                >
                    {i + 1}
                </button>
            {/each}
        {:else}
            <button
                class={pagebuttonclass(0)}
                on:click={() => {
                    currentPage = 1;
                    page(0);
                }}
            >
                {"1"}
            </button>

            {#if currentPage >= 4}
                <button
                    on:click={() => {
                        currentPage = Math.max(currentPage - 5, 1);
                        page(currentPage);
                    }}
                >
                    {"..."}
                </button>
            {/if}
            {#each Array(5) as _, i}
                <button
                    class={pagebuttonclass(getPageIdx(i))}
                    on:click={() => {
                        page(getPageIdx(i));
                    }}
                >
                    {getPageIdx(i) + 1}
                </button>
            {/each}
            {#if currentPage <= pageCount - 4}
                <button
                    on:click={() => {
                        currentPage = Math.min(currentPage + 5, pageCount);
                        page(currentPage);
                    }}
                >
                    {"..."}
                </button>
            {/if}
            <button
                class={pagebuttonclass(pageCount)}
                on:click={() => {
                    page(pageCount);
                }}
            >
                {pageCount + 1}
            </button>
        {/if}

        <button>
            <img src={right} alt="next" on:click={next} />
        </button>
    </div>
</nav>

<!-- markup (zero or more items) goes here -->
<style>
    /* your styles go here */
    button {
        box-sizing: border-box;
        border-width: 0;
        border-style: solid;
        border-color: #e5e7eb;
        display: flex;
        justify-content: center;
        margin-top: 2rem;
    }
    button > img {
        max-width: 100%;
        height: 100%;
    }
    .inline-flex {
        display: inline-flex;
    }
    .page {
        box-sizing: border-box;
        border-style: solid;
        border-color: #e5e7eb;
        font-size: 100%;
        background-image: none;
        cursor: pointer;
        line-height: inherit;
        border-width: 1px;
        font-weight: 700;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    nav {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        padding-top: 1rem;
        padding-bottom: 1rem;
        display: inline-table;
    }
    .selected {
        background-color: gray;
    }
</style>
