export default function groupIntoFours<T>(inputArr: T[]): T[][] {
  const outputArray = [];
  for (let i = 0; i < inputArr.length; i += 4) {
    const groupOfFourArray = [];
    for (let j = i; j < i + 4; j++) {
      if (inputArr[j]) {
        groupOfFourArray.push(inputArr[j]);
      }
    }
    outputArray.push(groupOfFourArray);
  }
  return outputArray;
}

// interface IReviewFromDB {
//     profile_pic: string | null;
//     rating_value: string;
//     recipe_api_id: string;
//     recipe_img_url: string;
//     recipe_name: string;
//     review: string | null;
//     review_id: number;
//     submission_time: string | null;
//     username: string;
//  }
