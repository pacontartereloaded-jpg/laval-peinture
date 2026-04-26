import { writeFile } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

loadLocalEnv()

const apiKey = process.env.GEMINI_API_KEY
const model = process.env.GEMINI_IMAGE_MODEL ?? 'gemini-2.0-flash-preview-image-generation'

if (!apiKey) {
  console.error('Missing GEMINI_API_KEY')
  process.exit(1)
}

const jobs = [
  {
    file: 'logo.png',
    prompt:
      'Professional minimalist logo for a residential painting company called "Peinture Laval". Square format, dark navy blue background (#0a0f24). A bold, elegant paint brush making a dynamic diagonal stroke from bottom-left to top-right, the stroke is a vivid gradient from deep blue (#1d4ed8) to bright cyan-blue (#60a5fa). The brush handle is clean metallic silver-white. Below the brush, the text "Peinture Laval" in crisp modern sans-serif white font, bold weight. The overall feel is premium, modern, trustworthy. No clutter, no extra elements, no shadows on background. Isolated on dark navy square. High resolution, vector-clean style.',
  },
  {
    file: 'logo-light.png',
    prompt:
      'Professional minimalist logo for a residential painting company called "Peinture Laval". Square format, pure white background. A bold, elegant paint brush making a dynamic diagonal stroke from bottom-left to top-right, the stroke is a vivid gradient from deep navy blue (#1d4ed8) to bright blue (#3b82f6). The brush handle is dark charcoal grey. Below the brush, the text "Peinture Laval" in crisp modern sans-serif dark navy font (#0d1b3e), bold weight. Premium, modern, trustworthy. No clutter, no extra elements. Isolated on white square. High resolution, vector-clean style.',
  },
]

for (const job of jobs) {
  const outputPath = path.join(process.cwd(), 'public', 'logos', job.file)
  try {
    const image = await generateImage(job.prompt)
    await writeFile(outputPath, image)
    console.log(`Generated: public/logos/${job.file}`)
  } catch (err) {
    console.error(`Failed ${job.file}: ${err.message}`)
  }
}

async function generateImage(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
    }),
  })

  if (!response.ok) {
    throw new Error(`Gemini API: ${response.status} ${await response.text()}`)
  }

  const data = await response.json()
  const parts = data.candidates?.flatMap((c) => c.content?.parts ?? []) ?? []
  const imagePart = parts.find((p) => p.inlineData?.data)

  if (!imagePart) throw new Error(`No image returned. Response: ${JSON.stringify(data)}`)

  return Buffer.from(imagePart.inlineData.data, 'base64')
}

function loadLocalEnv() {
  const envPath = path.join(process.cwd(), '.env.local')
  if (!existsSync(envPath)) return
  const lines = readFileSync(envPath, 'utf8').split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const sep = trimmed.indexOf('=')
    if (sep === -1) continue
    const key = trimmed.slice(0, sep).trim()
    const value = trimmed.slice(sep + 1).trim().replace(/^['"]|['"]$/g, '')
    if (!process.env[key]) process.env[key] = value
  }
}
