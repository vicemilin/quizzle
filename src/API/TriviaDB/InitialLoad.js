import { CategoryList,  Category } from '../../Classes/Category'
import Player from '../../Classes/Player';

const tokenUrl = 'https://opentdb.com/api_token.php?command=request'
const categoryListUrl = 'https://opentdb.com/api_category.php'
const categoryCountUrl = 'https://opentdb.com/api_count_global.php'

const LoadToken = (onSuccess, onError) => {
  return fetch(tokenUrl)
    .then((response) => response.json())
    .then((responseJson) => {
        onSuccess(responseJson["token"])
      })
    .catch((error) =>{
      onError(error);
    })
}

const LoadCategoryList = (onSuccess, onError) => {
  if(CategoryList.length > 35){
    CategoryList = []
  }
  if(CategoryList.length != 0){
    return
  }
  return fetch(categoryListUrl)
    .then((response) => response.json())
    .then((responseJson) => {
      for(let i = 0; i < 24; i++){
        const c = new Category(
          responseJson.trivia_categories[i]['id'], 
          responseJson.trivia_categories[i]['name']
        )
        CategoryList.push(c);
      }
      LoadCategoryCount(onSuccess, onError)
    })
    .catch((error) =>{
      onError(error)
    });
}

const LoadCategoryCount = (onSuccess, onError) => {
  return fetch(categoryCountUrl)
    .then((response) => response.json())
    .then((responseJson) => {
      for(let i = 9; i < 33; i++){
        CategoryList[i-9].numberOfQuestions = responseJson['categories'][i]['total_num_of_verified_questions'];
      }
      onSuccess()
    })
    .catch((error) =>{
      onError(error)
  });
}

const LoadPlayerQuestionsLeft = player => {
  CategoryList.forEach(category => {
    player.categoryQuestionsLeft.push(CategoryList[category.id-9].numberOfQuestions)
  })
  
}

export { LoadToken, LoadCategoryList, LoadPlayerQuestionsLeft }