import { mkdir, writeFile } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

loadLocalEnv()

const apiKey = process.env.GEMINI_API_KEY
const model = process.env.GEMINI_IMAGE_MODEL ?? 'gemini-2.0-flash-preview-image-generation'

if (!apiKey) {
  console.error('Missing GEMINI_API_KEY environment variable.')
  console.error('PowerShell example: $env:GEMINI_API_KEY="YOUR_KEY"; npm run generate:realisations')
  process.exit(1)
}

const outputDir = path.join(process.cwd(), 'public', 'realisations')

const jobs = [
  {
    file: 'hero-avant.png',
    prompt:
      'Photorealistic photo of a modest Canadian suburban living room BEFORE painting. Wide-angle shot. Walls are dull beige with visible scuffs and marks near corners and baseboards. Trim is slightly yellowed. Normal everyday furniture — couch, coffee table, lamp. Soft overcast natural light from a window on the right. No people, no text, no logos, no luxury. Realistic Laval Quebec residential interior.',
  },
  {
    file: 'hero-apres.png',
    referenceFile: 'hero-avant.png',
    prompt:
      'This is the EXACT SAME room as in the reference photo. The only difference is that a professional painter has repainted the walls and trim. Keep EVERYTHING identical: same furniture, same layout, same camera angle, same window position, same lighting. ONLY change: walls are now freshly painted warm off-white, trim is crisp bright white, room looks cleaner and brighter. No people, no text, no logos.',
  },
  {
    file: 'chomedey-interieur-before-after.png',
    prompt:
      'Photorealistic original contractor portfolio image. A simple Canadian suburban living room shown as two side-by-side panels from the same camera angle. Left panel: older beige walls with light scuffs and normal furniture. Right panel: freshly painted warm off-white walls with clean trim and brighter natural daylight. No text, no logos, no people, no luxury mansion, realistic modest home in Laval Quebec.',
  },
  {
    file: 'vimont-interieur-before-after.png',
    prompt:
      'Photorealistic original image for a painting contractor portfolio. A modest Canadian kitchen and dining area in two side-by-side panels from the same angle. Left panel: dated taupe wall paint and slightly worn trim. Right panel: fresh light greige wall paint, crisp white trim, clean natural look. No text, no logo, no workers, no dramatic renovation, believable Laval Quebec residential home.',
  },
  {
    file: 'sainte-dorothee-exterieur-before-after.png',
    prompt:
      'Photorealistic original image for an exterior house painting contractor portfolio. A simple detached suburban house in Quebec shown in two side-by-side panels from the same camera angle. Left panel: faded neutral siding and worn painted trim. Right panel: refreshed neutral exterior paint, clean white trim, repainted front door, subtle curb appeal improvement. No text, no logos, no people, no mansion, realistic overcast daylight.',
  },
  {
    file: 'laval-chambre-before-after.png',
    prompt:
      'Photorealistic contractor portfolio image. A modest Canadian suburban bedroom shown in two side-by-side panels from the same camera angle. Left panel: outdated pale yellow wall paint, scuffed trim, slightly tired look. Right panel: fresh calm light grey-blue wall paint, crisp white trim, clean natural daylight. Simple furniture, no luxury, no people, no text, realistic Laval Quebec residential bedroom.',
  },
  {
    file: 'chomedey-salle-bain-before-after.png',
    prompt:
      'Photorealistic image for a painting contractor portfolio. A small Canadian bathroom shown in two side-by-side panels from the same camera angle. Left panel: older beige wall paint, some discoloration near the ceiling, worn look. Right panel: freshly painted bright white walls, clean grout lines visible, modern and fresh appearance. No text, no logos, no people, realistic modest home bathroom in Laval Quebec.',
  },
  {
    file: 'vimont-couloir-before-after.png',
    prompt:
      'Photorealistic contractor portfolio image. A hallway and staircase in a modest Canadian suburban home shown in two side-by-side panels from the same camera angle. Left panel: dated cream walls, worn trim and baseboards, scuffed paint near corners. Right panel: freshly painted clean white walls, bright white trim and baseboards, polished look. No text, no logos, no people, realistic Laval Quebec home.',
  },
  {
    file: 'laval-exterieur-garage-before-after.png',
    prompt:
      'Photorealistic image for an exterior painting contractor portfolio. A detached residential garage door and surrounding facade in Quebec shown in two side-by-side panels from the same camera angle. Left panel: faded and slightly peeling exterior paint on garage door and trim. Right panel: freshly painted garage door in a deep charcoal colour, clean white trim, improved curb appeal. No text, no logos, no people, realistic Canadian suburban property.',
  },
  {
    file: 'fabreville-interieur-before-after.png',
    prompt:
      'Photorealistic photo diptych for a painting contractor. Two side-by-side photos of the exact same modest Canadian living and dining room, shot from the identical camera angle. PHOTO 1 (left): dull greyish-white walls, scuffed baseboards, worn trim. PHOTO 2 (right): freshly painted warm linen-white walls, clean bright white trim and baseboards. Soft natural window light. Simple IKEA-style furniture. ABSOLUTELY NO text, letters, numbers, words, watermarks, labels, arrows, borders or graphic overlays anywhere in the image. Pure photographic diptych only.',
  },
  {
    file: 'sainte-dorothee-interieur-before-after.png',
    prompt:
      'Photorealistic contractor portfolio image. A modest Canadian suburban home office or study shown in two side-by-side panels from the same camera angle. Left panel: old off-white walls with scuffs, worn window trim. Right panel: freshly painted soft sage green walls, crisp white trim and ceiling, calm and professional finish. No text, no logos, no people, realistic Sainte-Dorothee Quebec residential interior.',
  },
]

await mkdir(outputDir, { recursive: true })

const skipExisting = process.argv.includes('--skip-existing')

for (const job of jobs) {
  const outputPath = path.join(outputDir, job.file)

  if (skipExisting && existsSync(outputPath)) {
    console.log(`Skipped (exists): ${job.file}`)
    continue
  }

  try {
    const referencePath = job.referenceFile ? path.join(outputDir, job.referenceFile) : null
    const image = await generateImage(job.prompt, referencePath)
    await writeFile(outputPath, image)
    console.log(`Generated: ${path.relative(process.cwd(), outputPath)}`)
  } catch (error) {
    console.error(`Failed to generate ${job.file}: ${error.message}`)
  }
}

async function generateImage(prompt, referencePath = null) {
  const parts = []

  if (referencePath && existsSync(referencePath)) {
    const imageData = readFileSync(referencePath).toString('base64')
    parts.push({ inlineData: { mimeType: 'image/png', data: imageData } })
  }

  parts.push({ text: prompt })

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts }],
      generationConfig: {
        responseModalities: ['IMAGE', 'TEXT'],
      },
    }),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`Gemini API request failed: ${response.status} ${message}`)
  }

  const data = await response.json()
  const responseParts = data.candidates?.flatMap((candidate) => candidate.content?.parts ?? []) ?? []
  const imagePart = responseParts.find((part) => part.inlineData?.data)

  if (!imagePart) {
    throw new Error(`No image returned by model ${model}. Response: ${JSON.stringify(data)}`)
  }

  return Buffer.from(imagePart.inlineData.data, 'base64')
}

function loadLocalEnv() {
  const envPath = path.join(process.cwd(), '.env.local')

  if (!existsSync(envPath)) return

  const lines = readFileSync(envPath, 'utf8').split(/\r?\n/)

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separatorIndex = trimmed.indexOf('=')
    if (separatorIndex === -1) continue

    const key = trimmed.slice(0, separatorIndex).trim()
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '')

    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}
