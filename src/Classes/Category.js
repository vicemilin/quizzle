class Category{
  constructor(id, name, num){
    this.id = id ? id : 9
    this.name = name ? name : "General Knowledge" 
    this.numberOfQuestions = num ? num : "93" 
    this.icon = CategoryIcons[id].icon
  }
}

const CategoryIcons = {
    "9": {"icon": require('../Assets/categoryIcons/general.png')},
    "10": {"icon": require('../Assets/categoryIcons/book.png')},
    "11": {"icon": require('../Assets/categoryIcons/film.png')},
    "12": {"icon": require('../Assets/categoryIcons/music.png')},
    "13": {"icon": require('../Assets/categoryIcons/theatre.png')},
    "14": {"icon": require('../Assets/categoryIcons/television.png')},
    "15": {"icon": require('../Assets/categoryIcons/videoGames.png')},
    "16": {"icon": require('../Assets/categoryIcons/boardGames.png')},
    "17": {"icon": require('../Assets/categoryIcons/nature.png')},
    "18": {"icon": require('../Assets/categoryIcons/computer.png')},
    "19": {"icon": require('../Assets/categoryIcons/math.png')},
    "20": {"icon": require('../Assets/categoryIcons/mythology.png')},
    "21": {"icon": require('../Assets/categoryIcons/sports.png')},
    "22": {"icon": require('../Assets/categoryIcons/geography.png')},
    "23": {"icon": require('../Assets/categoryIcons/history.png')},
    "24": {"icon": require('../Assets/categoryIcons/politics.png')},
    "25": {"icon": require('../Assets/categoryIcons/brush.png')},
    "26": {"icon": require('../Assets/categoryIcons/celebrity.png')},
    "27": {"icon": require('../Assets/categoryIcons/animals.png')},
    "28": {"icon": require('../Assets/categoryIcons/venchile.png')},
    "29": {"icon": require('../Assets/categoryIcons/comics.png')},
    "30": {"icon": require('../Assets/categoryIcons/gadget.png')},
    "31": {"icon": require('../Assets/categoryIcons/anime.png')},
    "32": {"icon": require('../Assets/categoryIcons/cartoon.png')},
}

const CategoryList = []

const getCategoryIdByName = name => (
  CategoryList.find(category => (category.name === name)).id
)

const getCategoryById = id => (
  CategoryList.find(category => (category.id == id))
)

export { Category, CategoryIcons, CategoryList, getCategoryIdByName, getCategoryById }
