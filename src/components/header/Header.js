import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard, faFilm, faVideoSlash } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
 
return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand href="/" style={{"color":'gold'}}>
                <FontAwesomeIcon icon ={faFilm}/> MovGold
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                    <NavLink className ="nav-link" to="/">Home</NavLink>
                    <NavLink className ="nav-link" to="/watchList">Watch List</NavLink>
                    <NavLink className ="nav-link" to="/about">About Us</NavLink>      
                </Nav>
                <Button variant="outline-info" className="me-2" 
                as="a" 
                href="https://www.netflix.com" 
                target="_blank" 
                rel="noopener noreferrer">Watch Movies</Button>
                <Button variant="outline-info"
                as="a" 
                href="https://www.imdb.com" 
                target="_blank" 
                rel="noopener noreferrer">Other Movies IMDB ...</Button>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header