import React, { Component } from 'react'
import fire from '.././Config/Config'
import firebase from 'firebase/app'
import Header from '../UpAndDown.js/Header'
import AdminDashboard from '../Components/AdminDashboard'

export class UserSignIn extends Component {
    constructor(props){
        super(props);
        this.state={
          user: null,
          email: '',
          password: '',
          username:'',
          LastName:'',  
          PhoneNumber:'',
          valueToBePassed:'',
          text:'',
          newVT:'',
          myStory:'',
          allStories:[],
          people:[],
          peopleId:[],
          items:[],
          readFullStory:false,
          storyDescription:'',
          newDataObj:{
            story:'',
            name:'',
            storyDescription:'',
            show:false,
          },
          bool:null,
          displayFullStory:false,
          nulledState:false,
          errorMessage:'',
          VerificationCode:'',
          loading: true,
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.newFun = this.newFun.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
        // this.readFullStory = this.readFullStory.bind(this);
        this.toggleFullStory = this.toggleFullStory.bind(this);
        // this.onSignInSubmit = this.onSignInSubmit.bind(this);
      }
      handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    
        handleChangeEmail(e){
          this.setState({email:e.target.value})
        }
    
        handleChangePass(e){
          this.setState({password:e.target.value})
        }
    
    
        login(e) {
          e.preventDefault();
          fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
          }).catch((error) => {
              console.log(error);
              this.setState({errorMessage:error.message});
            });
        }
      
      
      
        signup(e){
          e.preventDefault();
          fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
          }).then((u)=>{})
          .catch((error) => {
              console.log(error);
              this.setState({errorMessage:error.message});
            })
        }
    
        
       
        
        componentDidMount(){
    
        //   if(!this.state.user){
        
        //     firebase.auth().signInWithPopup(provider).then(function(result) {
        //       // This gives you a Google Access Token. You can use it to access the Google API.
        //       var token = result.credential.accessToken;
        //       // The signed-in user info.
        //       var user = result.user;
        //       // ...
        //     }).catch(function(error) {
        //       // Handle Errors here.
        //       var errorCode = error.code;
        //       var errorMessage = error.message;
        //       // The email of the user's account used.
        //       var email = error.email;
        //       // The firebase.auth.AuthCredential type that was used.
        //       var credential = error.credential;
        //       // ...
        //     });
           
        //   }
     
          
      
          console.log(this.state.newDataObj)
          let self = this
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        return firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      }); 
          fire.auth().onAuthStateChanged((user) => {
         
            if (user) {
              this.setState({ user });
              var user = firebase.auth().currentUser;
              var name, email, photoUrl, uid, emailVerified,data;
              
              data = this.state.displayName
                name = user.displayName;
                email = user.email;
                photoUrl = user.photoURL;
                emailVerified = user.emailVerified;
                uid = user.uid;  
                this.setState({displayName:uid})
                this.setState({email:email})
    
                if(localStorage.getItem('Username') == "null"){
                  if(this.state.username != ""){
                  localStorage.setItem("Username",this.state.username)
                  }
                  if(this.state.username == ""){
                    var db = firebase.firestore();
                      var docRef = db.collection("users").doc(this.state.user.uid);
    
                      docRef.get().then(function(doc) {
                          if (doc.exists) {
                             localStorage.setItem("Username",doc.data())
                             
                          }
                      })
                  }
                }
                if(localStorage.getItem('Username') != "null"){
                  this.setState({
                    valueToBePassed: localStorage.getItem('Username')
                  })
                }
            console.log(uid)
          
          
    
    
    
            var db = firebase.firestore();
    if(user){
      if(this.state.username != ""){
            db.collection("users").doc(this.state.displayName).set({
            name: localStorage.getItem('Username'),
            }).then(function() {
              console.log("Data Ojbect for new User created");
            });}
    
    
    
    
    
    if(this.state.username == ""){
      var docRef = db.collection("cities").doc("SF");
    
    docRef.get().then(function(doc) {
        if (doc.exists) {
      db.collection("users").doc(this.state.displayName).set({
        name: doc.data().name,
        }).then(function() {
          console.log("Data Ojbect for new User created");
         
        })
      
        } 
    })
    
    }
          }
    
          var docRef = db.collection("stories").doc(this.state.user.uid);
    
          docRef.get().then(function(doc) {
              if (doc.exists) {
                
                var hello = doc.data().story;
                console.log(hello)
                self.setState({myStory:hello})
                  console.log("Document data:", doc.data().story);
              } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
              }
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
       
    
          db.collection("stories").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data().story);
                self.setState(prevState => ({
                  newDataObj: {                   // object that we want to update
                      ...prevState.newDataObj,    // keep all other key-value pairs
                      name: doc.id,
                      story:doc.data().story,
                      storyDescription:doc.data().storyDescription,
                      bool: doc.data().show ,
                      likes:100  ,
                      show:doc.data().show    // update the value of specific key
                  },
              }))
              self.setState({ allStories: [...self.state.allStories,self.state.newDataObj ] }) //simple value
              // self.setState({newDataObj:doc.id=doc.data()})
              console.log(self.state.allStories)
          
              
                self.setState({ peopleId: [...self.state.peopleId, doc.id ] }) //simple value
                self.setState({storyDescription : doc.data().storyDescription})
                    
            }); 
            console.log(self.state.bool)
            // console.log(self.state.allStories)
      // console.log(self.state.peopleId)
      console.log(self.state.storyDescription)
            
        });   
    var docRef = db.collection("users").doc(this.state.user.uid);
    
        docRef.get().then(function(doc) {
            if (doc.exists) {
              var hello = doc.data().name;
              self.setState({newVT:hello})
                console.log("Document data:", doc.data());
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
        
            } else {
              this.setState({ user: null });
              if(localStorage.getItem('Username') != null){
                localStorage.setItem("Username",null)
    
              }
              this.setState({valueToBePassed:''})
            }
          });
    
        }
    
        // componentDidMount() {
    
        //   fire.auth().onAuthStateChanged((user) => {
        //   if(user){
        //     if(localStorage.getItem('Username') == "null"){
        //       localStorage.setItem("Username",this.state.username)
        //     }
        //   }
        // })
        // }
        submit=(e)=>{
          let self = this
          e.preventDefault();
         console.log('hi')
         this.setState({text:""})
        
        
        
        }
        newFun(e){
          e.preventDefault();
  var user = firebase.auth().currentUser;
  
  user.sendEmailVerification().then(function() {
    // Email sent.
  }).catch(function(error) {
    // An error happened.
  });
  
         }
    
        toggleFullStory(name){
          this.setState({nulledState:true})
          var db = firebase.firestore();
          db.collection("stories").doc(name).update({
              show:true
            }).then(function() {
              console.log("Data Ojbect for new User created");
            });
            window.location.reload();
        }
    
    
        logout(){
          firebase.auth().signOut();
        }
        
        handleChange(e){
          this.setState({[e.target.name]: e.target.value});
      }
    render() {
        return (
            <div>
                {this.state.user?(<> 
                
                {/* User Dashboard */}
                


                {this.state.user.emailVerified?(<>  
                    <h2>Welcome to Admin Sign Up</h2>
                    <AdminDashboard/>


                 <button style={{paddingTop:'100p'}} class="btn btn-outline-primary m-3 mb-4" onClick={this.logout}>Logout</button></>):(<><div class="form-group" style={{paddingTop:'200px'}}>
                <a class=" btn btn-primary" onClick={this.newFun}>Verfiy Your Account</a>
              </div></>)}
                <></>

             
               </>):(<>   <section class="cover-user bg-white">
            <div class="container-fluid">
                <div class="row position-relative">
                    <div class="col-lg-4 cover-my-30 order-2">
                        <div class="cover-user-img d-flex align-items-center">
                            <div class="row">
                                <div class="col-12">
                                    <div class="login_page position-relative">
                                        <div class="text-center">
                                            <h4 class="mb-4" href="/SignUp">Signup</h4>  
                                        </div>
                                        <form>
            <div class="form-group">
                <input type="Name" id="username" value={this.state.username} onChange={this.handleChange} name="username" placeholder="Username" class="form-control"/>
              </div>
              <div class="form-group">
                <input type="Occupation" value={this.state.Occupation} onChange={this.handleChange} name="Occupation" placeholder="Occupation" class="form-control"/>
              </div>
              <div class="form-group">
                <input type="PhoneNumber" value={this.state.PhoneNumber}  onChange={this.handleChange} name="PhoneNumber" placeholder="PhoneNumber" class="form-control"/>
               
              </div>
              <div class="form-group">
                <input type="Phone Number" value={this.state.email} onChange={this.handleChangeEmail} name="signup-email" placeholder="Email Address" class="form-control"/>
              </div>
              <div class="form-group">
                <input type="password" value={this.state.password} onChange={this.handleChangePass} name="signup-password" placeholder="Password" class="form-control"/>
                <small class="text-muted">Must be at least 6 characters</small>
              </div>
              {/* <div class="form-group">
                <input type="password" value={this.state.confirmedPassword} name="signup-password-confirm" placeholder="Confirm password" class="form-control"/>
              </div> */}
              <div class="form-group">
                <button class="btn-block btn btn-primary" type="submit" onClick={this.signup}>Sign Up</button>
              </div>
              <div class="mx-auto">
                                                    <p class="mb-0 mt-3"><small class="text-dark mr-2">Already have an account ?</small> <a href="/UserLogin" class="text-dark font-weight-bold">Log in</a></p>
                                                </div>
              <h7 style={{color:'red',fontWeight:'bold',paddingLeft:'75px'}}>{this.state.errorMessage}</h7> 
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="signup-agree"/>
                {/* <label class="custom-control-label text-small text-muted" for="signup-agree">I agree to the <a href="#">Terms &amp;
        Conditions</a>
                </label> */}
              </div>
              <hr/>
            </form>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>    

                    {/* <div class="col-lg-8 offset-lg-4 padding-less img order-1" style="background-image:url('images/user/02.jpg')" data-jarallax="{&quot;speed&quot;: 0.5}"></div>    */}

                    <div class="col-lg-8 offset-lg-4 padding-less img order-1" style={{backgroundImage:"url('images/user/02.jpg')"}} data-jarallax='{"speed": 0.5}'></div>
                </div>
            </div>
        </section></>)}
         
            </div>
        )
    }
}

export default UserSignIn
