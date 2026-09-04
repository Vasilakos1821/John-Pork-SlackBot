require("dotenv").config();
const axios = require("axios");

const johnPorkJokes = [
  "Why does John Pork never miss a call? Because he's always on the line.",
  "Why did John Pork get a touchscreen? He wanted to test his swiping snout.",
  "What is John Pork’s favorite mobile carrier? T-Mobacon.",
  "Why did John Pork get banned from the butcher shop? Terrible reception.",
  "What happens when John Pork calls 911? The dispatcher asks if it's spam.",
  "Why does John Pork wear a suit on FaceTime? Business in the front, snout in the camera.",
  "Why did John Pork cross the road? To get better 5G reception.",
  "What's John Pork's default ringtone? The Hog-warts theme song.",
  "Why was John Pork placed on hold? Too much ham-radio interference.",
  "How does John Pork take a screenshot? He slams his snout against the glass.",
  "Why did John Pork reject your call? He saw caller ID and decided to save his bacon.",
  "What does John Pork say before hanging up? 'Talk to you larder!'",
  "Why did John Pork buy stock in Apple? He heard they make the best applesauce.",
  "What is John Pork's favorite social platform? Instaham.",
  "Why did John Pork get fired from customer support? He hogged the lines all day.",
  "How does John Pork keep his phone screen clean? Heavy-duty grease wipes.",
  "What do you call a 3 AM FaceTime from John Pork? A wake-up squeak.",
  "Why does John Pork hate airplane mode? If pigs can't fly, his phone shouldn't either.",
  "What happened when John Pork dropped his phone? Pure crackling audio.",
  "Why is John Pork terrible at poker? He always squeals on a bluff.",
  "What did John Pork say to the spam caller? 'Stop pigging on my time.'",
  "Why did John Pork get an unlimited data plan? You can't put a cap on the porkcast.",
  "How does John Pork sort his contacts? By farm tier.",
  "Why did John Pork decline the Zoom call? He only does unannounced FaceTime ambushes.",
  "What’s John Pork’s favorite keyboard key? The space boar.",
  "Why did John Pork visit the IT desk? His swine-fi stopped working.",
  "What’s John Pork’s biggest nightmare? The red 1% battery icon.",
  "Why did John Pork start a podcast? Everyone told him he had a face for radio.",
  "What app does John Pork use to get around town? Google Oinks.",
  "Why was John Pork staring blankly at the orange juice carton? It said 'concentrate' during his conference call.",
  "Why does John Pork hate texting? Hooves were never optimized for QWERTY.",
  "What did John Pork say when the call dropped? 'Well, that was a boar.'",
  "Why did John Pork become a digital influencer? To bring home the bacon.",
  "Why did John Pork dial emergency services? He pulled a serious hamstring.",
  "How does John Pork end a phone argument? 'I'm hanging up before things get messy in the pen.'",
  "Why did John Pork inspect the AWS data center? He wanted to see where the cloud truffles were stored.",
  "What is John Pork’s favorite video game? Call of Duty: Modern Boarfare.",
  "Why was John Pork taken to court? Illegal wire-tapping in the barn.",
  "What did Siri tell John Pork? 'I'm sorry, I couldn't understand that squeak.'",
  "Why does John Pork carry three power banks? A dead pig can't FaceTime.",
  "What’s John Pork’s favorite music genre? Sow-l and R&B.",
  "Why did John Pork decline the job offer? The salary was pure chump ribs.",
  "Why does John Pork love Bluetooth? No cords to trip over in the sty.",
  "What do you call John Pork when he's lost in thought? A philosophical piglet.",
  "Why did John Pork call his bank? To check the balance in his piggy bank.",
  "What happened when John Pork dialed the wrong number? 'Sorry, wrong sty.'",
  "Why does John Pork despise low battery chimes? They ruin his dramatic entrance.",
  "What’s John Pork’s favorite browser? Hog-zilla Firefox.",
  "Why did John Pork set his phone to vibrate? He likes the good vibrations in his trotters.",
  "What is John Pork’s golden rule? Never decline a call from destiny."
];

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

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/johnpork-ping", async ({ command, ack, respond }) => {
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
      text: "Failed to fetch a food image."
    });
  }
});

app.command("/johnpork-call", async ({ ack, respond }) => {
  await ack();

  try {
    const joke = johnPorkJokes[Math.floor(Math.random() * johnPorkJokes.length)];

    await respond({
      response_type: "in_channel",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "📱 Incoming Call: John Pork",
            emoji: true
          }
        },
        {
          type: "image",
          image_url: "https://static.wikia.nocookie.net/the-knee-surgery-operation/images/4/4d/JohnPork.png/revision/latest/thumbnail/width/360/height/450?cb=20241228034018",
          alt_text: "John Pork calling screen"
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*John Pork says:*\n> "${joke}"`
          }
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: "📞 _Call Connected_ • Type `/johnpork-call` to call again"
            }
          ]
        }
      ]
    });
  } catch (err) {
    console.error(err);
    await respond({
      response_type: "in_channel",
      text: "John Pork declined the call."
    });
  }
});

app.command("/johnpork-weather", async ({ command, ack, respond }) => {
  await ack();

  const city = command.text.trim() || "Palermo";

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
            text: `*John Pork's Take:*${city.toLowerCase() === "palermo" ? " Hey that's my home town!" : ""}\n> "${johnPorkTake}"`
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
    text:
`Available Commands:
/johnpork-ping - Check bot latency
/johnpork-catfact - Get a cat fact
/johnpork-joke - Get a random joke
/johnpork-randomquranayah - Get a random Quranic verse
/johnpork-food - Get a random food image
/johnpork-weather - Check the weather with John Pork's take
/johnpork-call - Receive a call from John Pork`
  });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
