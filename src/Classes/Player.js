import { getCategoryIdByName, CategoryList } from './Category'

export default class Player{
  constructor(){
    this.token = ''
    this.chosenCategories = []
    this.scores = []
    this.categoryQuestionsLeft = []
  }

  isChosenCategory = (id) => {
    if(this.chosenCategories.length < 1){
      return -1
    }
    for(let i = 0; i < this.chosenCategories.length; i++){
      if(this.chosenCategories[i].id == id){
        return i
      }
    }
    return -1
  } 

  getQuestionsLeft = id => (
    this.categoryQuestionsLeft[id - 9]
  )

  updateQuestionsLeft = (questionSet) => {
    questionSet.forEach(question => {
      this.categoryQuestionsLeft[getCategoryIdByName(question.category) - 9] -= 1
    });
  }

  resetQuestionsLeft = () => {
    this.categoryQuestionsLeft = []
    CategoryList.forEach(category => {
      this.categoryQuestionsLeft.push(category.numberOfQuestions)
    })
  }
}