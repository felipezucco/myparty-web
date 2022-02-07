
import Router from "next/router"
import { useEffect } from "react"

const InvalidAuth = () => {

  useEffect(() => {
    setTimeout(redirect, 2000);
  })

  function redirect() {
    Router.push('/')
  }

  return (
    <div style={{ fontSize: '2em', color: 'white', fontWeight: 'bold' }}>
      Autenticação inválida. Você está sendo redirecionado.
    </div>
  )
}

export default InvalidAuth;