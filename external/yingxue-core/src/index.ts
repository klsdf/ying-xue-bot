import { Context, Schema, h } from 'koishi'
import { pathToFileURL } from 'url'
import path from 'path'

import { } from 'koishi-plugin-puppeteer'   //用于图形化
import { createHtml } from './html-creator'



interface GameData {
  id: number
  name: string
  // 其他字段...
}
declare module 'koishi' {
  interface Tables {
    gamedata: GameData
  }
}



export const name = 'yingxue-core'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

export const inject = ['puppeteer']
export const usage = "用于游戏学知识的机器人"




export function apply(ctx: Context) {
  // 使用插件
  // applyCron(ctx)


  // write your plugin here
  ctx.command('你好')
    .action(async ({ session }) => {
      return '你好主人，最爱你了！'
    })



  ctx.on('message', (session) => {
    if (session.content.includes('男娘')) {
      session.send('检测到男娘！警告！')
    }
  })

  ctx.command('qq号记录').action(async (Argv) => {
    return `qq号:${Argv.session.userId}已经记录`
  })
  ctx.command('对话次数检测').action(async (Argv) => {
    return `对话次数:${getCallTime(Argv.session.userId)}`
  })

  // ctx.command('多参数测试 <name> <age> <gender>').action(async (Argv, name, age, gender) => {
  //   return `姓名:${name} 年龄:${age} 性别:${gender}`
  // })

  ctx.command('回复测试').action(async ({ session }) => {
    session.send(`用户id: ${session.userId} `)
    session.send(`消息id: ${session.messageId} `)
    // Argv.session.send('欢迎 ' + h('at', { id: Argv.session.userId }) + ' 入群！')
    // Argv.session.send('我正在 ' + h('quote', {id: Argv.session.messageId }) + ' 回复你')
    return ""
  })
  const testChannelId = "541042950825E06BFC0DC7698D84A86D"
  const myId = "90455E4B9AC248C2DE4BE5388C58495B"

  const 雌小鬼Id = "24CC4328F64BB168175B99C247D3283C"

  ctx.on("message", (session) => {
    if (session.content.includes("亲亲")) {

      if (session.userId === myId) {
        session.send("检测到主人说话！亲亲！")
      } else if (session.userId === 雌小鬼Id) {
        session.send("不许亲亲！只有主人可以亲亲！打你！")
      } else {
        session.send("不许亲亲！只有主人可以亲亲！")
      }
    }
  })



  ctx.command('广播测试').action(async ({ session }) => {
    let channelId = session.channelId;
    console.log("channelId", channelId);
    try {
      await session.bot.broadcast([testChannelId], `收到来自${session.userId}的广播测试`);
      return "广播测试成功"
    } catch (error) {
      console.log("广播测试失败", error);
      return "广播测试失败，因为\n" + error
    }

  })


  ctx.command('来点小知识 <name>').action(async (Argv, name) => {

    if (name === "") {
      return `本指令需要在指令后方传入参数哦~比如:来点小知识 c#`
    }

    if (name === "c#") {
      return `c#是一种编程语言，它是一种静态类型、编译型的编程语言。`
    }
    if (name === "javascript") {
      return `javascript是一种编程语言，它是一种动态类型、解释型的编程语言。`
    }
    if (name === "c") {
      return `c是一种编程语言，它是一种静态类型、编译型的编程语言。`
    }
    if (name === "python") {
      return `python是一种编程语言，它是一种动态类型、解释型的编程语言。`
    }
    if (name === "java") {
      return `java是一种编程语言，它是一种静态类型、编译型的编程语言。`
    }

  })

  ctx.command("字符串测试")
    .action(async (Argv) => {
      await Argv.session.send("请输入字符串")
      let str1 = await Argv.session.prompt(10000);
      console.log(str1)
      return `字符串:${str1}`
      // await Argv.session.send("请输入第二个字符串")
      // let str2 = await Argv.session.prompt(10000);
      // return `字符串2:${str2}`
    })
  ctx.command("计算器 <type>")
    .action(async (Argv, type) => {
      await Argv.session.send("请输入第一个数字")
      let first = Number(await Argv.session.prompt(10000));
      await Argv.session.send("请输入第二个数字")
      let second = Number(await Argv.session.prompt(10000));
      // if (isNaN(first) || isNaN(second)) {
      //   return `输入类型错误，请重新输入`
      // }
      switch (type) {
        case "加法":
          return `加法:${first + second}`
        case "减法":
          return `减法:${first - second}`
        case "乘法":
          return `乘法:${first * second}`
        case "除法":
          return `除法:${first / second}`
        default:
          return `输入错误，请重新输入`
      }
    })



  ctx.on("message", (session) => {
    if (session.content.includes("对话内容")) {
      console.log(session.content)
      session.send(`对话内容:${session.content}`)
      const [img] = h.select(session.elements, "img")
      if (img) {
        let iamgeUrl = img.attrs.src
        h.image(iamgeUrl)
      }
    }
  })

  ctx.command("来点美味学生")
    .action(async (Argv) => {
      return h.image("https://cdnimg-v2.gamekee.com/wiki2.0/images/829/43637/2022/3/22/900123.png")
    })



  ctx.command("本地图片")
    .action(async (Argv) => {
      let filepath = pathToFileURL(path.join(ctx.baseDir, "./data/assets/imgs/1.png"))
      console.log(filepath.href)
      return h.image(filepath.href)
    })


  ctx.command("图形化测试")
    .action(async (Argv) => {
      // console.log(createHtml())
      const img = await ctx.puppeteer.render(createHtml())

      return img
    })

  // // 定时任务：每分钟发送一条测试消息
  // ctx.cron('*/1 * * * *', () => {
  //   ctx.broadcast('这是一个测试消息') // 使用广播功能发送消息
  //   console.log("定时任务")
  // })

  ctx.model.extend('gamedata', {
    id: 'unsigned',
    name: 'string',
    // 其他字段定义...
  })

  // 创建新的用户数据
  const newGameData: GameData = {
    id: 1,
    name: '萤雪',
    // 其他字段的值...
  }



  ctx.command('数据库测试')
    .action(async ({ session }) => {
      // 插入用户数据到 users 表中
      // await ctx.database.create('gamedata', newGameData)

      const data = await ctx.database.get('gamedata', { id: 1 })
      console.log(`数据库测试成功: id:${data[0].id} name:${data[0].name}`)
      session.send(`数据库测试成功: id:${data[0].id} name:${data[0].name}`)

      return ``
    })

  ctx.middleware((session, next) => {
    console.log(`${session.userId}说了:${session.content}`)
    return next()
  })

  // ctx.user('1796655849').on('message', (session) => {
  //   console.log(session.content)
  //   if (session.content.includes('喜欢你')) {
  //     return '主人，最爱你了！'
  //   }
  // })

  // ctx.command('get <key>', '获取一个键的值')
  //   .action(async ({ session }, key) => {
  //     const data = await ctx.database.get('data', { key })
  //     if (data.length) {
  //       return `值为：${data[0].value}`
  //     } else {
  //       return '未找到该键'
  //     }
  //   })
}


const callList = {};
function getCallTime(userId: string) {
  if (!callList[userId]) {
    callList[userId] = 0
  }
  callList[userId]++
  return callList[userId]
}





//TODO
// 1.随机猫猫图