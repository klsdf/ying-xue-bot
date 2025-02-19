import { Context, Schema } from 'koishi'

export const name = 'yingxue-core'

export interface Config {}

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

  ctx.command('qq号记录').action(async ( Argv) => {
   return `qq号:${Argv.session.userId}已经记录`
  })
  ctx.command('对话次数检测').action(async ( Argv) => {
    return `对话次数:${getCallTime(Argv.session.userId)}`
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
