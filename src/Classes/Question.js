import GetRandomInt  from '../Constants/Functions'

class Question{
  constructor(json){
    this.questionText = decodeURIComponent(json["question"])
    this.category = decodeURIComponent(json["category"])
    this.type = decodeURIComponent(json["type"])
    this.difficulty = decodeURIComponent(json["difficulty"])
    if(this.type === "multiple"){
      this.correctAnswer = 0
      this.answers = [
        decodeURIComponent(json["correct_answer"]),
        decodeURIComponent(json["incorrect_answers"][0]), 
        decodeURIComponent(json["incorrect_answers"][1]), 
        decodeURIComponent(json["incorrect_answers"][2])
      ]
      this.ShuffleAnswers()
    }
    else{
      this.answers = ["True", "False"]
      if(json["correct_answer"] === "True"){
        this.correctAnswer =  0
      }
      else{
        this.correctAnswer =  1
      }
    }
  }

  ShuffleAnswers = () => {
    this.correctAnswer = GetRandomInt(0,3)
    if(this.correctAnswer > 0){
      let temp = this.answers[this.correctAnswer]
      this.answers[this.correctAnswer] = this.answers[0]
      this.answers[0] = temp
    }
  }
}

export default Question