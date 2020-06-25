const telegramBot = require('node-telegram-bot-api');
const debug = require('./helpers');
const writeJson = require('./jsonwriter');
const Token = '1253383008:AAEUb4MA_3W-g7cus2vzw002slIeLElAPgk';

const aboutText = `<strong>Информация о сайте GrapeProg</strong>
    <pre>GrapeProg , предназначен для сообщества программистов и смежных специалистов.
Этот сайт является площадкой для общения, предложений работодателей, обмена информацией, проведения конференций, представления обучающих платформ, стартапов.
Считаю, что при развитии этой идеи можно добиться следующих результатов:
сформировать общественное объединение молодых специалистов в области IT
▪осуществлять повышение уровня знаний программистов различными способами (добиться синергетического эффекта)
▪привлечь высшие учебные заведения и учебные центры для поддержки и полезного обмена информацией
▪создать среду комфортного неформального общения
▪привлечь работодателей для начинающих специалистов.</pre>`
const siteText = 'Советую посмотреть🤖 \r\n' + 'https://grape-proger.000webhostapp.com/';
const reposRef = '🍇Репозиторий проекта \r\n' + 'https://github.com/angular654/Grape-prog';
const gameRef = 'Игра про COVID-19:https://vladimirprog.itch.io/covid-19-simulatorcorona-strike/download/eyJleHBpcmVzIjoxNTkyODUwMzQxLCJpZCI6NjcxNzg1fQ%3d%3d.S7%2b0DrS1yu0z8ZDNG1ypSul4gM0%3d'
const helpText = `<strong>Информация о командах бота</strong>
<pre>
hello - приветствие 
/about - о сайте проекта
/site - ссылка на сайт проекта
/repos - ссылка на репоситорий github
/game - игра 
node_debug - for develop))
write_json - сохраняет имя последнего пользователя
image - случайное изображение 
help - справка по командам
open_keyboard - открытие клавиатуры
</pre>`
console.log("Bot works!");
const bot = new telegramBot(Token, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
})

var notes = [];

bot.on('message', (msg) => {
    const { id } = msg.chat;
    if (msg.text === '/about') {
        bot.sendMessage(id, aboutText, { parse_mode: 'HTML' })
    } else if (msg.text.toLowerCase() === 'hello') {
        bot.sendMessage(id, `Hello ${msg.from.first_name}`)
    } else if (msg.text === '/site') {
        bot.sendMessage(id, siteText)
    } else if (msg.text === '/repos') {
        bot.sendMessage(id, reposRef)
    } else if (msg.text === '/game') {
        bot.sendMessage(id, gameRef)
    }
    else if (msg.text === 'node_debug') {
        bot.sendMessage(id, debug(msg))
    }
    else if (msg.text === 'write_json') {
        bot.sendMessage(id, `${msg.from.first_name} ваше имя сохранено!`)
        writeJson(msg);
    }
    else if (msg.text === 'image') {
        randomPic = Math.floor(Math.random() * Math.floor(9));
        bot.sendPhoto(id, 'images/web' + randomPic.toString() + '.jpg', {
            caption: 'Web🍇'
        })
    }
    else if (msg.text === 'Автор бота') {
        var authorlink = 'https://github.com/angular654';
        var botRepos = 'https://github.com/angular654/TelegramBot';
        bot.sendMessage(id, `Created by ${authorlink} \r\n` + `Bot repository :${botRepos}`);
    }
    else if (msg.text === 'help') {
        bot.sendMessage(id, helpText, { parse_mode: 'HTML' })
    }
    else if (msg.text === 'open_keyboard' || '/start') {
        bot.sendMessage(id, 'Клавиатура открыта', {
            reply_markup: {
                keyboard: [
                    [
                        {
                            text: 'Автор бота'

                        }, 
                        {
                            text: 'help'
                        },
                        {
                            text: 'image'
                        }
                    ],
                ],
                one_time_keyboard: false
            }
        })
    }
})
