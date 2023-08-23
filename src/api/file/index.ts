import { get, download, upload } from '@/api/api'
import type { FileVO } from './type'

export const uploadFile = (params: any) => {
  return upload('/file/upload', params)
}

export const downFile = (storageName: string, originalName?: string) => {
  download('/file/download', { fileName: storageName }, originalName)
}

export const getFileListForIds = async (ids: string) => {
  return get<FileVO[]>('/file/files/' + ids)
}
