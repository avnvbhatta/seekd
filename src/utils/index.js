const colors = ['blue', 'purple', 'green', ]
const index = [300, 400, 500, 600]

const getRandomColor = () => {
  const rand = Math.floor(Math.random() * colors.length);
  return colors[rand];
}

const getRandomIndex = () => {
  const rand = Math.floor(Math.random() * index.length);
  return index[rand];
}

export const getRandomGradient = () => {
  return `bg-gradient-to-r from-${getRandomColor()}-${getRandomIndex()} to-${getRandomColor()}-${getRandomIndex()}`
}

