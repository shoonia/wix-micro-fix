<script lang="ts">
  import { useStoreon } from '@storeon/svelte';

  import type { IState, IEvents } from '../store/types';
  import { Route } from '../constants';
  import { sendTabMessage } from '../../chrome';
  import { Events } from '../../transport';

  const { dispatch } = useStoreon<IState, IEvents>();

  const handleClick = (): void => {
    dispatch('route/change', Route.loading);
    void sendTabMessage({ type: Events.checkPage });
  };
</script>

<button
  type="button"
  on:click={handleClick}
>
  Check Page
</button>
