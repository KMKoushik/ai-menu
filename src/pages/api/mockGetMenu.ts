// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: string
}

const GPT_KEY = process.env.GPT_API_KEY


const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${GPT_KEY}`
}

const sampleResponse = "\n\n1. Aloo Gobi: A classic North Indian dish made with potatoes, cauliflower, and spices.\n\n2. Aloo Paratha: A popular breakfast dish made with grated potatoes, spices, and whole wheat flour.\n\n3. Aloo Tikki: A popular street food snack made with mashed potatoes, spices, and herbs.\n\n4. Aloo Matar: A delicious curry made with potatoes, peas, and spices.\n\n5. Aloo Jeera: A simple yet flavorful dish made with potatoes, cumin, and spices."

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    setTimeout(() => {
      res.status(200).json({ data: sampleResponse  })
    }, 1000)
  } catch(e) {
    res.status(200).json({ data: 'John Doe' })
  }

}
