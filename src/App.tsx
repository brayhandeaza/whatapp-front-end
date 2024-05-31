import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomeView from '@/views/HomeView'
import SettingsView from '@/views/SettingsView'
import ArchivedView from '@/views/ArchivedView'
import NotFoundView from '@/views/404View'



const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeView />
	},
	{
		path: "/archived",
		element: <ArchivedView />
	},
	{
		path: "/settings",
		element: <SettingsView />
	},
	{
		path: "*",
		element: <NotFoundView />
	}
])

const App: React.FC = () => {

	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	)
}

export default App
