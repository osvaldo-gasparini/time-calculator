<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let currentView: string;
  
  const dispatch = createEventDispatcher<{ viewChange: string }>();
  
  function switchView(view: string) {
    dispatch('viewChange', view);
  }
</script>

<nav class="navigation">
  <div class="nav-container">
    <div class="nav-brand">
      <h1>Task Tracker</h1>
    </div>
    
    <div class="nav-tabs">
      <button 
        class="nav-tab" 
        class:active={currentView === 'tracker'}
        on:click={() => switchView('tracker')}
      >
        Tracker
      </button>
      <button 
        class="nav-tab" 
        class:active={currentView === 'calculator'}
        on:click={() => switchView('calculator')}
      >
        Time Calculator
      </button>
    </div>
  </div>
</nav>

<style>
  .navigation {
    background: white;
    border-bottom: 1px solid var(--neutral-200);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
  }
  
  .nav-brand h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
    margin: 0;
  }
  
  .nav-tabs {
    display: flex;
    gap: 0.5rem;
  }
  
  .nav-tab {
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    color: var(--neutral-600);
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .nav-tab:hover {
    background: var(--neutral-100);
    color: var(--neutral-800);
  }
  
  .nav-tab.active {
    background: var(--primary);
    color: white;
  }
  
  @media (max-width: 640px) {
    .nav-container {
      flex-direction: column;
      height: auto;
      padding: 1rem;
      gap: 1rem;
    }
    
    .nav-brand h1 {
      font-size: 1.25rem;
    }
  }
</style>