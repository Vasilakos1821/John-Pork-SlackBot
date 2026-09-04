require("dotenv").config();
const axios = require("axios");
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

function getJohnPorkWeatherTake(condition, tempC) {
  const desc = condition.toLowerCase();

  if (desc.includes("rain") || desc.includes("shower") || desc.includes("drizzle")) {
    return "Prime mud puddle conditions! Great for rolling around, but terrible for keeping my iPhone dry.";
  }
  if (desc.includes("snow") || desc.includes("ice") || desc.includes("blizzard")) {
    return "My trotters are freezing and my snout is frosted over. Stay inside and call someone!";
  }
  if (tempC >= 30) {
    return "It's scorching! Somebody turn on the AC before I turn into pulled pork out here.";
  }
  if (tempC <= 5) {
    return "Freezing cold out here. The battery on my phone is dropping just looking at the sky.";
  }
  if (desc.includes("sun") || desc.includes("clear")) {
    return "Crisp and clear. Ideal weather for high-definition FaceTime calls and roaming the yard.";
  }
  return "Decent weather for business calls and minding my own bacon.";
}

app.command("/johnpork-ping", async ({ ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({
    response_type: "in_channel",
    text: `Hope I porked here fast enough!\nLatency: ${latency}ms`
  });
});

app.command("/johnpork-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({
      response_type: "in_channel",
      text: `John Pork: Cats are weird!\n${response.data.fact}`
    });
  } catch (err) {
    await respond({
      response_type: "in_channel",
      text: "Failed to fetch a cat fact."
    });
  }
});

app.command("/johnpork-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      response_type: "in_channel",
      text: `${response.data.setup}\n\n${response.data.punchline}`
    });
  } catch (err) {
    await respond({
      response_type: "in_channel",
      text: "Failed to fetch a joke."
    });
  }
});

app.command("/johnpork-randomquranayah", async ({ ack, respond }) => {
  await ack();
  const randomAyahNumber = Math.floor(Math.random() * 6236) + 1;

  try {
    const response = await axios.get(`https://api.alquran.cloud/v1/ayah/${randomAyahNumber}/en.asad`);
    const ayah = response.data.data;
    await respond({
      response_type: "in_channel",
      text: `John Pork: Here's a random Quranic verse!\n> "${ayah.text}"\n— *Surah ${ayah.surah.englishName} (${ayah.surah.number}:${ayah.numberInSurah})*`
    });
  } catch (error) {
    console.error(error);
    await respond({
      response_type: "in_channel",
      text: "John Pork couldn't fetch a verse right now. Try again later!"
    });
  }
});

app.command("/johnpork-food", async ({ ack, respond }) => {
  await ack();

  try {
    const res = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php", {
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    const meal = res.data.meals[0];

    await respond({
      response_type: "in_channel",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🍽️ John Pork's Grub Delivery",
            emoji: true
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*John Pork recommends:*\n*${meal.strMeal}* (${meal.strCategory} / ${meal.strArea})`
          }
        },
        {
          type: "image",
          image_url: meal.strMealThumb,
          alt_text: meal.strMeal
        }
      ]
    });
  } catch (err) {
    console.error(err);
    await respond({
      response_type: "in_channel",
      text: "John Pork dropped his plate! Failed to fetch food."
    });
  }
});

app.command("/johnpork-weather", async ({ command, ack, respond }) => {
  await ack();

  const city = command.text.trim() || "London";

  try {
    const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
    const response = await axios.get(url, { timeout: 4000 });

    const current = response.data.current_condition[0];
    const condition = current.weatherDesc[0].value;
    const tempC = parseInt(current.temp_C, 10);
    const feelsLikeC = current.FeelsLikeC;
    const humidity = current.humidity;

    const johnPorkTake = getJohnPorkWeatherTake(condition, tempC);

    await respond({
      response_type: "in_channel",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: `📱 John Pork's Weather Radar: ${city.toUpperCase()}`,
            emoji: true
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Condition:*\n${condition}`
            },
            {
              type: "mrkdwn",
              text: `*Temperature:*\n${tempC}°C (Feels like ${feelsLikeC}°C)`
            },
            {
              type: "mrkdwn",
              text: `*Humidity:*\n${humidity}%`
            },
            {
              type: "mrkdwn",
              text: `*Reception:*\nFull 5G Bars 📶`
            }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*John Pork's Take:*\n> "${johnPorkTake}"`
          }
        }
      ]
    });
  } catch (err) {
    console.error(err);
    await respond({
      response_type: "in_channel",
      text: `John Pork lost signal trying to check the skies in "${city}". Make sure the city name is valid!`
    });
  }
});

app.command("/johnpork-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    response_type: "in_channel",
    text: `Available Commands:
/johnpork-ping - Check bot latency
/johnpork-catfact - Get a cat fact
/johnpork-joke - Get a random joke
/johnpork-randomquranayah - Get a random Quranic verse
/johnpork-food - Get a random meal recommendation
/johnpork-weather - Check the weather with John Pork`
  });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
