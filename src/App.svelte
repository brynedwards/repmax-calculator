<script lang="ts">
  import { Map } from "immutable";
  import Tailwindcss from "./Tailwindcss.svelte";

  const params = new URLSearchParams(window.location.search);

  function range(start: number, stop: number, step: number) {
    const arr = [];
    for (var i = start; i >= stop; i -= step) {
      arr.push(i);
    }
    return arr;
  }

  type FormulaMap = Map<string, (w: number, r: number) => number>;

  // taken from wikipedia
  const formulas: FormulaMap = Map({
    brzycki: (w, r) => (w * 36) / (37 - r),
    mcglothin: (w, r) => (100 * w) / (101.3 - 2.67123 * r),
  });

  const form = {
    w: Number(params.get("w")),
    r: Number(params.get("r")),
    formula: "brzycki",
  };

  function formatted(n: number) {
    return n.toLocaleString(undefined, { maximumFractionDigits: 1 });
  }

  $: rm = formulas.get(form.formula)(form.w, form.r);
</script>

<style>
  @layer base {
    h1 {
      @apply text-4xl text-gray-700;
    }
    label.text-label {
      @apply block text-gray-500 font-bold text-right mb-1 pr-4;
    }
    input[type="number"] {
      @apply bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight;
    }
    input[type="number"]:focus {
      @apply outline-none bg-white border-purple-500;
    }
    .list {
      @apply grid grid-cols-2 gap-x-12 border-solid border-b justify-items-center;
    }
  }
</style>

<Tailwindcss />
<main class="flex flex-col items-center">
  <h1>Rep Max Calculator</h1>
  <form class="w-full max-w-sm">
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label class="text-label" for="weight">Weight</label>
      </div>
      <div class="md:w-2/3">
        <input id="weight" type="number" bind:value={form.w} />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label class="text-label" for="repetitions">Repititions</label>
      </div>
      <div class="md:w-2/3">
        <input id="repetitions" type="number" bind:value={form.r} />
      </div>
    </div>
    {#each [...formulas.keys()] as formula}
      <div class="flex flex-row items-center hidden">
        <input
          id={formula}
          type="radio"
          bind:group={form.formula}
          value={formula} />
        <label for={formula} class="ml-2">{formula}</label>
      </div>
    {/each}
  </form>
  <div class="text-gray-600 text-2xl font-light">
    <div class="list font-semibold">
      <div>Percentage</div>
      <div>Weight</div>
    </div>
    {#each range(100, 30, 5) as p}
      <div class="list">
        <div>{p}%</div>
        <div>{formatted((rm * p) / 100)}</div>
      </div>
    {/each}
  </div>
</main>
