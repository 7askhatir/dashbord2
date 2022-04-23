 
import Layout  from './layout/layout'  
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
 

function App() {
 
	return (
		<div className="App">  
		<Layout/> 
		<NotificationContainer />
	   </div>  
	   
	);
}

export default App;
