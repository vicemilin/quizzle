import Question from '../../Classes/Question';
import  GetRandomInt  from '../../Constants/Functions'

const questionsUrl = 'https://opentdb.com/api.php?amount=';
const resetTokenUrl = 'https://opentdb.com/api_token.php?command=reset&token='

const ShuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j]
      array[j] = temp;
  }
}

const CreateCategoryNumberArray = (player) =>{
  const nums = []
  for(let i = 0; i < player.chosenCategories.length; i++){
    if(i==0){
      nums.push(player.getQuestionsLeft(player.chosenCategories[i].id));
    }
    else{
      nums.push(player.getQuestionsLeft(player.chosenCategories[i].id) + nums[i-1]);
    }
  }
  return nums;
}

const FindIndexInCategoryNumberArray = (nums, n) => {
  for(let i = 0; i < nums.length; i++){
    if(i == 0){
      if(n >= 0 && n < nums[0]){
        return 0
      }
      continue
    }
    if(n >= nums[i-1] && n < nums[i]){
      return i;
    }
  }
}

const CreateQuestionNumberArray = (numberOfQuestions, player) => {
  //Creates array of length equal to number of categories with all zeroes
  const temp = new Array(player.chosenCategories.length).fill(0)
  const nums = CreateCategoryNumberArray(player);
  for(let i = 0; i < numberOfQuestions; i++){
    const r = GetRandomInt(0, nums[nums.length - 1]);
    const index = FindIndexInCategoryNumberArray(nums, r);
    temp[index]++;
  }
  return temp;
}

const AddQuestions = (questionSet, jsonFile, numberOfQuestions, cat) => {
  for(let i = 0; i < numberOfQuestions; i++){
    questionSet.push(new Question(jsonFile[i]))
  }
}

const GetQuestionsFromApi = (num, cat, token, questionSet) => {
  const currentUrl = questionsUrl + num + '&category=' + cat.id + '&encode=url3986&token=' + token;
  return fetch(currentUrl)
  .then((response)=>response.json())
  .then((responseJson) => {
    if(responseJson.response_code == 0){
      AddQuestions(questionSet, responseJson.results, num, cat);
    }
  })
  .catch((error)=>{
    console.error(error);
  })
}

const CreateQuestionSet = async (numberOfQuestions, player, onSuccess, onError) => {
  if(!CheckPlayerQuestionsLeft(player,numberOfQuestions)){
    await ResetToken(player)
  }
  const QuestionSet = [];
  const promisesArray = [];
  const nums = CreateQuestionNumberArray(numberOfQuestions, player);

  for(let i = 0; i < nums.length; i++){
    if(nums[i] > 0){
      promisesArray.push(GetQuestionsFromApi(nums[i], player.chosenCategories[i], player.token, QuestionSet));
    }
  }
  

  Promise.all(promisesArray).then(() => {
    ShuffleArray(QuestionSet);
    player.updateQuestionsLeft(QuestionSet)
    onSuccess(QuestionSet);
  })
  .catch((error)=>{
    onError(error);
  });
}

CheckPlayerQuestionsLeft = (player, numberOfQuestions) => {
  let total = 0
  player.chosenCategories.forEach(category => {
    total += player.getQuestionsLeft(category.id)
    return total.valueOf()
  })

  if(total > numberOfQuestions){
    return true
  }
  return false
}

const ResetToken = (player, onError) => {
  return fetch(resetTokenUrl + player.token)
  .then(response =>response.json())
  .then(responseJson => {
    if(responseJson.response_code == 0){
      player.resetQuestionsLeft()
    }
    else{
    }
  })
  .catch(error => {
    player.token = ''
  })
}

export default CreateQuestionSet;