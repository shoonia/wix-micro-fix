<script lang="ts">
  import { to } from '../../chrome';

  const handleClick = (event: MouseEvent): void => {
    event.preventDefault();
    to('slack://channel?team=T02T01M9Y&id=C0286E3D370');
  };
</script>

<a
  href="/"
  on:click={handleClick}
>
  Feedback
</a>

<style>
  a {
    color: #3899ec;
  }
</style>
