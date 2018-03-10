<template>
	<div id="nearby">
		<div class="recom">
			<div class="recom-img">
				<img src="../../../assets/home/1.jpg"/>
				<div class="user-recom">
					<span class="pull-right">景点名称</span>
				</div>
			</div>
			<div class="see-it">
				<span>国家星级指数: 
					<span class="star" v-for="n in 5">A</span>
				</span>
				<span class="pull-right">
					<span class="glyphicon glyphicon-eye-open"></span> 查看
				</span>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style>
</style>