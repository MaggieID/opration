<template>
	<div id="recommend">
		<div class="recom">
			<div class="recom-img">
				<img src="../../../assets/home/1.jpg"/>
				<img src="../../../assets/tou.jpg" class="user-tou"/>
				<div class="user-recom">
					<span>username</span>
					<span class="pull-right">2013-2-2</span>
				</div>
			</div>
			<div class="see-it">
				<span>推荐指数: 
					<span class="glyphicon glyphicon-star star" v-for="n in 5"></span>
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
	.recom{
		margin-bottom: 15px;		
	}
	.recom-img{	
		height: 160px;
		position: relative;
	}
	.recom-img img{
		width: 100%;
		height: 100%;
	}
	.see-it{
		padding: 7px 15px;
		background: #EAEAEA;
		color: gray;
	}
	.star{
		color: #26A2FF;
	}
	.user-recom{
		background: rgba(0,0,0,0.5);
		position: absolute;
		bottom: 0;
		color: whitesmoke;
		padding: 3px 10px 3px 55px;
		width: 100%;
	}
	.user-tou{
		position: absolute;
		bottom: 5px;
		left: 10px;
		width: 40px !important;
		height: 40px !important;
		border-radius: 30px;
		z-index: 9;
	}
</style>