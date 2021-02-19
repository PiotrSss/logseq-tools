<script>
    import { createEventDispatcher } from "svelte"
    
    const dispatch = createEventDispatcher()

    export let firstDayOfTheWeek
    $: dispatch("firstDayOfTheWeekChange", { firstDayOfTheWeek })

</script>


<p>First day of the week:</p>
<label> 
    <input type=radio bind:group={firstDayOfTheWeek} value={0}> Sunday
</label>
<label>
	<input type=radio bind:group={firstDayOfTheWeek} value={1}> Monday
</label>