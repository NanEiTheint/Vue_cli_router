<template>
	<div class="container py-5 mt-3">
		<div class="row py-3">
			<div class="col-12">
				<h1 class="text-danger">This is Item Detail Page.</h1>
			</div>
		</div>
		<div class="card my-5 pt-5 px-1">
			<div class="row no-gutters">
				<div class="col-md-3">
					<img :src="item.photo" class="card-img-top" alt="Item Detail">
				</div>
				<div class="col-md-9">
					<div class="card-body">
						<h5 class="card-title text-left">{{item.name}}</h5>
						<div v-if="item.discount">
							<p class="card-text text-left" ><span class="mr-3">Discount Pirce:</span>{{item.discount}} MMK</p>
							<p class="card-text text-left"><span class="mr-3">Price:</span><s>{{item.price}} MMK</s></p>
						</div>
						<p class="card-text text-left" v-else><span class="mr-3">Price:</span>{{item.price}} MMK</p>
						<p class="card-text text-left"><span class="badge badge-info">{{item.subcategory.name}}</span><span  class="badge badge-dark ml-3">{{item.brand.name}}</span></p>
						<p class="card-text text-left"><input type="number" name="qty" value="1" class="w-50 form-control min-1 qty" v-model="qty"></p>

						<p class="card-text text-left" @click="addToCart"><a href="#" class="btn btn-success"><b-icon-cart-plus></b-icon-cart-plus>Add to Card</a></p>
					</div>
				</div>
			</div>
			<div class="card-footer">
				<strong>Description:{{item.detail}}</strong>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Service from '@/service/Service.js'
	export default{
		data(){
			return{
				item:null,
				qty:1,
			}
		},
		created(){
			let id=this.$route.params.id;
			Service.getItemDetail(id).then(response=>{
				this.item=response.data.item;
			})
		},
		methods:{
			addToCart(){
				var shop={
					id:this.item.id,
					name:this.item.name,
					photo:this.item.photo,
					price:this.item.price,
					qty:this.qty
				}
				this.$store.dispatch('addToCart',shop);

			}
		}
	}
	
</script>
<style type="text/css">
	
</style>