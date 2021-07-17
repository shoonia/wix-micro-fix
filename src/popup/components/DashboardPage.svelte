<script lang="ts">
  import { useStoreon } from '@storeon/svelte';

  import type { IState, IEvents } from '../store/types';
  import { Route } from '../constants';
  import { Events } from '../../transport';
  import { sendTabMessage } from '../../chrome';
  import Button from './Button.svelte';

  const { dispatch } = useStoreon<IState, IEvents>();

  const handleClick = (): void => {
    dispatch('route/change', Route.loading);
    void sendTabMessage({ type: Events.checkPage });
  };
</script>

<div>
  <Button onClick={handleClick}>
    Check Page
  </Button>
</div>

<style>
  div {
    display: grid;
    justify-content: center;
  }
</style>
