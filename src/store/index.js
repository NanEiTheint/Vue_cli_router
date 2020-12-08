import Vue from 'vue'
import Vuex from 'vuex'
import Service from '@/service/Service.js'

Vue.use(Vuex)

const store=new Vuex.Store({
	state:{
		cart:[],
		token:'',
		currentUserInfo:{}
	},
	mutations:{
		setCart(state,payload){
			var item=state.cart.find(item=>item.id==payload.id);
			if(item)
			{
				item.qty+=Number(payload.qty);
			}
			else
			{
				state.cart.push(payload);
			}

		},
		storeCart(state){
			localStorage.setItem('shopVue',JSON.stringify(state.cart));

		},
		getLocalData(state){
			var shop=localStorage.getItem('shopVue');
			if(shop)
			{
				state.cart=JSON.parse(shop);
			}
			else
			{
				state.cart=[];
			}
		},
		decreaseCount(state,index)
		{
			state.cart[index].qty--;
		},
		increaseCount(state,index)
		{
			state.cart[index].qty++;
		},
		setTokenToState(state,token)
		{
			state.token=token;
		},
		setTokenToLocal(state)
		{
			localStorage.setItem('token',state.token);
		},
		storeTokenToState(state)
		{
			var token=localStorage.getItem('token');
			if(token)
			{
				state.token=token;
			}
			else
			{
				state.token='';
				//state.currentUserInfo={}
			}
		},
		clearToken()
		{
			localStorage.removeItem("token");
		},
		
		clearOrder()
		{
			localStorage.removeItem('shopVue');
		},
		getUser(state)
		{
			Service.getCurrentUser(state.token).then(response=>
            {
            	//console.log(state.token)
            	this.dispatch('setCurrentUser',response.data);
            
          	})
		},
		setUserInfo(state,userInfo)
		{
			//state.currentUserInfo={}
			state.currentUserInfo=userInfo;
			
		},
	},
	actions:{
		addToCart({commit},payload){
			commit('setCart',payload);
			commit('storeCart');
		},
		getDataFromLocal({commit}){
			commit('getLocalData');
		},
		decreaseQty({commit},index){
			commit('decreaseCount',index);
			commit('storeCart');
		},
		increaseQty({commit},index){
			commit('increaseCount',index);
			commit('storeCart');
		},
		storeToken({commit},token){
			commit('setTokenToState',token);
			commit('setTokenToLocal');
		},
		getTokenFromLocal({commit})
		{
			commit('storeTokenToState');
		},
		logout({commit})
		{
			commit('clearToken');
			//commit('storeTokenToState');
		},
		clearOrder({commit})
		{
			commit('clearOrder');
		},
		getUser({commit})
		{
			commit('getUser');
		},
		setCurrentUser({commit},userInfo)
		{
			commit('setUserInfo',userInfo);
		}

	}
})

export default store

