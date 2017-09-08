import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import {Jumbotron,Form,Button,FormGroup,Input, Label, Navbar,NavbarBrand,NavbarToggler,Nav,Col
} from 'reactstrap'


const AuthExample = () => (
  <Router>
     <div className="container">
      <AuthButton/>
      <Navbar color="faded" light toggleable>
         <NavbarToggler/>
          <NavbarBrand href="/">SocialScene</NavbarBrand>
            <Nav className="ml-auto" navbar>
              
             <Button outline color="info"> <Link to="/public">Public Page</Link></Button>
              <Button outline color="info"> <Link to="/Register">Register</Link></Button>
               <Button outline color="info"><Link to="/login">Login</Link></Button>
             
           </Nav>
       </Navbar>
     
      <Route path="/public" component={Public}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/forgetpassword" component={ForgetPassword}/>
      <PrivateRoute path="/protected" component={Protected}/>
     
    </div>
  </Router>
)

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>     

class  ForgetPassword extends React.Component{

   state = {
    redirectToReferrer: false
  }

  ForgetPassword = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/ForgetPassword' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
       <Jumbotron>
        <div className="container">
        <div className="card-header">
          Reset Password
        </div>
          
  <div className="card-body">
    <div className="text-center mt-4 mb-5">
       <h4>Forgot your password?</h4>
            <p>Enter your email address and we will send you instructions on how to reset your password.</p>
    </div>
      <Form>
        <FormGroup>
          <Input type="email" name="email" id="email" placeholder="Enter your email address" aria-describedby="emailHelp" />
       </FormGroup>
              <Button  color="info"> <Link to="login">Reset Password</Link></Button>
      </Form>
      <div className="text-center">
            <Link to="/Register">Register an Account</Link>
            <Link to="login">Login Page</Link>
      </div>
    </div>
  </div>
      </Jumbotron>
    )
  }}

  class  Register extends React.Component{

   state = {
    redirectToReferrer: false
  }

 Register= () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/Register' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
  <Jumbotron>
<div className="container">

      <div className="">
        <h2>Please Register on the Form below</h2>
    </div>
    <div className="card-body">
      <Form>
        <FormGroup>
          <div className="">
           <div className="">
            <Label>Name:</Label>
            <Input type="text" name="name" id="name" placeholder="Enter your name" />
            <Label>Username:</Label>
            <Input type="text" name="username" id="username" placeholder="Enter your username" />
          </div>        
         </div>
       </FormGroup>
       <div>
         <FormGroup>
            <Label>Email Address:</Label>
            <Input type="email" name="email" id="email" placeholder="Enter your email address" />
        </FormGroup>
       </div>
       <div>
        <FormGroup>
          <div className="form-row">
            <div className="">
              <Label>Password:</Label>
               <Input type="password" name="password" id="password" placeholder="Enter your password" />
            </div>
          <div className="">
              <Label>Confirm Password:</Label>
             <Input type="confirmPassword" name="confrimPassword" id="confirmPassword" placeholder="Confirm your password" />
         </div>
       </div>
       </FormGroup>
       
       </div>
     </Form>
      <Button color="info" onClick={this.login}>Register</Button>
        <Link to ="/login">Login Page</Link>
     </div>
           <Link to ="/forgetPassword">Forget Password?</Link>
     </div>
    
 </Jumbotron>
        
   
    )
  }}

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/login' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
      <Jumbotron >
          <div  className="container " >
            <h3>User Login</h3>
            <Form>
              <FormGroup>
              <Input type="email" id="email" name="email" placeholder="Email" required></Input>
              <Input type="password" id="password" name ="pasword" placeholder="Password" required></Input>
            </FormGroup>
        </Form>
        <Button color="info" onClick={this.login}>Log in</Button>
        <div className="text-center">
        <Link to ="/forgetPassword">Forget Password?</Link>
        <Link to ="/register">Register an Account</Link>
        </div>
      </div>
       </Jumbotron >
    )
  }
}

export default AuthExample