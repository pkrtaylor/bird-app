import '../../styles/globals.css'
import { Provider } from 'react-redux'
import { useStore } from '../store'
import Alert from '../components/Alert'


export default function App({ Component, pageProps }) {

  const store = useStore(pageProps.initialReduxState)

  return (<Provider store={store}>
    <Alert/>
    <Component {...pageProps} />
  </Provider>)
}
