<script lang="ts">
	import {Route,router} from 'tinro'
	import Transition from './Transition.svelte'
	import MiniCalendar from './MiniCalendar.svelte'

	// router.mode.memory()
</script>


<header>
	<h1><a href="/">Logseq Tools</a></h1>
	<p>Couple of (hopefully!) useful utilities to help us work in <a href="https://logseq.com">Logseq</a></p>
</header>
<nav>
    <a href="/mini-calendar">Mini Calendar</a>
    <a href="/bujo">BuJo Themes Configurator</a>
</nav>

<Transition>
	<Route path="/">
		<main>
		</main>
	</Route>
	<Route path="/mini-calendar">
		<MiniCalendar />
	</Route>
	<Route path="/bujo">
		BuJo
	</Route>
</Transition>

<style>
	header {
		text-align: center;
		padding: 20px;
		/* max-width: 240px; */
		margin: 0 auto;
		border-bottom: 1px solid #d5d5d5;
		margin-bottom: 30px;
	}

	nav {
		text-align: center;
	}

	h1 {
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	h1 a {
		color: #ff3e00;
	}
</style>