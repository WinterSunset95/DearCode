<script>
export let caretMode;

</script>

<div>
</div>

<style>

@keyframes blink {
	0% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

div {
	height: 100%;
	width: 1px;
	border: 1px solid var(--buttons);
	animation: blink 1s step-end infinite;
}

</style>
