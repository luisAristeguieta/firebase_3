import { ProductoForm } from './components/ProductoForm'
import { ProductoLista } from './components/ProductoLista'

function App() {

  return (
    <div>
      <ProductoForm onProductoCreado={() => alert("Producto creado!")} />
      <ProductoLista />
    </div>

  )
}

export default App