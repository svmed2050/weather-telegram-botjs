/* 
Telegram:
pavelweatherbot
*/

const { Telegraf } = require('telegraf')
require('dotenv').config()
const axios = require('axios')

const bot = new Telegraf(process.env.API_KEY_TELEGRAPH)
bot.start((ctx) =>
	ctx.reply(
		'Введите свою геолокацию, используя значок скрепки и в ответ получите текущую температуру в Цельсиях.'
	)
)
bot.on('message', async (ctx) => {
	if (ctx.message.location) {
		const { latitude: lat, longitude: lon } = ctx.message.location
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY_WEATHER}&units=metric`
		const response = await axios.get(url)
		ctx.reply(`${response.data.name}: ${response.data.main.temp} C`)
	}
})
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
