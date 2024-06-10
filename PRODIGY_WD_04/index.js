async function getWeather() {
	let data;
	let url;
	const api_key = "fcd9e11cf0f6f65eb37b45a336b4f46f";
	if (arguments.length == 1) {
		const city = arguments[0];
		console.log(city);
		url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
	} else {
		const lat = arguments[0];
		const lon = arguments[1];
		console.log(lat, lon);
		url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
	}
	try {
		const result = await fetch(url);

		if (!result.ok) {
			throw new Error(`Error: ${result.status} ${result.statusText}`);
		}

		data = await result.json();
	} catch (error) {
		data = { error: error.message };
	}
	return data;
}
const weatherConditions = {
	0: {
		condition: "Snow",
		imgSrc: "./assets/snow.png",
	},
	1: {
		condition: "Rain",
		imgSrc: "./assets/rainy-day.png",
	},
	2: {
		condition: "Clouds",
		imgSrc: "./assets/clouds.png",
	},
	3: {
		condition: "Clear",
		imgSrc: "./assets/sun.png",
	},
	4: {
		condition: "Drizzle",
		imgSrc: "./assets/drizzle.png",
	},
	5: {
		condition: "Mist",
		imgSrc: "./assets/mist.png",
	},
	6: {
		condition: "Thunderstorm",
		imgSrc: "./assets/thunder.png",
	},
	7: {
		condition: "Haze",
		imgSrc: "./assets/haze.png",
	},
};
async function getWeatherDetails() {
	const data = await getWeather(input.value);
	console.log(data);
	input.value = "";
	if (data && !data.error) {
		$("#before_fetching").css("display", "none");
		$("#error_handling").css("display", "none");
		$("#after_fetching").css("display", "block");
		$("#city").text(data.name);
		const d = new Date();
		$("#time").text(d.getHours() + ":" + d.getMinutes());
		$("#temp").text(data.main.temp + "°C");
		$("#condition").text(data.weather[0].main);
		const src = getImage(data.weather[0].main);
		$("#image").attr("src", src);
		$("#humidity").text(data.main.humidity);
		$("#wind_speed").text(data.wind.speed);
		$("#feelslike").text(data.main.feels_like);
	} else {
		$("#before_fetching").css("display", "none");
		$("#after_fetching").css("display", "none");
		$("#error_handling").css("display", "flex");
	}
}
search.addEventListener("click", getWeatherDetails);

input.addEventListener("keypress", (event) => {
	if (event.key == "Enter") {
		getWeatherDetails();
	}
});
function getImage(condition) {
	for (const key in weatherConditions) {
		if (
			weatherConditions[key].condition.toLowerCase() === condition.toLowerCase()
		) {
			return weatherConditions[key].imgSrc;
		}
	}
	return "./";
}

function getUserLocation() {
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				const lat = position.coords.latitude;
				const lon = position.coords.longitude;
				resolve({ lat, lon });
			});
		} else {
			console.log("Geolocation is not supported by this browser.");
			reject("Geolocation is not supported");
		}
	});
}

window.onload = async function () {
	try {
		const { lat, lon } = await getUserLocation();
		const data = await getWeather(lat, lon);
		console.log(data);
		const temp = data.main.temp + "°C";
		const humidity = data.main.humidity;
		const windspeed = data.wind.speed;
		const condition = data.weather[0].main;
		const desc = data.weather[0].description;
		const src = getImage(condition);
		const city = data.name;
		if (data && !data.error) {
			$(".city_name").text(city);
			$(".cu-te").text(temp);
			$(".cu-des").text(desc);
			$(".cu-ws").text(windspeed);
			$(".cu-co").text(condition);
			$(".cu-img").attr("src", src);
			$(".cu-hum").text(humidity);
		}
	} catch (error) {
		console.log(error);
	}
};
