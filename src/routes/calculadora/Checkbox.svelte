<script>
    export let value = false;
    export let label = '';
</script>

<button
on:click={() => {
  value = !value;
}}
class="neob-clickable rounded-md px-2 py-3 m-1 {$$props.class}"
class:bg-success={value}
class:neob-clicked={value}
class:bg-neutral-opacidad={!value}>{label}</button
>