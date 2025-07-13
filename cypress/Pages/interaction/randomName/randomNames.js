class RandomNameGenerator {
  generate() {
    return `Abubakar${Math.floor(Math.random() * 10000)}`; // Generates a random number suffix
  }
}

export default RandomNameGenerator;
