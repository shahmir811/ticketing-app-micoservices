import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
	res.status(200).json({
		message: 'Hello there',
	});
});

export { router as signoutRouter };
