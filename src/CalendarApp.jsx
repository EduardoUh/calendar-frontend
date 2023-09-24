import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';


export const CalendarApp = () => {
  // console.log(import.meta.env.VITE_API_URL);
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
