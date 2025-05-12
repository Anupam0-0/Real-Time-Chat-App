import express from 'express';
import { createFetchDMRoom, createGroupRoom, getAllUserRooms, renameGroup, updateGroupMembers } from '../controllers/room.controller';

const router = express.Router();


// @desc Get all DM + group rooms user is a part of
router.get('/', getAllUserRooms);
router.post('/dm', createFetchDMRoom);
router.post('/group', createGroupRoom);
router.put('/group/:id/rename', renameGroup);
router.put('/group/:id/update', updateGroupMembers);

export default router;
