import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import localizedFormat from 'dayjs/plugin/localizedFormat.js'
import 'dayjs/locale/id.js'

export default defineNuxtPlugin(() => {
  dayjs.extend(relativeTime)
  dayjs.extend(localizedFormat)
  dayjs.locale('id') // Default locale bahasa Indonesia (dapat diubah sesuai preferensi)

  return {
    provide: {
      dayjs
    }
  }
})
