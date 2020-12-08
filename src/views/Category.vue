<template>
	<div class="container py-5 mt-5">
		<div class="row">
			<div class="col-lg-3">
				<h3 class="my-4 text-success">SunPalace Online Store</h3>
				<SingleCategory :categories="categories"></SingleCategory>
			</div>
			<div class="col-lg-9">
				<div class="row">
					<div class="col-12 py-4">
						<h3 class="text-center">{{brandName}}</h3>
					</div>
					<div class="col-md-4 px-2" v-for="(item,index) in items" :key="index">
						<SingleItem :item="item"></SingleItem>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>
<script type="text/javascript">
	import Service from '@/service/Service.js'
	import SingleItem from '@/components/SingleItem'
	import SingleCategory from '@/components/SingleCategory'
	export default{
		components:{
			SingleItem,
			SingleCategory
		},
		data(){
			return{
				items:[],
				categories:null,
				notResult:"Sorry! This Brand is not avaliable!",
				brandName:null
			}
		},
		created(){
			var id=this.$route.params.id;
			//alert(id)
			Service.getItems().then(response=>{
				var allItems=response.data.items;
				for(var item of allItems)
				{
					//console.log(item.brand.id,id)
					if(item.subcategory.category.id==id)
					{
						//alert("OK")
						this.items.push(item);
						this.brandName=item.subcategory.category.name+" ပစ္စည်းများ";
					}
				}
			})
			Service.getCategories().then(response=>{
				this.categories=response.data.categories;
			})
		}
	}
</script>
<style type="text/css"></style>