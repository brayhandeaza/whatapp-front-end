import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/styles/index.scss'
import axios from 'axios'
import { SocketProvider } from '@/contexts/socket.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MainProvider } from './contexts/index.tsx'
import { USER_INFO } from './constants/index.ts'
import SighUp from './components/SighUp.tsx'


axios.defaults.baseURL = 'https://whatsapp-back-end.vercel.app'

ReactDOM.createRoot(document.getElementById('root')!).render(
	USER_INFO ?
		<SocketProvider>
			<MainProvider>
				<QueryClientProvider client={new QueryClient()}>
					<App />
				</QueryClientProvider>
			</MainProvider>
		</SocketProvider>
		: <SighUp />
)
