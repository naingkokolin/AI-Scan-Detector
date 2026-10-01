import { Router } from 'express';
import {
	phishingDetections,
	snortAlerts,
	correlatedIncidents,
} from '../services/mockData';

const router = Router();

// Health
router.get('/health', (_req, res) => {
	res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Phishing detections
router.get('/phishing', (_req, res) => {
	res.json(phishingDetections);
});

// Snort alerts
router.get('/snort-alerts', (_req, res) => {
	res.json(snortAlerts);
});

// Correlated incidents
router.get('/incidents', (_req, res) => {
	res.json(correlatedIncidents);
});

// Stats for dashboard
router.get('/stats', (_req, res) => {
	const totalPhishing = phishingDetections.filter(
		(p) => p.verdict === 'phishing',
	).length;
	const totalAlerts = snortAlerts.length;
	const totalIncidents = correlatedIncidents.length;
	const criticalIncidents = correlatedIncidents.filter(
		(i) => i.severity === 'critical',
	).length;

	res.json({
		totalPhishing,
		totalAlerts,
		totalIncidents,
		criticalIncidents,
	});
});

export default router;
