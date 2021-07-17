<script lang="ts">
  import NotFound from './Icons/NotFound.svelte';
</script>

<section>
  <figure>
    <NotFound />
    <figcaption>
      We don't support this page
    </figcaption>
  </figure>
</section>

<style>
  section {
    display: grid;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 100%;
  }

  figure {
    padding: 0;
    margin: 0;
    text-align: center;
  }

  figcaption {
    margin-top: 16px;
    font-size: 14px;
    display: block;
  }
</style>
