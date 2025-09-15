<script lang="ts">
  import Navigation from './lib/Navigation.svelte';
  import TaskTracker from './lib/TaskTracker.svelte';
  import TimeCalculator from './lib/TimeCalculator.svelte';
  
  let currentView = 'tracker';
  
  function handleViewChange(event: CustomEvent<string>) {
    currentView = event.detail;
  }
</script>

<main>
  <Navigation {currentView} on:viewChange={handleViewChange} />
  
  {#if currentView === 'tracker'}
    <TaskTracker />
  {:else if currentView === 'calculator'}
    <TimeCalculator />
  {/if}
</main>

<style>
  main {
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  }
</style>