import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../services/firebase';

interface FirestoreCommentData {
  comment: string;
  dateModified: Date;
}

interface Comment extends FirestoreCommentData {
  id: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;
    const docRef = await db.collection('CommentsUMA').doc(id).get();
    const data = docRef.data() as FirestoreCommentData | undefined;

    const resp: Comment = data
      ? { ...data, id }
      : { id, comment: '', dateModified: new Date() };

    res.status(200).json(resp);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'connection error',
      error: error.message,
    });
  }
};