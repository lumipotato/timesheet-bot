const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const {fetching} = require('../helper/fetchAPi');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply(`
Welcome...
kuliCode Bot!`
));

bot.command('quit', async (ctx) => {
  // Using context shortcut
  await ctx.leaveChat();
});

bot.on(message('text'), async (ctx) => {
  // Using context shortcut
	const input = ctx.message.text
	let [pia, email, password, taskType] = input.split(' ')
	taskType = parseInt(taskType)

	if (pia === 'pia') {
		const URL = process.env.BASE_URL
		const PATH = process.env.URL_PATH.split(',')
		const dates = new Date().toJSON().split('T')[0]

		const payloadLogin = {
			email: email,
			password: password
		}

		const loginUrl = `https://${PATH[0]}.${URL}/${PATH[2]}${PATH[3]}`
		const login = await fetching(loginUrl, 'POST', payloadLogin, '')
		const TOKEN = login.token

		const getUrl = `https://${PATH[0]}.${URL}/${PATH[2]}${PATH[4]}`
		const getTask = await fetching(getUrl, 'GET', '', TOKEN)
		const selectedTask = getTask.results[taskType - 1]

		const payloadTask = {
			source: "pia",
			task_id: selectedTask.TASK_ID,
			assignm_id: selectedTask.ASSIGNM_ID,
			hours: 8,
			ts_date: dates,
			n_hours: 8,
			progress: 95,
			activity_type_id: 2,
			activity_desc: "Enhancement Core Meterai PERURI",
			trip_location_group_id: 2,
			working_progress: 95
		}

		const sendUrl = `https://${PATH[0]}.${URL}/${PATH[2]}${PATH[4]}`
		const sendTask = await fetching(sendUrl, 'POST', payloadTask, TOKEN )

		await ctx.reply(`
		kulibot says:
		PIA ${sendTask.message}
		at ${selectedTask.PROJECT_NAME}
		`);
	}
});

bot.on('callback_query', async (ctx) => {
  // Using context shortcut
  await ctx.answerCbQuery();
});

bot.on('inline_query', async (ctx) => {
  const result = [];
  // Using context shortcut
  await ctx.answerInlineQuery(result);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));