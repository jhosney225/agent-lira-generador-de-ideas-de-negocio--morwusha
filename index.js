
```javascript
const Anthropic = require("@anthropic-ai/sdk");
const readline = require("readline");

const client = new Anthropic();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function generateBusinessIdeas(industry, budget, skills) {
  console.log(
    "\n🚀 Generando ideas de negocio personalizadas para ti...\n"
  );

  const systemPrompt = `Eres un experto en emprendimiento y validación de ideas de negocio. 
Tu tarea es generar ideas de negocio innovadoras, viables y personalizadas basadas en:
- Industria/Sector de interés
- Presupuesto disponible
- Habilidades del emprendedor

Para cada idea, debes proporcionar:
1. Nombre de la idea
2. Descripción breve (2-3 líneas)
3. Mercado objetivo
4. Validación rápida (¿Por qué funcionará?)
5. Requisitos de capital inicial
6. Habilidades necesarias
7. Tiempo estimado para MVP
8. Métrica clave de éxito

Sé creativo, realista y enfocado en viabilidad.`;

  const userPrompt = `Genera 3 ideas de negocio innovadoras para:
- Industria/Sector: ${industry}
- Presupuesto disponible: $${budget}
- Habilidades del emprendedor: ${skills}

Para cada idea, incluye todos los puntos de validación mencionados. 
Ordena las ideas por viabilidad (más viable primero).`;

  let fullResponse = "";

  const stream = client.messages.stream({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 2000,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  for await (const chunk of stream) {
    if (
      chunk.type === "content_block_delta" &&
      chunk.delta.type === "text_delta"
    ) {
      process.stdout.write(chunk.delta.text);
      fullResponse += chunk.delta.text;
    }
  }

  console.log("\n");
  return fullResponse;
}

async function validateBusinessIdea(ideaDescription) {
  console.log(
    "\n✅ Validando tu idea de negocio con análisis detallado...\n"
  );

  const systemPrompt = `Eres un validador experto de ideas de negocio. Tu tarea es analizar críticamente 
una idea de negocio y proporcionar un reporte de viabilidad incluyendo:
1. Análisis DAFO (Debilidades, Amenazas, Fortalezas, Oportunidades)
2. Riesgos identificados (Alto, Medio, Bajo)
3. Recomendaciones de mejora
4. Score de viabilidad (0-100)
5. Próximos pasos recomendados
6. Competencia estimada

Sé honesto y constructivo en tu análisis.`;

  const userPrompt = `Por favor, valida y analiza la siguiente idea de negocio:

${ideaDescription}

Proporciona un análisis completo de viabilidad con todos los puntos mencionados.`;

  let fullResponse = "";

  const stream = client.messages.stream({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 2000,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  for await (const chunk of stream) {
    if (
      chunk.type === "content_block_delta" &&
      chunk.delta.type === "text_delta"
    ) {
      process.stdout.write(chunk.delta.text);
      fullResponse += chunk.delta.text;
    }
  }

  console.log("\n");
  return fullResponse;
}

async function refineBusinessIdea(ideaDescription, feedback) {
  console.log("\n🔄 Refinando tu idea basado en retroalimentación...\n");

  const systemPrompt = `Eres un mentor de emprendimiento especializado en refinamiento de ideas. 
Tu tarea es tomar una idea de negocio y retroalimentación específica, y proporcionar:
1. Versión mejorada de la idea
2. Cambios realizados y por qué
3. Nuevas oportunidades identificadas
4. Estrategia de validación del mercado
5. Plan de próximos 30 días
6. Métricas a rastrear

Sé práctico y accionable.`;

  const userPrompt = `Tengo la siguiente idea de negocio:

${ideaDescription}

He recibido esta retroalimentación:
${feedback}

Por favor, refina la idea considerando esta retroalimentación y proporciona una versión mejorada con plan de acción.`;

  let fullResponse = "";

  const stream = client.messages.stream({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 2000,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  for await (const chunk of stream) {
    if (
      chunk.type === "content_block_delta" &&
      chunk.delta.type === "text_delta"
    ) {
      process.stdout.write(chunk.delta.text);
      fullResponse += chunk.delta.text;
    }
  }