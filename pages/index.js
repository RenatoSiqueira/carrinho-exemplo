import { useState } from 'react'

import Card from '../components/Card'

const convertToBRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const products = [
  { name: 'parafuso', price: '2.50' },
  { name: 'prego', price: '1.00' },
  { name: 'porca', price: '3.20' }
]

const Index = () => {
  const [carrinho, setCarrinho] = useState({})
  const [total, setTotal] = useState(0)

  const controleEstoque = (name, operation, price) => () => {
    console.log(name, operation, price)

    if (operation === 'inc') {
      if (!Object.keys(carrinho).some(item => item === name)) {
        setCarrinho({ ...carrinho, [name]: 1 })
        setTotal(total + parseFloat(price))
        return
      }
      setCarrinho({ ...carrinho, [name]: carrinho[name] + 1 })
      setTotal(total + parseFloat(price))
    }

    if (operation === 'dec') {
      if (!Object.keys(carrinho).some(item => item === name)) {
        return
      }
      const newValue = carrinho[name] - 1

      if (newValue < 0) {
        setCarrinho({ ...carrinho, [name]: 0 })
        return
      }

      setCarrinho({ ...carrinho, [name]: newValue })
      setTotal(total - parseFloat(price))
    }

    console.log(carrinho[name])
  }

  return (
    <div>
      {
        products.map(item => (
          <Card
            key={item.name}
            name={item.name}
            qtd={carrinho[item.name]}
            price={item.price}
            total={carrinho[item.name] ? convertToBRL.format(carrinho[item.name] * parseFloat(item.price)) : 'R$ 0,00'}
            items={carrinho}
            action={controleEstoque}
          />
        ))
      }
      <br />
      <br />
      Pedidos: {JSON.stringify(carrinho)}<br />
      Total: {total ? convertToBRL.format(parseFloat(total)) : 0}
    </div>
  )
}

export default Index