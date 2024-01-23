<script>
  export let value = 0;
  export let id = "";

  function increment() {
      if (value < 999)
    value += 1;
  }

  function decrement() {
    if (value > 1)
    value -= 1;
  }
</script>

<div class="flex p-1">
  <button class="w-20 h-10 z-[1] ease-linear neob-clickable border-l-0 rounded-l-md bg-error" on:click={decrement}>-</button><input
    class="w-20 h-10 z-[2] text-center text-lg neob-border-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    type="number"
    id={id}
    bind:value
    min="0"
    max="999"
  />
  <button class="w-20 h-10 z-[3] neob-clickable border-r-0 rounded-r-md bg-success" on:click={increment}>+</button>
</div>
