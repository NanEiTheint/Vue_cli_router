import axios from 'axios'

//const accessToken=localStorage.getItem("token");
// var accessToken=null;
const apiClient=axios.create({
	baseURL:"http://localhost:8000/api",
	withCredentials:false,
	headers:{
		Accept:"application/json",
		'Content-type':"application/json",
		// Authorization: `Bearer ${accessToken}`
	}
})
export default{
	getItems(){
		return apiClient.get("/items");
	},
	getItemDetail(id){
		return apiClient.get("/items/"+id);
	},
	getBrands()
	{
		return apiClient.get("/brands");
	},
	getCategories(){
		return apiClient.get("/categories")
	},
	getSubcategories(){
		return apiClient.get("/subcategories")
	},
	login(email,password){
		return apiClient.post("/login",{email,password})
	},
	order(note,ls,user_id,total)
	{
		return apiClient.post("/orders",{note,ls,user_id,total})
	},
	getCurrentUser(token)
	{
		apiClient.defaults.headers.common['Authorization']= 'Bearer ' + token
		return apiClient.get("/currentUser")
	}

}