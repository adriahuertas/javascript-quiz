export const getAllQuestions = async (limit: number = 10) => {
  return await fetch('./data.json')
    .then(async (res) => await res.json())
    .then((data) => data.sort(() => Math.random() - 0.5).slice(0, limit))
}
