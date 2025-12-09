import { Button, Col, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="text-light">
      <Row className="align-items-center g-4 mb-4">
        <Col md={6}>
          <div className="hero-card p-4 p-md-5">
            <div className="d-inline-flex align-items-center gap-2 pill-soft mb-3">
              <span className="glow-pill px-3 py-1 rounded-pill">3D smooth UI</span>
              <span>Gestion centralisée du portefeuille</span>
            </div>
            <h1 className="fw-bold mb-3 display-5 gradient-text">Immo Invest</h1>
            <p className="subtitle mb-4">
              Suivez vos loyers, la rentabilité et l&apos;occupation de vos biens à Casablanca et
              Rabat, avec une interface moderne animée.
            </p>
            <Stack direction="horizontal" gap={3} className="flex-wrap">
              <Button as={Link} to="/dashboard" size="lg" variant="primary">
                Voir le portefeuille
              </Button>
              <Button as={Link} to="/proprietes/ajouter" size="lg" variant="outline-light">
                Ajouter un bien
              </Button>
            </Stack>
            <div className="d-flex gap-3 flex-wrap mt-4">
              <div className="pill-soft">Rentabilité en temps réel</div>
              <div className="pill-soft">Suivi libre/occupé</div>
              <div className="pill-soft">Baux & locataires</div>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="cta-grid">
            {[
              { title: 'Rentabilité', desc: 'Calcul auto du rendement annuel' },
              { title: 'Vue globale', desc: 'Revenus mensuels et annuels' },
              { title: 'Occupations', desc: 'Libre vs Occupé en un coup d’œil' },
              { title: 'Types de biens', desc: 'Répartition Appartement, Villa…' },
            ].map((item) => (
              <div key={item.title} className="card-3d p-3">
                <h5 className="mb-1">{item.title}</h5>
                <p className="mb-0 muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;

