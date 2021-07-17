<script lang="ts">
  import {useStoreon} from '@storeon/svelte';

  import type { IEvents, IState } from '../store/types';

  const { rapport } = useStoreon<IState, IEvents>('rapport');
</script>

<table>
  <tr>
    <th colspan="4">
      Links
    </th>
  </tr>
  <tr>
    <th>All</th>
    <th>Ok</th>
    <th>Warn</th>
    <th>Error</th>
  </tr>
  <tr>
    <td>
      {$rapport.all}
    </td>
    <td class="ok">
      {$rapport.ok.length}
    </td>
    <td class="warn">
      {$rapport.warn.length}
    </td>
    <td class="error">
      {$rapport.error.length}
    </td>
  </tr>
</table>

{#if $rapport.images > 0}
<table>
  <tr>
    <th>
      Broken Images
    </th>
  </tr>
  <tr>
    <td class="error">
      {$rapport.images}
    </td>
  </tr>
</table>
{/if}

<style>
  table {
    display: block;
    overflow: auto;
    font-size: 16px;
  }

  caption {
    margin-bottom: 10px;
    white-space: nowrap;
    text-align: left;
  }

  th,
  td {
    padding: 3px 10px;
    text-align: center;
    background-color: #fff;
    border-radius: 4px;
  }

  th {
    font-weight: normal;
    color: #32536a;
  }

  td {
    font-family: monospace;
  }

  .ok {
    color: #44823f;
  }

  .warn {
    color: #fdb10c;
  }

  .error {
    color: #d8504c;
  }
</style>
