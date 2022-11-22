<template>
	<el-menu class="el-menu-vertical-demo" :collapse="collapse">
		<el-menu-item index="0" @click="$router.push('/')">
			<el-icon><Menu /></el-icon>
			<span>Bosh sahifa</span>
		</el-menu-item>
		<el-menu-item index="1" @click="$router.push('/workers')">
			<el-icon><Avatar /></el-icon>
			<span>Xodimlar Bo’limi</span>
		</el-menu-item>
		<el-menu-item index="2" @click="$router.push('/directions')">
			<el-icon><List /></el-icon>
			<span>Yo'nalishlar</span>
		</el-menu-item>
		<el-menu-item index="3" @click="$router.push('/groups')">
			<el-icon><Tickets /></el-icon>
			<span>Guruhlar</span>
		</el-menu-item>
		<el-menu-item index="4" @click="$router.push('/pupils')">
			<el-icon><UserFilled /></el-icon>
			<span>O’quvchilar</span>
		</el-menu-item>
		<el-menu-item index="5" @click="$router.push('/payments')">
			<el-icon><CreditCard /></el-icon>
			<span>Kassa</span>
		</el-menu-item>
		<el-menu-item index="6" @click="$router.push('/spending')">
			<el-icon><ShoppingTrolley /></el-icon>
			<span>Chiqimlar Bo’limi</span>
		</el-menu-item>
	</el-menu>
</template>

<script>
export default {
	data() {
		return {
			collapse: false
		}
	},
	mounted() {
		this.resize()
		window.addEventListener('resize', this.resize)
	},
	methods: {
		resize(){
			this.collapse = window.innerWidth <= 1024
		}
	},
}
</script>

<style lang="scss">
.el-aside {
	background-color: var(--el-color-white);
	height: 100vh;
	--el-aside-width: 230px;
}
.el-menu {
	--el-menu-border-color: transparent;
	&-item {
		--el-menu-active-color: #0052CC;
		border-left: 3px solid transparent;
		&.is-active {
			border-left-color: var(--el-menu-active-color);
		}
	}
}
@media (max-width: 1024px) {
	aside.el-aside {
		width: unset;
	}
}
</style>