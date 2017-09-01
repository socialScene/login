import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import {Jumbotron,Form,Button,FormGroup,Input, Label, Navbar,NavbarBrand,NavbarToggler,Nav
} from 'reactstrap'

const AuthExample = () => (
  <Router>
    <div className="container">
      <AuthButton/>
      <Navbar color="faded" light toggleable>
         <NavbarToggler/>
          <NavbarBrand href="/">SocialScene</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <ul>
              <li><Link to="/public">Public Page</Link></li>
             <li> <Link to="/register">Register</Link></li>
             <li><Link to="/protected">Login</Link></li>
             </ul>
           </Nav>
       </Navbar>
       <hr/>

        <Route path="/public" component={Public}/> 
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      
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
class  Register extends React.Component{

   state = {
    redirectToReferrer: false
  }

  Register = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
  <div>
    <Jumbotron>
     
        <h2>Please Register on the Form below</h2>
      <Form>
        <FormGroup>
        <Label>Name:</Label>
        <Input type="text" name="name" id="name" placeholder="Enter your name" />
        </FormGroup>

        <FormGroup>
          <Label>Username:</Label>
          <Input type="text" name="username" id="username" placeholder="Enter your username" />
       </FormGroup>

        <FormGroup>
         <Label>Email Address:</Label>
          <Input type="email" name="email" id="email" placeholder="Enter your email address" />
       </FormGroup>

        <FormGroup>
          <Label>Password:</Label>
          <Input type="password" name="password" id="password" placeholder="Enter your password" />
        </FormGroup>
           <FormGroup>
              <Button color="info" onClick={this.register}>Register</Button>
        </FormGroup>
      </Form>
    </Jumbotron>
    
  </div>
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
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return  (
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
        <span> < a href="">Forget Password?</a></span>
      </div>
       </Jumbotron >
    )
  }
}

 
   
export default AuthExample


