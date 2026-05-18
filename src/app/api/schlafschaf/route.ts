export async function GET() {
  const sleepingSheep = `
               __  _
       .-.'  \`; \`-._  __  _
      (_,         .-:'  \`; \`-._
    ,'o"(        (_,           )
   (__,-'      ,'o"(            )>
      (       (__,-'            )
       \`-'._.--._(             )
          |||  |||\`-'._.--._.-'
                     |||  |||
  `;

  return new Response(sleepingSheep, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
