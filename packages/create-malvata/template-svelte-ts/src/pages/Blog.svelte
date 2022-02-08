<script lang="ts">
    import Header from "./../components/Header.svelte";
    import Base from "./../components/Base.svelte";
    import PageTag from "./../components/PageTag.svelte";
    import postConfig from "./../../blog/post/post-config.json";
    import Pagination from "./../components/Pagination.svelte";

    import Tag from './../components/Tag.svelte';
    import { Utils } from "../utils";
    let post_config: Array<any> = postConfig;

    function getTimeString(params: string) {
        let date = new Date(params);
        return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    }
    window.addEventListener("popstate", () => {
        currentPage = getPage();
    });
    function onPage(page:number) {
        window.location.hash = '#page='+page;
    }
    function getPage() {
        const path = window.location.hash;
        if(!path.includes("#page=")){
            return 0;
        }
        return Number.parseInt(path.split('#page=')[1])
    }
    let currentPage = getPage();
    let pageSize = 4;

    let tag = Utils.getUrlParam('tag');
    post_config =tag?post_config.filter(e=>e.tags.indexOf(tag)!==-1):post_config;

    let total = post_config.length;
    $:posts=post_config.slice(currentPage*pageSize,currentPage*pageSize+pageSize);

</script>

<Base>
    <Header />
    <PageTag>{"Blog"+(tag?"/"+tag:"")}</PageTag>
    <div class="p-12">
        {#each posts as post}
            <div>
                <p>
                    <strong>
                        <a class="title" href={`${post.route}`}>
                            {post.title ? post.title : post.route}
                        </a>
                    </strong>
                </p>
                <time datetime={post.date}>
                    {post.date ? getTimeString(post.date) : ""}
                </time>
                <div class="tags">
                    {#each post.tags ? post.tags : [] as tag}
                        <Tag tag={tag} />
                    {/each}
                </div>
            </div>
        {/each}
    </div>
    <Pagination total={total} currentPage={currentPage} pageSize={pageSize} onPage={onPage}/>

</Base>

<!-- markup (zero or more items) goes here -->
<style>
    .p-12 {
        padding: 3rem;
    }
    .p-12 strong {
        font-size: 15px;
        margin-right: 100px;
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
    .title {
        color: inherit;
        font-size: 2.25rem;
    }
    a {
        text-decoration: inherit;
    }
    time {
        font-style: oblique;
    }
</style>