<script lang="ts">
	import {router} from 'tinro'
	import {fade} from 'svelte/transition'
</script>

{#key $router.path}
    <div in:fade="{{ duration: 700}}">
        <slot></slot>
    </div>
{/key}