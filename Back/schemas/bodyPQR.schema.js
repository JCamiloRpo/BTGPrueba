const bodySchema = {
    id: "/bodyPQR",
    type: "object",
    properties: {
        _id: { type: "string" },
        idClient: { type: "string" },
        type: { type: "string" },
        creationDate: { type: "string" },
        closedDate: { type: "string" },
        area: { type: "string" },
        content: {
            type: "object",
            properties:{
                reason: { type: "string" },
                details: { type: "string" }
            },
            required: [ "reason", "details" ]
        },
        response: {
            type: "object",
            properties:{
                user: { type: "string" },
                details: { type: "string" }
            }
        },
        claim: {
            type: "object",
            properties: {
                _id: { type: "string" },
                creationDate: { type: "string" },
                closedDate: { type: "string" },
                content: {
                    type: "object",
                    properties:{
                        reason: { type: "string" },
                        details: { type: "string" }
                    },
                    required: [ "reason", "details" ]
                },
                response: {
                    type: "object",
                    properties:{
                        user: { type: "string" },
                        details: { type: "string" }
                    },
                    required: [ "user", "details" ]
                }
            }
        }
    },
    required: [ "_id", "idClient", "type", "creationDate", "area", "content", "response", "claim" ]
}

module.exports = bodySchema;