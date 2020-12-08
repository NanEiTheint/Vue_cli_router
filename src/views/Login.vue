<template>
  <div class="about container py-5 my-5">
    <h1>This is a login page</h1>
    <div class="row">
      <div class="col-md-12">
        <b-card no-body class="overflow-hidden justify-content-center">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="Login Form">
                <b-card-text>
                  <form @submit.prevent="login">
                    <div class="form-group">
                      <label>Email</label>
                      <input type="email" class="form-control" v-model="email">
                      <div  v-if="errorMessage">
                        <span class="text-danger " role="alert">
                          <strong class="font-italic text-sm">{{errorMessage}}</strong>
                        </span>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input type="password" class="form-control" v-model="password">
                    </div>
                    <div class="form-group">
                      <input type="submit" class="btn btn-success btn-block" value="login">
                    </div>
                  </form>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </div>
  </div>
  <!-- <div class="py-5 my-5"><p>Hello Login</p></div> -->
</template>
<script type="text/javascript">
  import Service from '@/service/Service.js'
  export default{
    data(){
      return{
        email:"",
        password:"",
        errorMessage:null,
      }
    },
    methods:{
      login(){
        var email=this.email;
        var password=this.password;
        Service.login(email,password).then(response=>
          {
            //console.log(response);
            this.$store.dispatch('storeToken',response.data.access_token);
            this.$store.dispatch('getUser');
            this.$router.push('/main');
            
          })
       .catch((err) => {
            console.log(err.response.status)
            if(err.response.status==401)
            {
              this.errorMessage="Wrong your email or password!"
              this.password=""
            }

        })

      }

    },
  }
</script>
<style type="text/css"></style>