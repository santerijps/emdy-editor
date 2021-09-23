<script>

    import Emdy from "./Emdy.svelte"

</script>


<svelte:head>
    <link rel="stylesheet" href="/dist/css/bootstrap.min.css">
    <script src="/dist/js/bootstrap.bundle.min.js"></script>
</svelte:head>


<div class="h-100 d-flex flex-column">

    <nav class="p-3">
        <h3>Hello, world!</h3>
    </nav>

    <main class="flex-fill">
        <Emdy/>
    </main>

</div>