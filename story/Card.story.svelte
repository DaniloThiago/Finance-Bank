<Hst.Story>
  <Card info={card} />
</Hst.Story>
 
<script lang="ts">
  import Card from '../src/components/Card.svelte'
  export let Hst;

  let card = { value: 5750.2, number: 5282345678901289, exp: '09/25', flag: 'visa' };
</script>
