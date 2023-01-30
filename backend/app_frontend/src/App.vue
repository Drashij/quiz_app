<template>
	<div>
		<router-view></router-view>
	</div>
</template>
<script>
// import HelloWorld from "./components/dashboard.vue";
// import index from "./components/index.vue";
// import register from "./components/register.vue";
// import login from "./components/login.vue";
export default {};
</script>

<style scoped>
header {
	line-height: 1.5;
}

@media (min-width: 1024px) {
	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}

	.logo {
		margin: 0 2rem 0 0;
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}
}
</style>
