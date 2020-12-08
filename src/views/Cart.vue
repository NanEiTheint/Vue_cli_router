<template>
	<div class="container py-5">
		<section v-if="orderSuccess" class="text-center py-5 my-5">
			<h3 class="text-success">Your Order Successful!</h3>
		</section>
		<section v-else>
			<div class="row">
				<div class="offset-2 col-md-8">
					<h3 class="py-5 text-center text-info">Checkout List</h3>
					<table class="table table-bordered">
						<thead>
							<tr>
								<th scope="col" class="text-center">#</th>
								<th scope="col" class="text-center">Item</th>
								<th scope="col" class="text-center">Name</th>
								<th scope="col" class="text-center">Price</th>
								<th scope="col" class="text-center">Qty</th>
								<th scope="col" class="text-center">SubTotal</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in items" :key="index">
								<td class="text-center">{{index+1}}</td>
								<td class="text-center"><img :src="item.photo" class="img-fluid" width="80px"></td>
								<td class="text-center">{{item.name}}</td>
								<td class="text-right">{{item.price |formatNumber}}</td>
								<td class="text-center">
								 <a class="px-3 btn text-success" @click="decrease(index)">-</a>{{item.qty}}
								 <a class="px-3 btn text-info" @click="increase(index)">+</a></td>
								<td class="text-right">{{item.qty*item.price |formatNumber}}</td>
							</tr>
							<tr>
								<td colspan="5">Total Amount</td>
								<td class="text-right">{{total |formatNumber}}</td>
							</tr>
						</tbody>
					</table>
					<div class="form-group">
						<label>Note</label>
						<textarea class="form-control note" required="" placeholder="Please Note Here!" v-model="note"></textarea>
					</div>

					<router-link to="/main" class="btn btn-success float-left">Continue Shopping</router-link>
					<router-link  v-if="!loginUser" to="/login" class="btn btn-warning float-right">Login To Buy</router-link>
					<button v-else class="btn btn-warning float-right  mx-3" @click="buyNow">Buy Now</button>
				</div>
			</div>
		</section>
	</div>
</template>
<script type="text/javascript">
	import Service from '@/service/Service.js'
	export default{
		data(){
			return{
				note:"",
				orderSuccess:false,
				// userInfo:{}
				
				
			}
		},
		computed:{
			items()
			{
				//this.$store.dispatch('getDataFromLocal');
				return this.$store.state.cart
			},
			
			total()
			{
				return this.$store.state.cart.reduce((a,b)=>a + b.price*b.qty,0);
			},
			loginUser()
			{
				this.$store.dispatch('getTokenFromLocal');
				return this.$store.state.token?true:false;
			}
		},
		methods:{
			decrease(index)
			{
				this.$store.dispatch('decreaseQty',index);
				//this.items();
			},
			increase(index)
			{
				this.$store.dispatch('increaseQty',index);
				
			},
			buyNow()
			{
				var note=this.note;
				var ls=this.$store.state.cart;
				var total=this.total;

				console.log(this.$store.state.currentUserInfo);
				var user_id=this.$store.state.currentUserInfo.id;
				Service.order(note,ls,user_id,total).then(response=>
				{
					console.log(response);
					this.$store.dispatch('clearOrder');
					this.note="";
					this.$store.dispatch('getDataFromLocal');
					this.orderSuccess=true;
					//this.$router.push({name:'Main'});

				})

			}
		},
		filters:{
			formatNumber(num){
				 return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
			}
		},
	}
	
</script>
<style type="text/css"></style>