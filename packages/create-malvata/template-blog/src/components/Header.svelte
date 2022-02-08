<script>
    // your script goes here
</script>
<div class="header__content">
    <h1 class="site-title"><a href="/">Chezi Lee</a></h1>
    <nav class="nav">
        <ul class="nav__list">
            <li class="nav-item"><a href="/blog/">Blog</a></li>
            <li class="nav-item"><a href="/about/">About</a></li>
            <li class="nav-item"><a href="/search/">Search</a></li>
            <li class="nav-item"><a href="/tags/">Tags</a></li>
            <!-- <li class="nav-item"><a href="/about.html">About</a></li> -->
        </ul>
    </nav>
</div>

<style>
    :root {
        max-width: none;
        width: 100%;
        /* text-transform: capitalize;
        text-transform: uppercase; */
        margin-bottom: 4rem;
    }
    .header__content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin-left: auto;
        margin-right: auto;
        max-width: 48.75rem;
        padding: 1rem;
        margin-top: 1rem;
        border-bottom: 1px solid #e6e6e6;
    }
    .site-title {
        font-size: 2rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .nav__list {
        display: flex;
        justify-content: space-around;
        list-style: none;
        font-size: 1rem;
        font-size: var(--text-base);
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
    }
    .nav__list li {
        margin-right: 2rem;
    }
    .nav__list a {
        color: #757575;
        text-decoration: none;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    a{
        text-decoration: inherit;
    }
</style>

<!-- markup (zero or more items) goes here -->