<script lang="ts">
  export let onClick: EventHandlerNonNull;
</script>

<button
  type="button"
  on:click={onClick}
>
  <slot></slot>
</button>

<style>
  button {
    transition: all 0.2s ease, visibility 0s;
    border-radius: 100px;
    background-color: #3637f5;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    border: none;
    display: block;
    min-width: 10px;
    min-height: 10px;
    padding: 10px 25px;
  }

  button:hover {
    background: #2224e2;
  }
</style>
