export const CONFIAG = {
  apple: '苹果',
  banana: '香蕉'
}
// ...

// ① 处理业务逻辑，还弹窗
export function getBInfo ({name = '', id = ''}) {
  return this.$ajax.get('/api/info', {
      name, 
      id
  }).then({age} => {
      this.$modal.show({
          content: age
      })
  })
}

// ② 不处理业务，仅仅写请求方法
export function getAInfo ({name = '', id = ''}) {
  return this.$ajax.get('/api/info', {
      name, 
      id
  })
}