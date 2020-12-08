<template>
	<div class="accordion" id="accordionExample">
		<div class="card" v-for="(category,index) in categories" :key="index">
			<div class="card-header" id="headingOne">
				<h2 class="mb-0">
					<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" :data-target="'#collapse'+i" aria-expanded="true" aria-controls="collapseOne">
						{{category.name}}
					</button>
				</h2>
			</div>
			<!-- <div v-for="subcategory in category.subcategories" :key="subcategory.id" :id="'collapse'+index">{{subcategory.name}}{{index}}</div> -->
			<div v-for="subcategory in category.subcategories" :key="subcategory.id" :id="'collapse'+i" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
				<div class="card-body">
					<!-- <a href="{{route('filtercategorypage',$subcategory->id)}}">{{$subcategory->name}}</a> -->
					<a href="#">{{subcategory.name}}</a>

				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:{
			categories:null
		},
		data(){
			return {
				i:0
			}
		}
	}
</script>
<style type="text/css">
	
</style>