const Card = ({ name, qtd = 0, price, total, action }) => {
  return (
    <div>
      Card - {name}<br />
      Preço unitário: R$ {price}<br />
      Seleção: {qtd} unidades = {total}
      <br />
      <button onClick={action(name, 'inc', price)}>Aumentar</button>
      <button onClick={action(name, 'dec', price)}>Reduzir</button>
      <br /><br />
    </div>
  )
}

export default Card