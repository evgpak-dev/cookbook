import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

/**
 * Запускает последовательный опрос в консоли на основе массива вопросов.
 * @param {string[]} questions Массив строк с вопросами.
 * @returns {Promise} Объект с ответами вида { [вопрос]: ответ }.
 */
export async function runSurvey(questions) {
  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  const answers = {};

  try {
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const answer = await rl.question(`${question} `);
      answers[question] = answer.trim();
    }
  } catch (error) {
    console.error("Ошибка в ходе опроса:", error);
  } finally {
    rl.close();
  }

  return answers;
}
