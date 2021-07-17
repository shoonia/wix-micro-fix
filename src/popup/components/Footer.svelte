<script lang="ts">
  import { to } from '../../chrome';
  import SlackIcon from './Icons/SlackIcon.svelte';

  const handleClick = (event: MouseEvent): void => {
    event.preventDefault();
    to('slack://channel?team=T02T01M9Y&id=C0286E3D370');
  };
</script>

<a
  href="/"
  on:click={handleClick}
>
  <SlackIcon />
</a>

<style>
  a {
    display: inline-flex;
  }
</style>
