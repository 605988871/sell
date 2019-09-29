export function saveToLocal(id, key, value) {
  let seller = window.localStorage._seller_
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage._seller_ = JSON.stringify(seller)
}

export function loadFromLocal(id, key, def) {
  let seller = window.localStorage._seller_
  if (!seller) {
    return def
  }
  //因为我们存储的是一个json字符串，所以要用json.parse转化成一个json对象
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  let ret = seller[key]
  console.log(ret)
  return ret || def
}
