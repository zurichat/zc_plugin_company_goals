export const likeGoal = () => {
  return async () => {
      const response = await fetch(
        'https://goals.zuri.chat/api/v1/goals/like?org_id=200&goal_id=52553&user_id=4455');
      if (!response.ok) {
        throw new Error('Sending failed');
        console.log('sent')
      }
    
  };
};

export const getLikes = () => {
      return async ()=> {
             const response = await fetch('https://goals.zuri.chat/api/v1/goals/like?org_id=200');
             if (!response.ok) {
               throw new Error('Sending failed');
               console.log('sent');
             }
      }
}
