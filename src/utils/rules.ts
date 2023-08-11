export const requiredRule = (fieldName: string) => {
  return { required: true, message: fieldName + '不能为空', trigger: 'change' }
}
