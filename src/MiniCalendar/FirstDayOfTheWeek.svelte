<script>
    import { createEventDispatcher } from "svelte"
    
    const dispatch = createEventDispatcher()

    export let firstDayOfTheWeek
    $: dispatch("firstDayOfTheWeekChange", { firstDayOfTheWeek: parseInt(firstDayOfTheWeek) })

</script>


<div class="row g-2 align-items-center">
    <div class="col-auto">
        <label for="year" class="col-form-label">Start week on </label>
    </div>
    <div class="col-auto">
        <select class="form-select" bind:value={firstDayOfTheWeek}>
            <option value="0" selected={firstDayOfTheWeek === 0 ? true : false}>
                Sunday
            </option>
            <option value="1" selected={firstDayOfTheWeek > 0 ? true : false}>
                Monday
            </option>
        </select>
    </div>
</div>