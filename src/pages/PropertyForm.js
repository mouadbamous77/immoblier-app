import { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import { propertyStatuses, propertyTypes } from '../data/mockProperties';

const defaultForm = {
  adresse: '',
  type: propertyTypes[0],
  surface: 0,
  loyer: 0,
  charges: 0,
  statut: propertyStatuses[0],
  locataire: '',
  bailDebut: '',
  bailFin: '',
  prixAcquisition: 0,
};

const PropertyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProperty, updateProperty, getPropertyById } = useProperties();
  const [form, setForm] = useState(defaultForm);

  const isEdit = useMemo(() => Boolean(id), [id]);

  useEffect(() => {
    if (id) {
      const existing = getPropertyById(id);
      if (existing) {
        setForm(existing);
      }
    }
  }, [getPropertyById, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ['surface', 'loyer', 'charges', 'prixAcquisition'].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateProperty(id, form);
      navigate(`/proprietes/${id}`);
    } else {
      const newId = addProperty(form);
      navigate(`/proprietes/${newId}`);
    }
  };

  return (
    <div className="text-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="section-title mb-1">{isEdit ? 'Modifier un bien' : 'Ajouter un bien'}</h2>
          <p className="subtitle mb-0">Baux, locataires, loyers et rentabilité.</p>
        </div>
        <Button variant="outline-light" onClick={() => navigate(-1)}>
          Retour
        </Button>
      </div>

      <Card className="card-3d p-3">
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  required
                  name="adresse"
                  value={form.adresse}
                  onChange={handleChange}
                  placeholder="Adresse complète"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select name="type" value={form.type} onChange={handleChange}>
                  {propertyTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Surface (m²)</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  name="surface"
                  value={form.surface}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Loyer mensuel (MAD)</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  name="loyer"
                  value={form.loyer}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Charges mensuelles (MAD)</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  name="charges"
                  value={form.charges}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Prix d&apos;acquisition (MAD)</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  name="prixAcquisition"
                  value={form.prixAcquisition}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Statut locatif</Form.Label>
                <Form.Select name="statut" value={form.statut} onChange={handleChange}>
                  {propertyStatuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Locataire</Form.Label>
                <Form.Control
                  name="locataire"
                  value={form.locataire}
                  onChange={handleChange}
                  placeholder="Nom du locataire"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Début du bail</Form.Label>
                <Form.Control type="date" name="bailDebut" value={form.bailDebut} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Fin du bail</Form.Label>
                <Form.Control type="date" name="bailFin" value={form.bailFin} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Annuler
            </Button>
            <Button type="submit" variant="primary">
              {isEdit ? 'Enregistrer' : 'Ajouter'}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default PropertyForm;

