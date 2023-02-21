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


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { cuisine, ingredients, instruction } = req.query

  try {
    const ingredientText = ingredients ? `with ingredients \"${ingredients}\"` : ''
    const cuisineText = cuisine ? `in ${cuisine} cuisine` : ''
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Suggest 5 dishes to cook ${ingredientText} ${cuisineText}. Don't display any links and each dish more than 50 words. ${instruction}`,
        temperature: 0.5,
        max_tokens: 550
      })
    })

    const data = await response.json()
    if (response.ok) {
      res.status(response.status).json({ data: data.choices[0].text })
    } else {
      res.status(response.status).json({ data })
    }
  } catch(e) {
    res.status(500).json({ data: 'Server error occurred' })
  }

}
