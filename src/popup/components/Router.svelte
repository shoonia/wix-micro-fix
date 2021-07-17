<script lang="ts">
  import { useStoreon } from '@storeon/svelte';

  import type { IEvents, IState } from '../store/types';
  import { Route } from '../constants';
  import Loader from './Icons/Loader.svelte';
  import DashboardPage from './DashboardPage.svelte';
  import RapportPage from './RapportPage.svelte';
  import NotSupportedPage from './NotSupportedPage.svelte';
  import ErrorPage from './ErrorPage.svelte';

  const { route } = useStoreon<IState, IEvents>('route');
</script>

{#if $route === Route.loading}
  <Loader />
{:else if $route === Route.notSupported}
  <NotSupportedPage />
{:else if $route === Route.rapport || $route === Route.dashboard}
  {#if $route === Route.rapport}
    <RapportPage />
  {/if}
  <DashboardPage />
{:else}
  <ErrorPage />
{/if}
