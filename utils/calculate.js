exports.calculate = (goalId, targets) => {
  let hashMap = {};

  // Loop throught all the goals id and in each iteration find their corresponding target
  goalId.forEach((idObject) => {
    const { _id } = idObject;

    // Another loop for all goals targets
    targets.forEach((target) => {
      // Check if any target correspond to a goal
      if (target.goal_id === _id) {
        // Differetiate betweeen: logical target and numerical target
        if (target.hasOwnProperty('target')) {
          const {
            target: {
              target: { achieved },
            },
          } = target;

          // 🆗 Check if the target has be achieved and set it's value to 100
          if (achieved === 'true') {
            hashMap[_id] = 100;

            // If not set it's value to 1
          } else {
            hashMap[_id] = 0;
          }

          // Differetiate betweeen: logical target and numerical target
        } else if (target.hasOwnProperty('targets') && target.targets[0].type === 'numeric') {
          const { targets } = target;
          let keepTrackTarget = {};
          let milestoneObject = {};

          // Check for the length of the targest if it's equal 4
          if (targets.length === 1 || targets.length === 2 || targets.length === 3 || targets.length === 4) {
            // if(targets.length > 1  ) {
            // 3 loop
            targets.forEach((target, ind) => {
              const { achieved, milestone } = target;
              const targetNum = `target_${ind + 1}`;
              const h = () => {
                if (targets.length === 1) return 100;
                else if (targets.length === 2) return 50;
                else if (targets.length === 3) return 33.33333333333333;
                else if (targets.length === 4) return 25;
              };
              // if no sub_milestone
              if (achieved === 'true') {
                keepTrackTarget = { [targetNum]: h() };

                // if we have sub_milestone proceed
              } else {
                const { sub_milestones } = milestone;
                let num = 0;

                sub_milestones.forEach((sub_milestone, i) => {
                  const { achieved } = sub_milestone;
                  // Configuration
                  const calcMilestoneValue4 = () => {
                    if (sub_milestone.length === 1) return 25;
                    else if (sub_milestones.length === 2) return 12.5;
                    else if (sub_milestones.length === 3) return 8.33333333333333;
                    else if (sub_milestones.length === 4) return 6.25;
                  };
                  const calcMilestoneValue1 = () => {
                    if (sub_milestone.length === 1) return 100;
                    else if (sub_milestones.length === 2) return 50;
                    else if (sub_milestones.length === 3) return 33.33333333333333;
                    else if (sub_milestones.length === 4) return 25;
                  };
                  const calcMilestoneValue2 = () => {
                    if (sub_milestone.length === 1) return 50;
                    else if (sub_milestones.length === 2) return 25;
                    else if (sub_milestones.length === 3) return 16.6666666666666;
                    else if (sub_milestones.length === 4) return 12.25;
                  };
                  const calcMilestoneValue3 = () => {
                    if (sub_milestone.length === 1) return 33.33333333333333;
                    else if (sub_milestones.length === 2) return 16.66666666666667;
                    else if (sub_milestones.length === 3) return 11.11111111111111;
                    else if (sub_milestones.length === 4) return 8.33333333333333;
                  };

                  // Check if the sub_milestones under the target is achieved
                  if (achieved === 'true') {
                    if (targets.length === 1) num += calcMilestoneValue1();
                    if (targets.length === 2) num += calcMilestoneValue2();
                    if (targets.length === 3) num += calcMilestoneValue3();
                    if (targets.length === 4) num += calcMilestoneValue4();

                    // If not set the value to 0
                  } else {
                    num += 0;
                  }
                });
                milestoneObject = { ...milestoneObject, [targetNum]: num };
                keepTrackTarget = { ...keepTrackTarget, ...milestoneObject };
                // console.log(milestoneObject)
              }
            });
          }

          hashMap[_id] = keepTrackTarget;
        }
      }
    });
  });

  return hashMap;
};

// This is use to reduce down all the fieds
exports.reduceCalculation = (item) => {
  const hashMap = {};

  for (let obj in item) {
    const objKeys = Object.keys(item[obj]);
    if (objKeys.length > 0) {
      const objValue = Object.values(item[obj]);
      const newValue = objValue.reduce((prev, cur) => {
        return prev + cur;
      });
      hashMap[obj] = newValue;
    } else {
      hashMap[obj] = item[obj];
    }
  }

  return hashMap;
};

exports.average = (item) => {
  for (let obj in item) {
    const objValue = Object.values(item);
    const objKeys = Object.keys(item);
    const result = objValue.reduce((prev, cur) => {
      return prev + cur;
    });
    return result / objKeys.length;
  }
};

//calculate the milestones and compare to the actual target
exports.getNumericalTgtDone = (item) => {
  let numericalTargetsDone = [];
  for (let i = 0; i < item.length; i++) {
    let milestonesMet =
      item[i].second_milestone + item[i].first_milestone + item[i].last_milestone + item[i].third_milestone;
    if (item[i].target === milestonesMet) {
      numericalTargetsDone.push(item[i]);
    }
  }
  return numericalTargetsDone.length;
};

//check if target is achieved
exports.getLogicalTgtDone = (item) => {
  let logicalTargetDone = [];
  for (let i = 0; i < item.length; i++) {
    if (item[i].achieved === 'true') {
      logicalTargetDone.push(item[i]);
    }
  }
  //console.log(logicalTargetDone.length)
  return logicalTargetDone.length;
};
