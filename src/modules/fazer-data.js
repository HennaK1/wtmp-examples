//const today = new Date().toISOString().split('T')[0];
//console.log('today is ', today);
//const dataUrlFi = `https://www.foodandco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=270540&weekDate=${today}`;
//const dataUrlEn = `https://www.foodandco.fi/api/restaurant/menu/week?language=en&restaurantPageId=270540&weekDate=${today}`;

const dataUrlFi = "https://www.foodandco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=270540&weekDate=2022-02-01";
const dataUrlEn = "https://www.foodandco.fi/api/restaurant/menu/week?language=en&restaurantPageId=270540&weekDate=2022-02-01";
/**
 * Parsing fazer menu for a day from json data
 *
 * @param {*} menuData - menu data
 * @param {*} dayOfWeek - index number for the day here monday
 * @returns {Array} - meals for a day
 */
 const parseMenu = (menuData, dayOfWeek) => {
  let dailyMenu = menuData.LunchMenus[dayOfWeek].SetMenus.map(setMenu => {
    let mealName = setMenu.Name;
    let dishes = setMenu.Meals.map(dish => `${dish.Name} (${dish.Diets.join(', ')})`);
    dishes = dishes.join(', ');
    return mealName ? `${mealName}: ${dishes}` : dishes;
  });
  return dailyMenu;
};

let coursesFi = parseMenu(FazerLunchMenuFi, 0);
 //console.log('parsed fazer menu', coursesFi);
let coursesEn = parseMenu(FazerLunchMenuEn, 0);

const getDailyMenu = (lang, weekDay = 0) => {
  return (lang === 'fi') ?
  parseMenu(FazerLunchMenuFi, weekDay):parseMenu(FazerLunchMenuEn, weekDay);
};

const FazerData = {getDailyMenu, dataUrlEn, dataUrlFi};

export default FazerData;
