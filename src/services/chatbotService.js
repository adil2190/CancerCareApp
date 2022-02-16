export const chatBotMessage = msg => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://cancer-care-chatbot.herokuapp.com/home/${msg}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const response1 = await response.json();
      return resolve({result: 'success', message: response1});
    } catch (err) {
      return reject({result: 'failed', message: err});
    }
  });
};

// https://chatbot-api-flask1.herokuapp.com/home/${msg}
