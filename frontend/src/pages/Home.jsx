import Logo from "../assets/Group.png"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../pages/Home.css"

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

const Home = () => {
	return (
		<>
			<div className="home_div" >

				<Navbar expand="lg" className="bg-body-tertiary">
					<Container>
						<Navbar.Brand href="#home">Supply Link</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								<Link to="/new_process"> 	<Nav.Link href="#home"> Novo Processo </Nav.Link> </Link>
								<Link to="/view_product" > <Nav.Link href="#link"> Histórico do processo </Nav.Link> </Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
				<img className="logo" src={Logo} alt="" />
				<span className="home_span" >O software Supply Link pretende trazer mais transparência, confiança e segurança para os processos e sistemas de lógistica já implementados em empresas
					trazendo as características da rede blockchain  </span>

			</div>
		</>
	);
};

export default Home;