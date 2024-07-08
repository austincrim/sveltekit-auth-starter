<script lang="ts">
  import "../app.css"
  let { data } = $props()
</script>

<nav class="flex items-center justify-between p-4 bg-gray-50 border-b">
  <span class="font-semibold">Welcome</span>
  <span class="flex gap-8">
    {#if data.email}
      <span>{data.email}</span>
      <form method="post" action="/?/logout">
        <button class="text-blue-700">Log out</button>
      </form>
    {/if}
  </span>
</nav>

<slot />
