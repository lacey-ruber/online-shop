export const calcTotalPrice = (goods) => {
  return goods.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}
