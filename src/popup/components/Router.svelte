<script lang="ts">
  import { useStoreon } from '@storeon/svelte';

  import type { IEvents, IState } from '../store/types';
  import { Route } from '../constants';
  import LoadingPage from './LoadingPage.svelte';
  import DashboardPage from './DashboardPage.svelte';
  import RapportPage from './RapportPage.svelte';
  import NotSupportedPage from './NotSupportedPage.svelte';
  import ErrorPage from './ErrorPage.svelte';

  const { route } = useStoreon<IState, IEvents>('route');
</script>

{#if $route === Route.loading}
  <LoadingPage />
{:else if $route === Route.dashboard}
  <DashboardPage />
{:else if $route === Route.rapport}
  <RapportPage />
{:else if $route === Route.notSupported}
  <NotSupportedPage />
{:else}
  <ErrorPage />
{/if}
