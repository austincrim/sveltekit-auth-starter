<script lang="ts">
  import { enhance } from "$app/forms"

  let { form } = $props()
</script>

<div class="flex flex-col items-center justify-center gap-4 py-12">
  <a class="text-blue-700 hover:underline" href="/login">Have an account?</a>
  <form
    method="post"
    use:enhance
    class="flex flex-col justify-center gap-2 p-12"
  >
    <h2 class="pb-4 text-4xl">Register</h2>
    <label for="email"> Email </label>
    <input required type="email" name="email" id="email" />
    <label for="password"> Password </label>
    <input
      required
      type="password"
      name="password"
      id="password"
      autocomplete="new-password"
    />
    <label for="confirmed"> Confirm Password </label>
    <input required type="password" name="confirmed" id="confirmed" />
    {#if form?.message}
      <p class="text-red-700">{form.message}</p>
    {/if}
    <button class="mt-4">Submit</button>
  </form>
</div>
