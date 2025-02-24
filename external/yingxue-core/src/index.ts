import { Command, Context, Schema, h, Session } from 'koishi'
import { pathToFileURL } from 'url'
import path from 'path'

import { } from 'koishi-plugin-puppeteer'   //用于图形化
import { createHtml } from './html-creator'




interface GameQuestion {
  id: number
  question_title: string
  question_content: string
  answer: string[]
  upload_user_id: string
}
declare module 'koishi' {
  interface Tables {
    gamequestion: GameQuestion
  }
}





interface GameUserData {
  id: number
  userid: string
  name: string
  score: number
  last_ask_question_date: string
}
declare module 'koishi' {
  interface Tables {
    game_user_data: GameUserData
  }
}


interface GameRecommend {
  id: number
  title: string
  content: string
  upload_user_id: string
}
declare module 'koishi' {
  interface Tables {
    game_recommend: GameRecommend
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


  ctx.command('你好')
    .action(async ({ session }) => {
      return '你好主人，最爱你了！'
    })



  // ctx.on('message', (session) => {
  //   if (session.content.includes('男娘')) {
  //     session.send('检测到男娘！警告！')
  //   }
  // })

  // ctx.command('qq号记录').action(async (Argv) => {
  //   return `qq号:${Argv.session.userId}已经记录`
  // })
  // ctx.command('对话次数检测').action(async (Argv) => {
  //   return `对话次数:${getCallTime(Argv.session.userId)}`
  // })

  // ctx.command('多参数测试 <name> <age> <gender>').action(async (Argv, name, age, gender) => {
  //   return `姓名:${name} 年龄:${age} 性别:${gender}`
  // })

  // ctx.command('回复测试').action(async ({ session }) => {
  //   session.send(`用户id: ${session.userId} `)
  //   session.send(`消息id: ${session.messageId} `)
  //   // Argv.session.send('欢迎 ' + h('at', { id: Argv.session.userId }) + ' 入群！')
  //   // Argv.session.send('我正在 ' + h('quote', {id: Argv.session.messageId }) + ' 回复你')
  //   return ""
  // })
  // const testChannelId = "541042950825E06BFC0DC7698D84A86D"



  const myId = "90455E4B9AC248C2DE4BE5388C58495B"
  const 雌小鬼Id = "24CC4328F64BB168175B99C247D3283C"
  const 风铃花id = "5996876310066469677"

  ctx.on("message", (session) => {
    if (session.content.includes("亲亲")) {

      if (session.userId === myId) {
        session.send("主人！亲亲！")
      } else if (session.userId === 雌小鬼Id) {
        session.send("不许亲亲！只有主人可以亲亲！打你！")
      } else {
        session.send("不许亲亲！只有主人可以亲亲！")
      }
    }
  })


  // ctx.command("主动发言测试").action(async ({ session }) => {
  //   await session.bot.sendMessage(testChannelId, `收到来自${session.userId}的发言测试`);
  //   return "主动发言测试成功"
  // })

  // ctx.command('广播测试').action(async ({ session }) => {
  //   let channelId = session.channelId;
  //   console.log("channelId", channelId);
  //   try {
  //     await session.bot.broadcast([testChannelId], `收到来自${session.userId}的广播测试`);
  //     return "广播测试成功"
  //   } catch (error) {
  //     console.log("广播测试失败", error);
  //     return "广播测试失败，因为\n" + error
  //   }

  // })


  // ctx.command('来点小知识 <name>').action(async (Argv, name) => {

  //   if (name === "") {
  //     return `本指令需要在指令后方传入参数哦~比如:来点小知识 c#`
  //   }

  //   if (name === "c#") {
  //     return `c#是一种编程语言，它是一种静态类型、编译型的编程语言。`
  //   }
  //   if (name === "javascript") {
  //     return `javascript是一种编程语言，它是一种动态类型、解释型的编程语言。`
  //   }
  //   if (name === "c") {
  //     return `c是一种编程语言，它是一种静态类型、编译型的编程语言。`
  //   }
  //   if (name === "python") {
  //     return `python是一种编程语言，它是一种动态类型、解释型的编程语言。`
  //   }
  //   if (name === "java") {
  //     return `java是一种编程语言，它是一种静态类型、编译型的编程语言。`
  //   }

  // })

  // ctx.command("数据库查询测试").action(async (Argv) => {
  //   let select = await ctx.database.get('gamequestion',{})
  // //   const results = await ctx.database
  // // .select('gamequestion')
  // // .where('id', '>', 5)
  // // .orderBy('id', 'asc')
  // // .limit(10)
  // // .execute()
  //   console.log(select)
  //   return `查询成功`
  // })
  ctx.model.extend('game_user_data', {
    id: { type: 'integer' },
    userid: { type: 'string' },
    name: 'string',
    score: 'unsigned',
    last_ask_question_date: 'string',
  }, {
    primary: 'id',
    autoInc: true,
  })


  ctx.model.extend('gamequestion', {
    id: { type: 'integer' },
    question_title: 'string',
    question_content: 'string',
    answer: { type: 'list' },
    upload_user_id: 'string',
  }, {
    primary: 'id',
    autoInc: true,
  })

  ctx.model.extend('game_recommend', {
    id: { type: 'integer' },
    title: 'string',
    content: 'string',
    upload_user_id: 'string',
  }, {
    primary: 'id',
    autoInc: true,
  })


  ctx.command("帮助").action(async (Argv) => {
    return `
    您好，这里是萤雪，一个擅长游戏设计和游戏开发的文学少女！
    您可以输入以下的指令与小女子进行互动：
    1. 帮助：查看帮助信息。
    2. 游戏小知识问答，您可以回答其他用户的问题并赚取得分！
    3. 查询我的数据：查询您的账户信息。
    4. 我要出题目：您可以出题目让其他用户回答。
    5. 分数排行榜：查看当前分数排行榜。
    6. 我的题目：查看您出的题目。

    7.每日游戏推荐：查看每日的推荐游戏！
    8.投稿每日推荐：投稿您喜欢的游戏，小女子会进行审核并添加到每日推荐中！
    `
  })



  /**
   * 检查用户是否存在
   * @param ctx 
   * @param session 
   * @returns 
   */
  async function checkAndRegisteUser(ctx: Context, session: Session) {
    let userId = session.userId
    let select = await ctx.database.get('game_user_data', { userid: userId })
    if (select.length === 0) {
      await session.send("没有查询到您的信息哦~您是不是还没有注册呢？请先注册哦！请在30秒内@我并输入您的用户名来注册一个账户吧！")
      let name = await session.prompt(30 * 10000);
      if (name == null) {
        await session.send("注册超时！")
        return;
      }
      await ctx.database.create('game_user_data', {
        userid: userId,
        name: name,
        score: 0,
        last_ask_question_date: new Date().toISOString(),
      })
      await session.send("注册成功！")
      return;
    }else
    {
      console.log("用户存在")
      return;
    }
  }


  async function getUserById(userId: string) {
    let select = await ctx.database.get('game_user_data', { userid: userId })
    if (select.length === 0) {
      return null
    }
    return select[0]
  }


  ctx.command("查询我的数据").action(async ({ session }) => {
    await checkAndRegisteUser(ctx, session)
    let user = await getUserById(session.userId)
    let questions = await ctx.database.get("gamequestion", {upload_user_id: user.userid})
    let questionNum = questions.length
    let recommend = await ctx.database.get('game_recommend', {})
    let recommendNum = recommend.length 
    return `查询成功:${user.name}的积分为:${user.score}
    您出的题目数量为:${questionNum}，如需查询您的题目，请@小女子并输入“我的题目”
    您投稿的游戏数量为:${recommendNum}，如需查询您的投稿，请@小女子并输入“我的投稿”`
  })

  ctx.command("我的投稿").action(async ({ session }) => {
    let user = await getUserById(session.userId)
    let recommend = await ctx.database.get('game_recommend', {upload_user_id: user.userid})
    return `您投稿的游戏为：\n${recommend.map(recommend => `${recommend.title}\n${recommend.content}`).join('\n')}`
  })

  ctx.command("我的题目").action(async ({ session }) => {
    let user = await getUserById(session.userId)
    let questions = await ctx.database.get("gamequestion", {upload_user_id: user.userid})
    return `您出的题目为：\n${questions.map(question => `${question.question_title}\n${question.question_content}\n答案为：${question.answer}`).join('\n')}`
  })

  ctx.command("我要出题目").action(async ({ session }) => {
    await checkAndRegisteUser(ctx, session)
    let user = await getUserById(session.userId)

    await session.send(`欢迎${user.name}来到出题环节！请艾特小女子并在30秒内输入您的题目标题！`)
    let question_title = await session.prompt(30 * 1000);
    await session.send(`请输入您的题目内容!`)
    let question_content = await session.prompt(30 * 1000);
    await session.send(`请输入您的答案!`)
    let answer = await session.prompt(30 * 1000);

    await ctx.database.create('gamequestion', {
      question_title: question_title,
      question_content: question_content,
      answer: [answer],
      upload_user_id: user.userid,
    })
    return `出题成功！您出的题目为：\n${question_title}\n${question_content}\n答案为：${answer}`
  })

  ctx.command("每日游戏推荐").action(async ({ session }) => {
    try{
      let recommend = await ctx.database.get('game_recommend', {})
      let randomRecommend = recommend[Math.floor(Math.random() * recommend.length)]
      return `今日推荐：\n${randomRecommend.title}\n${randomRecommend.content}`
    }catch(error){
      return `哎呀~这里信号有些不太好~待会再试哦~`
    }
  })

  ctx.command("投稿每日推荐游戏").action(async ({ session }) => {
    await checkAndRegisteUser(ctx, session)
    let user = await getUserById(session.userId)
    await session.send(`欢迎${user.name}来到投稿环节！请艾特小女子并在30秒内输入您的推荐的游戏名！`)
    let title = await session.prompt(30 * 1000);
    await session.send(`请输入您的推荐理由！`)
    let content = await session.prompt(30 * 1000);
    await ctx.database.create('game_recommend', {
      title: title,
      content: content,
      upload_user_id: user.userid,
    })
    return `投稿成功！\n您推荐的游戏为：\n${title}\n理由为：\n${content}`
  })

  ctx.command("游戏小知识问答").action(async ({ session }) => {
    //检测是否存在用户

    await checkAndRegisteUser(ctx, session)    
    let user = await getUserById(session.userId)

    await session.send(`欢迎${user.name}来到游戏小知识问答！接下来，小女子会提出一个游戏小知识，请您在30秒内@我并回答答案。`)
    let questions = await ctx.database.get('gamequestion', {})
    //从问题中随机拿一个
    let randomQuestion = questions[Math.floor(Math.random() * questions.length)]
    await session.send(`请问：\n${randomQuestion.question_title}\n${randomQuestion.question_content}`)

    let answer = await session.prompt(30 * 1000);

    if (answer == null) {
      return "回答超时！"
    }

    if (answer.includes(randomQuestion.answer[0]) || answer.includes(randomQuestion.answer[1])) {
      let score = user.score + 1
      await ctx.database.set('game_user_data', { userid: session.userId }, { score: score })

      await session.send(`回答正确！您的分数+1，现在为${score}分`)
    } else {
      await session.send(`回答错误！正确答案为:${randomQuestion.answer[0]}或${randomQuestion.answer[1]}`)
    }

  })

  ctx.command("分数排行榜").action(async ({ session }) => {
    let select = await ctx.database.select('game_user_data', {}).orderBy('score', 'desc').limit(10).execute()
    return `排行榜：\n${select.map(user => `${user.name}:${user.score}`).join('\n')}`
  })



  // return ``  





  // ctx.command("字符串测试")
  //   .action(async (Argv) => {
  //     await Argv.session.send("请输入字符串")
  //     let str1 = await Argv.session.prompt(10000);
  //     console.log(str1)
  //     return `字符串:${str1}`
  //     // await Argv.session.send("请输入第二个字符串")
  //     // let str2 = await Argv.session.prompt(10000);
  //     // return `字符串2:${str2}`
  //   })
  // ctx.command("计算器 <type>")
  //   .action(async (Argv, type) => {
  //     await Argv.session.send("请输入第一个数字")
  //     let first = Number(await Argv.session.prompt(10000));
  //     await Argv.session.send("请输入第二个数字")
  //     let second = Number(await Argv.session.prompt(10000));
  //     // if (isNaN(first) || isNaN(second)) {
  //     //   return `输入类型错误，请重新输入`
  //     // }
  //     switch (type) {
  //       case "加法":
  //         return `加法:${first + second}`
  //       case "减法":
  //         return `减法:${first - second}`
  //       case "乘法":
  //         return `乘法:${first * second}`
  //       case "除法":
  //         return `除法:${first / second}`
  //       default:
  //         return `输入错误，请重新输入`
  //     }
  //   })



  // ctx.on("message", (session) => {
  //   if (session.content.includes("对话内容")) {
  //     console.log(session.content)
  //     session.send(`对话内容:${session.content}`)
  //     const [img] = h.select(session.elements, "img")
  //     if (img) {
  //       let iamgeUrl = img.attrs.src
  //       h.image(iamgeUrl)
  //     }
  //   }
  // })

  // ctx.command("来点美味学生")
  //   .action(async (Argv) => {
  //     return h.image("https://cdnimg-v2.gamekee.com/wiki2.0/images/829/43637/2022/3/22/900123.png")
  //   })



  // ctx.command("本地图片")
  //   .action(async (Argv) => {
  //     let filepath = pathToFileURL(path.join(ctx.baseDir, "./data/assets/imgs/1.png"))
  //     console.log(filepath.href)
  //     return h.image(filepath.href)
  //   })


  // ctx.command("图形化测试")
  //   .action(async (Argv) => {
  //     // console.log(createHtml())
  //     const img = await ctx.puppeteer.render(createHtml())

  //     return img
  //   })

  // // 定时任务：每分钟发送一条测试消息
  // ctx.cron('*/1 * * * *', () => {
  //   ctx.broadcast('这是一个测试消息') // 使用广播功能发送消息
  //   console.log("定时任务")
  // })



  //   const newGameQuestion: GameQuestion = {
  //     // id:1,
  //     question_title: '请问：MDA框架中，MDA代表什么？',
  //     question_content: `
  // A：Model(模型）,Dynamics(动态),AI(人工智能)
  // B：Mechanics(机制),Dynamics(动态),Aesthetics(美学)
  // C：Model(模型),Data(数据),Aesthetics(美学)
  // D：Mechanics(机制),Data(数据),Algorithm(算法)`,
  //     answer: ['B','b'],
  //   }

  //   ctx.command('数据库测试')
  //     .action(async ({ session }) => {
  //       // 插入用户数据到 users 表中
  //       // await ctx.database.create('gamedata', newGameData)

  //       // await ctx.database.create('gamequestion', newGameQuestion)

  //       await ctx.database.set('gamequestion', {id:1}, {
  //         // id:1,
  //         question_title: '请问：MDA框架中，MDA代表什么？',
  //         question_content: `
  // A：Model(模型）,Dynamics(动态),AI(人工智能)
  // B：Mechanics(机制),Dynamics(动态),Aesthetics(美学)
  // C：Model(模型),Data(数据),Aesthetics(美学)
  // D：Mechanics(机制),Data(数据),Algorithm(算法)`,
  //         answer: ['B','b'],
  //       })

  //       // = await ctx.database.get('gamequestion', { id: 2 })
  //       const data = await ctx.database.select('gamequestion', { id: 2 }).execute()
  //        console.log(data)

  //       await session.send(data[0].question_title+'\n'+data[0].question_content)

  //       return ``
  //     })

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


// const callList = {};
// function getCallTime(userId: string) {
//   if (!callList[userId]) {
//     callList[userId] = 0
//   }
//   callList[userId]++
//   return callList[userId]
// }





//TODO
// 1.随机猫猫图