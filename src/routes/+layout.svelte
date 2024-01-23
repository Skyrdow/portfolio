<script>
  import "../app.css";
  import { dev } from "$app/environment";
  import "@fontsource-variable/public-sans";
  import { inject } from '@vercel/analytics';

  inject({ mode: dev ? 'development' : 'production' });
</script>

<header class="bg-gradient-to-b from-cyan-500 to-blue-500 p-4 h-[5vh]">
  <h1>Lucas Mesias</h1>
</header>
<main class="min-h-[90vh] svg-bg">
  <slot />
</main>
<footer class="bg-gradient-to-b from-cyan-500 to-blue-500 h-[5vh]">
  <a href="https://www.svgbackgrounds.com/"
    >Background CSS by svgbackgrounds.com</a
  >
  <div class="">Hola</div>
</footer>

<style>
  :global(body) {
    font-family: "Public Sans Variable", sans-serif;
  }
</style>
