import { download } from '@/api/api'

export const downRecord = async (
  params: { rec_code: string },
  fileName?: string,
) => {
  return await download('/grow/export', params, fileName)
}
