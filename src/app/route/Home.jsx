
const Home = () => {
  return(
    <div>
      <p>Home Page</p>
    </div>
  )
};

export { Home };


// const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const API_KEY = 'your_api_key_here';
//   const CITY = 'Lahore';

//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         const res = await fetch(
//           // `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
//           `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=${API_key}`
//         );
//         const data = await res.json();
//         setWeather(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching weather:', error);
//         setLoading(false);
//       }
//     };

//     fetchWeather();
//   }, []);

//   return (
//     <div className="p-4 min-h-screen bg-gray-100">
//       {/* Weather Card */}
//       <div className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md text-center mb-8">
//         <h1 className="text-2xl font-bold text-gray-800 mb-2">Weather in {CITY}</h1>
//         {loading ? (
//           <p className="text-gray-500">Loading...</p>
//         ) : weather ? (
//           <>
//             <p className="text-4xl text-blue-600 font-bold">{weather.main.temp}°C</p>
//             <p className="text-gray-700 capitalize">{weather.weather[0].description}</p>
//           </>
//         ) : (
//           <p className="text-red-500">Could not fetch weather data.</p>
//         )}
//       </div>

//       {/* Other content */}
//       {/* <FetchAxios /> */}
//     </div>
//   );