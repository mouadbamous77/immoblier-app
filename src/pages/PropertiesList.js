import { Button, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';

const statusClass = {
  Libre: 'status-libre',
  Occupé: 'status-occupe',
  'En travaux': 'status-travaux',
  'A vendre': 'status-avendre',
};

const PropertiesList = () => {
  const { properties, deleteProperty } = useProperties();

  return (
    <div className="text-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="section-title mb-1">Propriétés</h2>
          <p className="subtitle mb-0">Liste des biens avec statut locatif et rendements.</p>
        </div>
        <Button as={Link} to="/proprietes/ajouter" variant="primary">
          + Nouveau bien
        </Button>
      </div>

      <Card className="card-3d">
        <Card.Body className="p-0">
          <Table responsive hover variant="dark" className="mb-0">
            <thead>
              <tr>
                <th>Adresse</th>
                <th>Type</th>
                <th>Surface</th>
                <th>Loyer</th>
                <th>Charges</th>
                <th>Statut</th>
                <th>Locataire</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id}>
                  <td>{p.adresse}</td>
                  <td>{p.type}</td>
                  <td>{p.surface} m²</td>
                  <td>{p.loyer.toLocaleString()} MAD</td>
                  <td>{p.charges.toLocaleString()} MAD</td>
                  <td>
                    <span className={`tag ${statusClass[p.statut] || ''}`}>{p.statut}</span>
                  </td>
                  <td>{p.locataire || '—'}</td>
                  <td className="text-end">
                    <div className="d-flex gap-2 justify-content-end flex-wrap">
                      <Button
                        as={Link}
                        to={`/proprietes/${p.id}`}
                        size="sm"
                        variant="outline-light"
                      >
                        Détails
                      </Button>
                      <Button
                        as={Link}
                        to={`/proprietes/modifier/${p.id}`}
                        size="sm"
                        variant="outline-warning"
                      >
                        Modifier
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => deleteProperty(p.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PropertiesList;

