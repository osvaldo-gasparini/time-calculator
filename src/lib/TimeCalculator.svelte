<script lang="ts">
  import { parseTimeEntries, formatTotalTime } from './timeParser';
  
  let timeInput = '';
  let totalMinutes = 0;
  let isValid = true;
  let parsedEntries: Array<{original: string, minutes: number, valid: boolean}> = [];
  
  $: {
    const result = parseTimeEntries(timeInput);
    parsedEntries = result.entries;
    totalMinutes = result.total;
    isValid = result.isValid;
  }
  
  function handleInputChange() {
    // Trigger reactive statement
    timeInput = timeInput;
  }
</script>

<div class="container">
  <aside class="sidebar left-sidebar">
    <!-- Space for future ads/integrations -->
  </aside>
  
  <main class="main-content">
    <div class="calculator-card">
      <header class="header">
        <h1 class="title">Time Calculator</h1>
        <p class="subtitle">Sum multiple time entries easily</p>
      </header>
      
      <div class="input-section">
        <label for="time-input" class="label">Enter time entries:</label>
        <textarea
          id="time-input"
          bind:value={timeInput}
          on:input={handleInputChange}
          placeholder="Examples:&#10;1 hr&#10;30 min&#10;1:45 hr&#10;20min"
          class="time-input"
          class:error={!isValid}
        ></textarea>
        <div class="input-help">
          <span class="help-text">Separate entries with commas or new lines</span>
          <span class="formats">Formats: "15 min", "1 hr", "1:30 hr"</span>
        </div>
      </div>
      
      <div class="result-section">
        <div class="total-display" class:has-value={totalMinutes > 0}>
          <span class="total-label">Total Time:</span>
          <span class="total-value">{formatTotalTime(totalMinutes)}</span>
        </div>
        
        {#if parsedEntries.length > 0}
          <div class="entries-breakdown">
            <h3 class="breakdown-title">Breakdown:</h3>
            <div class="entries-list">
              {#each parsedEntries as entry}
                <div class="entry-item" class:invalid={!entry.valid}>
                  <span class="entry-original">{entry.original}</span>
                  <span class="entry-arrow">→</span>
                  <span class="entry-minutes">
                    {entry.valid ? `${entry.minutes} min` : 'Invalid format'}
                  </span>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </main>
  
  <aside class="sidebar right-sidebar">
    <!-- Space for future ads/integrations -->
  </aside>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr minmax(320px, 600px) 1fr;
    min-height: 100vh;
    padding: 2rem 1rem;
    gap: 2rem;
  }
  
  .sidebar {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    min-height: 200px;
  }
  
  .main-content {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  
  .calculator-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 2rem;
    width: 100%;
    max-width: 600px;
    transition: all 0.3s ease;
  }
  
  .calculator-card:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  .header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.025em;
  }
  
  .subtitle {
    font-size: 1.1rem;
    color: #64748b;
    margin: 0;
  }
  
  .input-section {
    margin-bottom: 2rem;
  }
  
  .label {
    display: block;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }
  
  .time-input {
    width: 100%;
    min-height: 120px;
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    line-height: 1.5;
    resize: vertical;
    transition: all 0.2s ease;
    font-family: 'Inter', system-ui, sans-serif;
    background: #f8fafc;
  }
  
  .time-input:focus {
    outline: none;
    border-color: #2563eb;
    background: white;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  
  .time-input.error {
    border-color: #ef4444;
    background: #fef2f2;
  }
  
  .input-help {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #64748b;
  }
  
  .help-text {
    font-style: italic;
  }
  
  .formats {
    font-family: 'Monaco', 'Consolas', monospace;
    background: #f1f5f9;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-size: 0.8rem;
  }
  
  .result-section {
    border-top: 1px solid #e2e8f0;
    padding-top: 1.5rem;
  }
  
  .total-display {
    text-align: center;
    padding: 1.5rem;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 12px;
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
  }
  
  .total-display.has-value {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    transform: scale(1.02);
  }
  
  .total-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #64748b;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .total-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2563eb;
    display: block;
  }
  
  .breakdown-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #374151;
    margin: 0 0 1rem 0;
  }
  
  .entries-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .entry-item {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    padding: 0.75rem;
    background: #f8fafc;
    border-radius: 8px;
    font-size: 0.875rem;
    transition: all 0.2s ease;
  }
  
  .entry-item:hover {
    background: #f1f5f9;
  }
  
  .entry-item.invalid {
    background: #fef2f2;
    border: 1px solid #fecaca;
  }
  
  .entry-original {
    font-family: 'Monaco', 'Consolas', monospace;
    color: #374151;
  }
  
  .entry-arrow {
    color: #64748b;
    margin: 0 0.5rem;
  }
  
  .entry-minutes {
    text-align: right;
    font-weight: 500;
    color: #10b981;
  }
  
  .entry-item.invalid .entry-minutes {
    color: #ef4444;
  }
  
  @media (max-width: 1024px) {
    .container {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .sidebar {
      display: none;
    }
  }
  
  @media (max-width: 640px) {
    .container {
      padding: 1rem 0.5rem;
    }
    
    .calculator-card {
      padding: 1.5rem;
      border-radius: 12px;
    }
    
    .title {
      font-size: 2rem;
    }
    
    .total-value {
      font-size: 2rem;
    }
    
    .input-help {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }
  }
</style>