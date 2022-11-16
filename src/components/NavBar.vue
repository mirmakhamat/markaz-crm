<template>
	<router-link to="/" class="logo">
		<img src="@/assets/img/logo.jpg" alt="">
	</router-link>
	<el-menu class="el-menu-vertical-demo">
		<el-menu-item index="1" @click="$router.push('/workers')">
			<el-icon><Avatar /></el-icon>
			<span>Xodimlar Bo’limi</span>
		</el-menu-item>
		<el-menu-item index="2" @click="$router.push('/')">
			<el-icon><Money /></el-icon>
			<span>Oyliklar Bo'limi</span>
		</el-menu-item>
		<el-menu-item index="3" @click="$router.push('/directions')">
			<el-icon><List /></el-icon>
			<span>Yo'nalishlar</span>
		</el-menu-item>
		<el-menu-item index="4" @click="$router.push('/groups')">
			<el-icon><Tickets /></el-icon>
			<span>Guruhlar</span>
		</el-menu-item>
		<el-menu-item index="5" @click="$router.push('/pupils')">
			<el-icon><UserFilled /></el-icon>
			<span>O’quvchilar</span>
		</el-menu-item>
		<el-menu-item index="6" @click="$router.push('/payments')">
			<el-icon><CreditCard /></el-icon>
			<span>Kassa</span>
		</el-menu-item>
		<el-menu-item index="7" @click="$router.push('/spending')">
			<el-icon><ShoppingTrolley /></el-icon>
			<span>Chiqimlar Bo’limi</span>
		</el-menu-item>
		<el-menu-item index="8" @click="$router.push('/')">
			<el-icon><PieChart /></el-icon>
			<span>Hisobot Bo’limi</span>
		</el-menu-item>
	</el-menu>
</template>

<script>
export default {
	data() {
		return {
			loading: false
		}
	},
}
</script>

<style lang="scss">
.el-aside {
	background-color: #fff;
	height: 100vh;
}
.el-menu-item {
	--el-menu-active-color: #0052CC;
	border-left: 3px solid transparent;
	&.is-active {
		border-left-color: var(--el-menu-active-color);
	}
}
.logo {
	margin: 35px auto;
	width: 180px;
	display: block;
}
</style>