<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
      <b-navbar-brand>
        <router-link to="/main" class="nav-link text-light">SunPalace</router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/main" class="nav-link">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/cart" class="nav-link">
             <b-icon-cart-plus></b-icon-cart-plus>
              <span class="badge badge-danger badge-pill" v-if="cartNoti>0">{{cartNoti}}</span>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/about" class="nav-link">About</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="#" class="nav-link">Contact</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <!-- <div v-if="!loginUser"> -->
             <b-nav-item v-if="!loginUser && logout">
              <router-link to="/login" class="nav-link">Login</router-link>
            </b-nav-item>
            <b-nav-item  v-if="!loginUser">
              <router-link to="/about" class="nav-link">Register</router-link>
            </b-nav-item>
          <!-- </div> -->

          <b-nav-item-dropdown right v-else>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{userInfo.name}}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
   <!--  <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>|
      <router-link to="/item">Item</router-link>|
      <router-link to="/brand">Brand</router-link>|
      <router-link to="/category">Category</router-link>|
      <router-link to="/subcategory">Subategory</router-link>
    </div> -->
    <router-view/>
  </div>
</template>
<script type="text/javascript">

  export default{
    
    computed:{
      cartNoti(){
          this.$store.dispatch('getDataFromLocal');
         return this.$store.state.cart.reduce((a,b)=>( a+b.qty),0)
      },
      loginUser(){
        this.$store.dispatch('getTokenFromLocal');
        this.$store.dispatch('getUser');
        return this.$store.state.token?true:false;
      },
      userInfo(){
        return this.$store.state.currentUserInfo;
      }

    },
    methods:{
      logout()
      {
        this.$store.dispatch('logout');
        this.$store.dispatch('getTokenFromLocal');
        return this.$store.state.token?true:false;
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
