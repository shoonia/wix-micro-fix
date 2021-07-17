<script lang="ts">
  import {useStoreon} from '@storeon/svelte';

  import type { IEvents, IState } from '../store/types';

  const { report } = useStoreon<IState, IEvents>('report');
</script>

<table>
  <caption>
    Links
  </caption>
  <tr>
    <th>All</th>
    <th>Ok</th>
    <th>Warn</th>
    <th>Error</th>
  </tr>
  <tr>
    <td>
      {$report.all}
    </td>
    <td class="ok">
      {$report.ok.length}
    </td>
    <td class="warn">
      {$report.warn.length}
    </td>
    <td class="error">
      {$report.error.length}
    </td>
  </tr>
</table>

{#if $report.images > 0}
  <div class="images">
    Broken Images <code class="error badge">{$report.images}</code>
  </div>
{/if}

<style>
  table {
    display: block;
    overflow: auto;
    font-size: 16px;
  }

  caption,
  .images {
    margin-bottom: 10px;
    white-space: nowrap;
    text-align: left;
    font-size: 16px;
  }

  th,
  td,
  .badge {
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
