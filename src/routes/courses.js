const express = require('express');
const router = express.Router();
const coursesController = require('../app/controllers/Coursescontroller');

router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.post('/handle-container-form', coursesController.handleContainerForm);
router.get('/:id/edit', coursesController.edit);
router.put('/:id/update', coursesController.update);
router.patch('/:id/restore', coursesController.patch);
router.delete('/:id/delete', coursesController.delete);
router.delete('/:id/destroy', coursesController.destroy);
router.get('/:slug', coursesController.show);

module.exports = router;
