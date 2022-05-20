const FETCH_OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
		'X-RapidAPI-Key': '8968efe8ccmsh34f8cacdd0c40a6p162f22jsnd001bcc816ac'
	}
};

export async function get(event) {
	const { searchParams } = event.url;
	const query = searchParams.get('q') ?? 'New York';

	const response = await fetch(
		`https://weatherapi-com.p.rapidapi.com/current.json?q=${query}`,
		FETCH_OPTIONS
	);

	const data = await response.json();

	const { location, current } = data;
	const { country, localtime, name } = location;
	const { condition, humidity, feelslike_c, temp_c, wind_kph, wind_dir, is_day } = current;
	const { icon, text } = condition;

	const body = {
		country,
		localtime,
		humidity,
		locationName: name,
		feelsLike: feelslike_c,
		temperature: temp_c,
		windSpeed: wind_kph,
		windDir: wind_dir,
		isDay: is_day,
		conditionIcon: icon,
		conditionText: text
	};

	return {
		status: 200,
		body
	};
}
