import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../lib/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Get the data from the form submission
    const data = req.body

    // Connect to the database
    const client = await clientPromise
    const db = client.db()

    // Insert the user into the database
    await db.collection('users').insertOne(data)

    // Send a success response
    res.status(200).json({ message: 'User registered successfully' })
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
