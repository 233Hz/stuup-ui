export const requiredRule = (
  errorMessage: string,
  trigger: string = 'blur',
) => {
  return {
    required: true,
    message: errorMessage,
    trigger: trigger,
  }
}
