<script lang="ts">
  import { enhance } from "$app/forms"

  export let form
</script>

<div class="flex flex-col items-center justify-center gap-4 py-12">
  <a class="text-blue-700 hover:underline" href="/register">Need an account?</a>
  <form
    method="post"
    use:enhance
    class="flex flex-col gap-2 p-12 styled-border"
  >
    <h2 class="pb-4 text-4xl">Log in</h2>
    <label for="email"> Email </label>
    <input autocomplete="email" required type="email" name="email" id="email" />
    <label for="password">Password</label>
    <input
      required
      min="8"
      type="password"
      name="password"
      id="password"
      autocomplete="current-password"
    />
    {#if form?.message}
      <p class="mt-2 text-red-500">{form.message}</p>
    {/if}
    <button class="mt-4" data-type="primary">Submit</button>
  </form>
</div>
