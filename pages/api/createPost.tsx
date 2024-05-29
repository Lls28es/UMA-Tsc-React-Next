import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../services/firebase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;

    await db.collection('CommentsUMA').doc(id).set(req.body);

    return res.status(200).json({
      message: 'comentario guardado',
    });
  } catch (error: any) {
    return res.status(500).json({
      message: 'el comentario no se ha podido guardar',
      error: error.message,
    });
  }
};