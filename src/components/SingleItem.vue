<template>
	<div class="container">
		<div class="card">
			<img :src="item.photo" class="card-img-top" alt="Item Image">
			<div class="card-body">
				<h5 class="card-title">{{item.name}}</h5>
				<p class="card-text">{{item.detail}}</p>
				<!-- <a href="#" class="btn btn-primary">Detail</a> -->
				<router-link :to="{name: 'ItemDetail', params: { id: item.id}}" class="btn btn-info mr-2 px-1">Detail</router-link>
				<b-button variant="success" @click="addToCart" class="my-3"><b-icon-cart-plus-fill></b-icon-cart-plus-fill> Add to Cart</b-button>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:{
			item:Object
		},
		methods:{
			addToCart(){
				var shop={
					id:this.item.id,
					name:this.item.name,
					photo:this.item.photo,
					price:this.item.price,
					qty:1
				}
				this.$store.dispatch('addToCart',shop);

			}
		}
	}
	
</script>
<style type="text/css"></style>