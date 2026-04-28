export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let body = req.body || {}
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}')
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body' })
    }
  }

  const { name, phone, childAge } = body

  if (!name || !phone || !childAge) {
    return res.status(400).json({ error: 'name, phone and childAge are required' })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return res.status(500).json({ error: 'Telegram env vars are not configured' })
  }

  const text =
    '🚀 Новая заявка с сайта СТК Слава\n\n' +
    `👤 Имя родителя: ${name}\n` +
    `📞 Телефон: ${phone}\n` +
    `🏎 Возраст ребёнка: ${childAge}\n` +
    '🎁 Интерес: бесплатное первое занятие'

  try {
    const tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    })

    const tgData = await tgResponse.json()

    if (!tgResponse.ok || !tgData?.ok) {
      return res.status(502).json({
        error: tgData?.description || 'Telegram API error',
      })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    return res.status(500).json({
      error: error?.message || 'Failed to send lead',
    })
  }
}
