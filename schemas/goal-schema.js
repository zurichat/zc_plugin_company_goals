const goalSchema = {
	type: "object",
		properties: {
			title: {type: "String"},
			description: {type: "String"},
			weeklyGoal: {type: "Boolean"},
			monthlyGoal: {type: "Boolean"},
			quarterlyGoal: {type: "Boolean"},
			biannualGoal: {type: "Boolean"},
			annualGoal: {type: "Boolean"},
			createdBy: {type: "String"},
			createdAt: {type: "timestamp",
  				metadata: {
    				instanceof: "Date"
  				}
			},
			updatedAt: {type: "timestamp",
  				metadata: {
    				instanceof: "Date"
  				}
			},
  			required: ["title", "description", "createdBy"],
  			additionalProperties: false
}

module.exports = goalSchema
