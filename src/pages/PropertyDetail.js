import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPropertyById } = useProperties();
  const property = getPropertyById(id);

  if (!property) {
    return (
      <div className="text-light">
        <p>Bien introuvable.</p>
        <Button variant="outline-light" onClick={() => navigate(-1)}>
          Retour
        </Button>
      </div>
    );
  }

  const rendement = ((property.loyer * 12) / property.prixAcquisition) * 100;
  const rentabiliteNette =
    ((property.loyer * 12 - property.charges * 12) / property.prixAcquisition) * 100;

  return (
    <div className="text-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="section-title mb-1">{property.adresse}</h2>
          <p className="subtitle mb-0">{property.type}</p>
        </div>
        <Button as={Link} to={`/proprietes/modifier/${property.id}`} variant="warning">
          Modifier
        </Button>
      </div>

      <Row className="g-3 mb-3">
        <Col md={4}>
          <Card className="card-3d p-3">
            <p className="muted mb-1">Statut</p>
            <div className="metric-number">{property.statut}</div>
            <p className="muted mb-0">Locataire : {property.locataire || 'Libre'}</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="card-3d p-3">
            <p className="muted mb-1">Rendement annuel</p>
            <div className="metric-number">{rendement.toFixed(2)}%</div>
            <p className="muted mb-0">((loyer x12) / prix)</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="card-3d p-3">
            <p className="muted mb-1">Rentabilité nette</p>
            <div className="metric-number">{rentabiliteNette.toFixed(2)}%</div>
            <p className="muted mb-0">Loyers - charges</p>
          </Card>
        </Col>
      </Row>

      <Card className="card-3d p-3">
        <Row className="gy-2">
          <Col md={6}>
            <p className="muted mb-1">Surface</p>
            <div className="fw-semibold">{property.surface} m²</div>
          </Col>
          <Col md={6}>
            <p className="muted mb-1">Prix d&apos;acquisition</p>
            <div className="fw-semibold">{property.prixAcquisition.toLocaleString()} MAD</div>
          </Col>
          <Col md={6}>
            <p className="muted mb-1">Loyer mensuel</p>
            <div className="fw-semibold">{property.loyer.toLocaleString()} MAD</div>
          </Col>
          <Col md={6}>
            <p className="muted mb-1">Charges mensuelles</p>
            <div className="fw-semibold">{property.charges.toLocaleString()} MAD</div>
          </Col>
          <Col md={6}>
            <p className="muted mb-1">Bail début</p>
            <div className="fw-semibold">{property.bailDebut || '—'}</div>
          </Col>
          <Col md={6}>
            <p className="muted mb-1">Bail fin</p>
            <div className="fw-semibold">{property.bailFin || '—'}</div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default PropertyDetail;

