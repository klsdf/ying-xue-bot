import { Session } from 'inspector/promises'
import { Context, Schema, h } from 'koishi'
import { pathToFileURL } from 'url'
import path from 'path'
export const name = 'yingxue-core'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
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


}



const callList = {};
function getCallTime(userId: string) {
  if (!callList[userId]) {
    callList[userId] = 0
  }
  callList[userId]++
  return callList[userId]
}
