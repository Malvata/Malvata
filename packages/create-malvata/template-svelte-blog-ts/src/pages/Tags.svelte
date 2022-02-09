<script lang="ts">
    import Header from "./../components/Header.svelte";
    import Base from "./../components/Base.svelte";
    import PageTag from "./../components/PageTag.svelte";
    import postConfig from "./../../blog/post/post-config.json";
    import Tag from "./../components/Tag.svelte";

    let post_config: Array<any> = postConfig;

    let tags: Array<string> = [];
    for (const iterator of post_config) {
        if (iterator.tags) {
            for (const ii of iterator.tags) {
                if (tags.indexOf(ii) == -1) {
                    tags.push(ii);
                }
            }
        }
    }
</script>

<Base>
    <Header />
    <PageTag>Tags</PageTag>
    <div class="p-12">
        <div class="tags">
            {#each tags ? tags : [] as tag}
                <Tag {tag} />
            {/each}
        </div>
    </div>
</Base>

<!-- markup (zero or more items) goes here -->
<style>
    .p-12 {
        padding: 3rem;
    }

    .p-12 > div {
        width: 48.75rem;
        height: 100px;
        margin-left: auto;
        margin-right: auto;
        text-align: left;
        padding-top: 1rem;
        padding-bottom: 1rem;
        display: inline-table;
    }

    .tags {
        padding-top: 10px;
    }
</style>
