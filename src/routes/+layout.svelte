<script lang="ts">
  import "../app.css"
  let { data, children } = $props()
</script>

<nav class="flex items-center justify-between p-4 bg-gray-50 border-b">
  <span class="font-semibold">Your next great idea</span>
  <span class="flex gap-4">
    {#if data.email}
      <span>{data.email}</span>
      <form method="post" action="/?/logout">
        <button class="text-blue-700">Log out</button>
      </form>
    {/if}
  </span>
</nav>

{@render children()}
