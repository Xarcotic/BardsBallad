import { db } from '../../index'

export default async (local_id: string) => {
  try {
    return await db.systems.update(local_id, {
      isDeleted: true,
      updatedAt: new Date().toISOString(),
    })
  } catch (e) {
    console.log('Error deleting system:', e);
  }
}