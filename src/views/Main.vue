<template>
	<div class="container py-5 my-5">
		<div class="row">
	      	<div class="col-lg-3">
	        	<h3 class="my-4 text-success">SunPalace Online Store</h3>
	        	<SingleCategory :categories="categories"></SingleCategory>
	      	</div>

	      	<div class="col-lg-9">
	      	
		      	<b-carousel
		      	id="carousel-1"
		      	v-model="slide"
		      	:interval="4000"
		      	controls
		      	indicators
		      	background="#ababab"
		      	img-width="1024"
		      	img-height="480"
		      	style="text-shadow: 1px 1px 2px #333;"
		      	@sliding-start="onSlideStart"
		      	@sliding-end="onSlideEnd"
		      	>
		      	<!-- Text slides with image -->
			      	<b-carousel-slide>
			      		<template #img>
			      			<img
			      			class="d-block img-fluid w-100"
			      			width="1024"
			      			height="480"
			      			src="@/assets/images/dis1.jpg"
			      			alt="image slot"
			      			>
			      		</template>
			      	</b-carousel-slide>
			      	<b-carousel-slide>
			      		<template #img>
			      			<img
			      			class="d-block img-fluid w-100"
			      			width="1024"
			      			height="480"
			      			src="@/assets/images/dis2.jpg"
			      			alt="image slot"
			      			>
			      		</template>
			      	</b-carousel-slide>
			      	<b-carousel-slide>
			      		<template #img>
			      			<img
			      			class="d-block img-fluid w-100"
			      			width="1024"
			      			height="480"
			      			src="@/assets/images/dis3.jpg"
			      			alt="image slot"
			      			>
			      		</template>
			      	</b-carousel-slide>
		      	</b-carousel>
	  		</div>
	    </div>
		<div class="row pt-4">
			<div class="col-12">
				<h5 class="my-3"><strong>ပရိုမိုးရှင်းနောက်ဆုံးနေ့ပစ္စည်းများ</strong></h5>
			</div>
		</div>
		<div class="row pb-5">
			<div class="col-md-3 px-2 py-3"  v-for="(item,index) in items" :key="index">
				<SingleItem :item="item"></SingleItem>
			</div>
		</div>
		<h5 class="my-3 py-3"><strong>ရရှိနိုင်သည့်အမှတ်တံဆိပ်များ</strong></h5>
		<div class="row">
			<div v-for="(brand,index) in brands" :key="index" class="col-md-2">
				<router-link :to="{name: 'Brand', params: { id: brand.id}}" class="nav-link">
					<img :src="brand.photo" class="img-fluid">
					<p class="text-center">{{brand.name}}</p>
				</router-link>
				
			</div>
		</div>
		<h5 class="my-3 py-3"><strong>အမျိုးအစားများ</strong></h5>
		<div class="row">
			<div v-for="(category,index) in categories" :key="index" class="col-md-2">
				<router-link :to="{name: 'Category', params: { id: category.id}}" class="nav-link">
					<img :src="category.photo" class="img-fluid">
					<p class="text-center">{{category.name}}</p>
				</router-link>
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
			SingleCategory,
		},
		data(){
			return{
				items:null,
				brands:null,
				categories:null,
			
			}
		},
		created(){
			Service.getItems().then(response=>{
				this.items=response.data.items;
			})
			Service.getBrands().then(response=>{
				this.brands=response.data.brands;
			})
			Service.getCategories().then(response=>{
				this.categories=response.data.categories;
			})
			

		},

	}
	
</script>
<style type="text/css">
	
</style>