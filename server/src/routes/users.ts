import { Router } from 'express';
import { prisma } from '../config/database';
import { requireAuth, AuthRequest } from '../middleware/auth';
import clerk from '../config/clerk';
import express from 'express';

const router: express.Router = Router();


// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Get current user profile
router.get('/me/profile', requireAuth, async (req: AuthRequest, res) => {
  try {
    if (!req.auth?.userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: req.auth.userId },
      include: {
        posts: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Create user (usually called via webhook)
router.post('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { email, name, imageUrl } = req.body;

    if (!email || !req.auth?.userId) {
      return res.status(400).json({ error: 'Email and user ID are required' });
    }

    const user = await prisma.user.create({
      data: {
        clerkId: req.auth.userId,
        email,
        name,
        imageUrl,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'User already exists' });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update user profile
router.put('/me/profile', requireAuth, async (req: AuthRequest, res) => {
  try {
    if (!req.auth?.userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { name } = req.body;

    const user = await prisma.user.update({
      where: { clerkId: req.auth.userId },
      data: {
        name,
      },
    });

    res.json(user);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user (protected route)
router.delete('/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Check if user is trying to delete their own account
    const userToDelete = await prisma.user.findUnique({ where: { id } });
    if (!userToDelete) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (userToDelete.clerkId !== req.auth?.userId) {
      return res.status(403).json({ error: 'Cannot delete other users' });
    }

    await prisma.user.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
