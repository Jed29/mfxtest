import '@/styles/globals.css'
import { Provider } from 'react-redux'
import indexStore from '../store/index'

function App({ Component, pageProps }) {
  return (
      <Provider store={indexStore} >
        <Component {...pageProps} />
      </Provider>
    )
  }
  export default App
