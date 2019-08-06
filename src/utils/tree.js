export function transData(original, idField, pidField, childrenField, orderField) {
  if (original && original.length) {
    /* 做升序处理 Array.sort() */
    original.sort((a, b) => {
      return a[idField] - b[idField]
    })
  } else {
    return []
  }
  let result = []
  let hash = {}
  const id = idField
  const pid = pidField
  const children = childrenField
  const menuOrder = orderField
  let i = 0
  let j = 0
  let len = original.length
  /**
   * 第一层将对象数组转化成JSON数据
   */
  for (; i < len; i++) {
    if (!hash[original[i][id]]) {
      hash[original[i][id]] = original[i]
    }
  }
  for (; j < len; j++) {
    let aVal = original[j]
    let hashVP = hash[aVal[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(aVal)
      hashVP[children].sort((a, b) => {
        return a[menuOrder] - b[menuOrder]
      })
    } else {
      result.push(aVal)
    }
  }
  /* 做升序处理 */
  result.sort((a, b) => {
    return a[menuOrder] - b[menuOrder]
  })
  return result
}
