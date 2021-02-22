<script lang="ts">
	import {Route,active,router} from 'tinro'
	import Transition from './Transition.svelte'
	import MiniCalendar from './MiniCalendar.svelte'
	// router.mode.memory()
</script>


<div class="container">
	<header>
		<h1><a href="/">Logseq Tools</a></h1>
		<p>A couple of (hopefully!) useful utilities to help us to work with <a href="https://logseq.com">Logseq</a></p>
	</header>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mb-2 mb-lg-0 mx-auto">
					<li class="nav-item mx-2">
						<a class="nav-link" aria-current="page" href="/mini-calendar" use:active>Mini Calendar</a>
					</li>
					<li class="nav-item mx-2">
						<a class="nav-link" href="/bujo-theme" use:active>BuJo Themes</a>
					</li>
					<li class="nav-item mx-2">
						<a class="nav-link" href="/clean-theme" use:active>Clean Themes</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	<main class="my-5">
		<Transition>
			<Route path="/">
			</Route>
			<Route path="/mini-calendar">
				<MiniCalendar />
			</Route>
			<Route path="/bujo-theme">
				BuJo
			</Route>
			<Route path="/clean-theme">
				Clean
			</Route>
		</Transition>
	</main>

	<footer>
		If you'd like to support my work: <a href="https://paypal.me/piotrsss">https://paypal.me/piotrsss</a> :)
	</footer>

</div>

<style>
	header {
		text-align: center;
		padding: 20px;
		/* margin: 0 auto; */
	}

	h1 {
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	h1 a {
		color: #ff3e00;
	}

	footer {
		border-top: 1px solid #d5d5d5;
		padding: 20px 10px;
	}
</style>