import React, { useContext } from "react";
import app from "../base";
import { AuthContext } from "../Auth.js";
import { Button, Navbar, Nav, NavDropdown, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Header() {
  

/*
  const { currentUser } = useContext(AuthContext);

  var status = 'aaa';
   submit = (event) => {
    event.preventDefault();
    if (currentUser) {
        status = 'Logout';
     app.auth().signOut();
    }
    else
    {
        status = 'dddd';
        return <Redirect to='/login'  />
    }}

  
  */

 /*

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };
*/
  function Signout() {
    app.auth().signOut();
    window.location.href = "/login";
    
  }
  
  
  const { currentUser } = useContext(AuthContext);
  
  
 var state=currentUser?app.auth().currentUser.displayName:"Default";
  if(state === "Admin")
 {
  return (
    <>
  <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#51efeb5c'}} variant="dark">
            <Navbar.Brand style= {{fontFamily:'Arial Black',fontSize:'Medium', backgroundColor:'orange',paddingRight:15, 
           paddingLeft: 15, borderTopRightRadius:10, borderTopLeftRadius:10, borderBottomLeftRadius:10, borderBottomRightRadius:10
          }} href="/">AIS</Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
             <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <NavDropdown title="Tickets" id="basic-nav-dropdown">
        <NavDropdown.Item href="/createticketagent">Create Ticket</NavDropdown.Item>
        <NavDropdown.Item href="/viewticket">View Ticket</NavDropdown.Item>
        </NavDropdown>
        
      <NavDropdown title="Client" id="basic-nav-dropdown">
        <NavDropdown.Item href="/insertclient">Add Client</NavDropdown.Item>
        <NavDropdown.Item href="/viewclient">View Client</NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title="Agent" id="basic-nav-dropdown">
        <NavDropdown.Item href="/insertagent">Add Agent</NavDropdown.Item>
        <NavDropdown.Item href="/viewagent">View Agent</NavDropdown.Item>
        </NavDropdown>

      <NavDropdown title="Maintenance" id="basic-nav-dropdown">
        <NavDropdown.Item href="/createinsurancetype">Insurance Type</NavDropdown.Item>
      </NavDropdown>
      </Nav>
      </Navbar.Collapse>
      <Form inline>
      <Nav.Link href="/#" style= {{color:"White"}}>{state}</Nav.Link>
      {currentUser?
          <Button variant="primary" onClick={Signout}>Log out</Button>:<Button variant="primary" href='\Login' >Login</Button>
          }
      </Form>

    
   
  </Navbar>

</>
    /*<header className="Header">
      <img src={require("../assets/logo.png")} className="Logo" alt="logo" />
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        
        <a href="/createinsurancetype">Add Insurance</a>          
          <a href="/insertemployee">Add Client</a>
          <a href="/viewemployee">View Client</a>
          <a href="/insertagent">Add Agent</a>
          <a href="/viewagent">View Agent</a>
          
          {currentUser?
          <button onClick={Signout}>Log out</button>:<a href='\Login' className="btn btn-primary">Login</a>
          }
 
        </nav>
      </CSSTransition>
      
    </header>*/
  );
      
        }
        else if(state === "Client"){

          return (
          <>
          <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#51efeb5c'}} variant="dark">
            <Navbar.Brand style= {{fontFamily:'Arial Black',fontSize:'Medium', backgroundColor:'orange',paddingRight:15, 
           paddingLeft: 15, borderTopRightRadius:10, borderTopLeftRadius:10, borderBottomLeftRadius:10, borderBottomRightRadius:10}} href="/">AIS</Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
             <Nav className="mr-auto">
             
              <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
              </Nav.Item>

              <Nav.Item>
              <Nav.Link eventKey="1" href="/createticket">Create Ticket</Nav.Link>
              </Nav.Item>

              <Nav.Item>
              <Nav.Link eventKey="2" href="/viewticket">View Ticket</Nav.Link>
              </Nav.Item>

              </Nav>
              </Navbar.Collapse>
              <Form inline>
          <Nav.Link href="/#" style= {{color:"White"}}>{state}</Nav.Link>


              {currentUser?
                  <Button variant="primary" onClick={Signout}>Log out</Button>:<Button variant="primary" href='\Login' >Login</Button>
                  }
              </Form>
        
            
           
          </Navbar>
        
         
        </>
        /*  return (
       
            <header className="Header">
              <img src={require("../assets/logo.png")} className="Logo" alt="logo" />
              <CSSTransition
                in={!isSmallScreen || isNavVisible}
                timeout={350}
                classNames="NavAnimation"
                unmountOnExit
              >
                
                <nav className="Nav">
                <a href="/createticket">Create Ticket</a>
          <a href="/viewticket">View Ticket</a>
                  
                  {currentUser?
                  <button onClick={Signout}>Log out</button>
                  :<a href='\Login'>Login</a>
                  }
                </nav>
              </CSSTransition>
              
            </header>*/
          );
        }
        else if(state === "Agent"){

          return (
            <>
            <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#51efeb5c'}} variant="dark">
                      <Navbar.Brand style= {{fontFamily:'Arial Black',fontSize:'Medium', backgroundColor:'orange',paddingRight:15, 
           paddingLeft: 15, borderTopRightRadius:10, borderTopLeftRadius:10, borderBottomLeftRadius:10, borderBottomRightRadius:10}} href="/">AIS</Navbar.Brand>
          
                      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                      <Navbar.Collapse id="responsive-navbar-nav">
                       <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Tickets" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/createticketagent">Create Ticket</NavDropdown.Item>
                  <NavDropdown.Item href="/viewticket">View Ticket</NavDropdown.Item>
               </NavDropdown>
                <Nav.Link href="/insertclient">Add Client</Nav.Link>
               
                </Nav>
                </Navbar.Collapse>
                <Form inline>
                <Nav.Link href="/#" style= {{color:"White"}}>{state}</Nav.Link>
                {currentUser?
                    <Button variant="primary" onClick={Signout}>Log out</Button>:<Button variant="primary" href='\Login' >Login</Button>
                    }
                </Form>
          
              
             
            </Navbar>
          
           
          </>
          );
        }
        else{
        
         return (
          <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#51efeb5c'}} variant="dark">
            <Navbar.Brand style= {{fontFamily:'Arial Black',fontSize:'Medium', backgroundColor:'orange',paddingRight:15, 
           paddingLeft: 15, borderTopRightRadius:10, borderTopLeftRadius:10, borderBottomLeftRadius:10, borderBottomRightRadius:10}} href="/">AIS</Navbar.Brand>

            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                      <Navbar.Collapse id="responsive-navbar-nav">
                       <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
          
    </Nav>
   
    </Navbar.Collapse>
  </Navbar>
       
          /*  <header className="Header">
              <img src={require("../assets/logo.png")} className="Logo" alt="logo" />
              <CSSTransition
                in={!isSmallScreen || isNavVisible}
                timeout={350}
                classNames="NavAnimation"
                unmountOnExit
              >
                
                <nav className="Nav">                  
                  
                {currentUser?
                  <button onClick={Signout}>Log out</button>:<a href='\Login' >Login</a>
                  }
                </nav>
              </CSSTransition>
              
            </header>*/
          );
        }


    
        
      
    
  }