const apiTrivia = async () => {
  try{
    const apiResp = await fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean');
    const data = await apiResp.json();
    return data;
  } catch(err){
    console.log(err);
  }
}

export { apiTrivia };