import { Card, Col, Row } from 'react-bootstrap';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useProperties } from '../context/PropertyContext';

const palette = ['#38bdf8', '#22c55e', '#fbbf24', '#a855f7', '#f97316'];

const Dashboard = () => {
  const { stats } = useProperties();

  const typeData = Object.entries(stats.typeDistribution).map(([type, value]) => ({
    name: type,
    value,
  }));

  const statusData = [
    { name: 'Occupé', value: stats.occupied },
    { name: 'Libre', value: stats.free },
    { name: 'Autres', value: Math.max(stats.total - stats.occupied - stats.free, 0) },
  ];

  return (
    <div className="text-light">
      <h2 className="section-title mb-3">Portefeuille</h2>
      <p className="subtitle mb-4">
        Vue globale des revenus, rentabilités et répartition de vos biens.
      </p>

      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="card-3d h-100 p-3">
            <p className="muted mb-1">Revenu mensuel</p>
            <div className="metric-number">{stats.monthlyRevenue.toLocaleString()} MAD</div>
            <small className="muted">Occupés uniquement</small>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="card-3d h-100 p-3">
            <p className="muted mb-1">Revenu annuel</p>
            <div className="metric-number">{stats.annualRevenue.toLocaleString()} MAD</div>
            <small className="muted">Projection 12 mois</small>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="card-3d h-100 p-3">
            <p className="muted mb-1">Rendement moyen</p>
            <div className="metric-number">{stats.avgYield.toFixed(1)}%</div>
            <small className="muted">((loyer x12) / prix)</small>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="card-3d h-100 p-3">
            <p className="muted mb-1">Rentabilité nette</p>
            <div className="metric-number">{stats.netRentability.toFixed(1)}%</div>
            <small className="muted">Loyers - charges</small>
          </Card>
        </Col>
      </Row>

      <Row className="g-3">
        <Col lg={6}>
          <div className="chart-card h-100">
            <h5 className="mb-3">Répartition par type</h5>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Tooltip />
                <Pie data={typeData} dataKey="value" nameKey="name" outerRadius={90} label>
                  {typeData.map((entry, index) => (
                    <Cell key={entry.name} fill={palette[index % palette.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Col>
        <Col lg={6}>
          <div className="chart-card h-100">
            <h5 className="mb-3">Occupés vs Libres</h5>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="name" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {statusData.map((entry, index) => (
                    <Cell key={entry.name} fill={palette[index % palette.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

