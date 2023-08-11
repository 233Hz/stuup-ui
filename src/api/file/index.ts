import { ApiResult, get, download } from '@/api/api'

export interface FileVO {
  id: number
  storageName: string
  originalName: string
  bucket: string
  suffix: string
  createUser: string
  createTime: string
}

export const downFile = (storageName: string, originalName?: string) => {
  download('/file/download', { fileName: storageName }, originalName)
}

export const getFileListForIds = async (
  ids: string,
): Promise<ApiResult<FileVO[]>> => {
  return get('/file/files/' + ids)
}
