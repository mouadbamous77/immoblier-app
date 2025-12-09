import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import PropertiesList from './pages/PropertiesList';
import PropertyDetail from './pages/PropertyDetail';
import PropertyForm from './pages/PropertyForm';
import './App.css';

function App() {
  return (
    <PropertyProvider>
      <div className="app-shell">
        <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm sticky-top glass-nav">
          <Container fluid>
            <Navbar.Brand as={Link} to="/" className="fw-bold">
              Immo Invest
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-nav" />
            <Navbar.Collapse id="main-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/dashboard">
                  Portefeuille
                </Nav.Link>
                <Nav.Link as={NavLink} to="/proprietes">
                  Propriétés
                </Nav.Link>
              </Nav>
              <div className="d-flex gap-2">
                <Button as={Link} to="/proprietes/ajouter" variant="outline-light">
                  + Ajouter un bien
                </Button>
                <Button as={Link} to="/dashboard" variant="primary">
                  Vue globale
                </Button>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container fluid className="py-4 px-3 px-md-4">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/proprietes" element={<PropertiesList />} />
            <Route path="/proprietes/ajouter" element={<PropertyForm />} />
            <Route path="/proprietes/modifier/:id" element={<PropertyForm />} />
            <Route path="/proprietes/:id" element={<PropertyDetail />} />
          </Routes>
        </Container>
      </div>
    </PropertyProvider>
  );
}

export default App;
