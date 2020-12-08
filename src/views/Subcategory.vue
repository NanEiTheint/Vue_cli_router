<template>
	<div>
		<h1>Subcategory List</h1>
		<ul>
			<li v-for='(subcategory,index) in subcategories' :key="index">
				{{subcategory.name}}->{{subcategory.category.name}}
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import Service from '@/service/Service.js'
	export default{
		data(){
			return {
				subcategories:null
			}
		},
		created(){
			Service.getSubcategories().then(response=>{
				this.subcategories=response.data.subcategories
			})
		}
	}
</script>
<style type="text/css"></style>