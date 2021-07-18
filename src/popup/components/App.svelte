<script lang="ts">
  import { provideStoreon } from '@storeon/svelte';

  import { store } from '../store';
  import Router from './Router.svelte';
  import Footer from './Footer.svelte';

  provideStoreon(store);
</script>

<main>
  <Router />
</main>
<footer>
  <Footer />
</footer>

<style>
  :global(*),
  :global(*::before),
  :global(*::after) {
    box-sizing: border-box;
  }

  :global(html),
  :global(body) {
    margin: 0;
    padding: 0;
  }

  :global(body) {
    color: #162d3d;
    background-color: #f0f4f7;
  }

  main {
    padding: 10px 5px;
    gap: 10px;
    min-width: 250px;
    min-height: 180px;
    display: grid;
    align-items: center;
    justify-content: center;
  }

  footer {
    height: 35px;
    padding: 5px 10px;
    border-top: 1px solid #b6c1cd;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
