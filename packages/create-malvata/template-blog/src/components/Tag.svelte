<script lang='ts'>
    // your script goes here
    export let tag:string;
</script>
    <a href={`/blog/?tag=${tag}`}>
        <div class="post-tag">{tag}</div>
    </a>
<style>
.post-tag {
        border-radius: 9999px;
        display: inline-block;
        font-size: 0.75rem;
        line-height: 1rem;
        margin-top: 0.25rem;
        margin-right: 0.25rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        background-color: gray;
        color: white;
    }
</style>

<!-- markup (zero or more items) goes here -->