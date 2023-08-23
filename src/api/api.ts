import request from './request'
import { ElLoading } from 'element-plus'
import type { ResponseData, File } from '@/types/global'

export async function get<T>(
  url: string,
  params?: any,
): Promise<ResponseData<T>> {
  const response = await request.get<ResponseData<T>>(url, { params })
  return response.data
}
export async function post<T>(
  url: string,
  data?: any,
): Promise<ResponseData<T>> {
  const response = await request.post<ResponseData<T>>(url, data)
  return response.data
}
export async function put<T>(
  url: string,
  data?: any,
): Promise<ResponseData<T>> {
  const response = await request.put<ResponseData<T>>(url, data)
  return response.data
}
export async function del<T>(
  url: string,
  params?: any,
): Promise<ResponseData<T>> {
  const response = await request.delete<ResponseData<T>>(url, { params })
  return response.data
}
export async function download(url: string, params?: any, fileName?: string) {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  try {
    const response = await request.get(url, {
      responseType: 'blob',
      params,
    })
    const blob = new Blob([response.data]) // 创建 href 超链接，点击进行下载
    const a = document.createElement('a')
    const URL = window.URL || window.webkitURL
    const href = URL.createObjectURL(blob)
    a.href = href
    const originalName =
      response.headers['content-disposition']?.replace(
        'attachment;fileName=',
        '',
      ) || '下载失败.txt'
    a.download = fileName || decodeURI(originalName)
    a.click() // 销毁超连接
    window.URL.revokeObjectURL(href)
  } finally {
    loading.close()
  }
}

export async function upload(url: string, params: any) {
  const response = await request.post<ResponseData<File>>(url, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
