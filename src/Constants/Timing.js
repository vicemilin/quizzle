const btnPushAnimation = {"duration":200, "delay":0}
const btnReleaseAnimation = {"duration":200, "delay":0}

const btnFadeInAnimation = {"duration":300, "delay":200}
const btnFadeOutAnimation = {"duration": 0, "delay": 0}

const questionPopOutAnimation = {"duration":1000, "delay":0}
const questionPopInAnimation = {"duration":0, "delay":0}

const questionChangeAnimationLenght = (
  questionPopInAnimation["duration"] +
  questionPopInAnimation["delay"] +
  questionPopOutAnimation["duration"] +
  questionPopOutAnimation["delay"]
)

const btnShowingAnimationLength = 4*btnFadeInAnimation["duration"] + 4*btnFadeInAnimation["delay"]

const firstQuestionDelay = 500
const nextQuestionDelay = 1500


export {
  btnPushAnimation, btnReleaseAnimation, btnFadeInAnimation, btnFadeOutAnimation,btnShowingAnimationLength,
  questionPopInAnimation, questionPopOutAnimation, questionChangeAnimationLenght,
  firstQuestionDelay, nextQuestionDelay
}