/*-- 
categories: 
  key = "cats"
  value = "1 2 3 ..."

scores: 
  key = "scores"
  value = "scoreNormal1 scoreNormal2 ... scoreNormal10

--*/

import {AsyncStorage} from 'react-native';

const IsFirstUse = (onTrue, onFalse) => {
  AsyncStorage.getItem('cats').then((cats) => {
    if(cats !== null){
      onFalse()
    }
  })

  onTrue()
}

const ReadCategories = (player, finished) => {
  AsyncStorage.getItem('cats').then((cats) => {
    if(cats !== null){
      const loadedCats = cats.split(' ');
      player.chosenCategories = loadedCats.map((item) => ( parseInt(item) ));
      finished();
    }
    else{
      WriteCategories(player, finished);
    }
  });
}


const ReadScores = (player, finished) => {
  AsyncStorage.getItem('scores').then((scores) => {
    if(scores !== null){
      let loadedScores = scores.split(' ');

      player.scores = loadedScores.map((item) => ( parseInt(item) ));
      finished();
    }
    else{
      WriteScores(player, finished);
    }
  });
}

const WriteCategories = (player, finished) => {
  let cats = ''
  for(let i = 0; i < player.chosenCategories.length; i++){
    if(i < player.chosenCategories.length - 1){
      cats += player.chosenCategories[i].id + ' '
    }
    else{
      cats += player.chosenCategories[i].id;
    }
  }
  AsyncStorage.setItem('cats', cats).then(() => {
    finished();
  });
}

const WriteScores = (player, finished) => {
  let scores = ''

  for(let i = 0; i < player.scores.length; i++){
    if(i < player.scoresNormal.length - 1){
      scores += player.scores[i] + ' '
    }
    else{
      scores += player.scores[i]
    }
  }

  AsyncStorage.setItem('scores', scores).then(() => {
    finished();
  })
}

export { ReadCategories, ReadScores, WriteCategories, WriteScores, IsFirstUse }