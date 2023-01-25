civicAddressElement_schema = {
    "type": "array",
    "properties": {
        "contains": {
            "type": "array",
            "properties": {
                "caType": {"type": "integer"},
                "caValue": {"type": "string"}
            },
            "required": ["caType", "caValue"],
            "additionalProperties": False
        }   
    },
}

polygon_schema = {
    "type": "object",
    "properties": {
        "coordinates": {
            "type": "array", 
            "minItems": 1,
            "contains": {
                "type": "array",
                "properties": {
                    "contains": {"type": "number"}
                }
            } 
        }
    },
    "additionalProperties": False
}

locationConstraints_schema = {
    "type": "object",
    "properties": {
        "countryCode": {"type": "string"},
        "civicAddressElement": civicAddressElement_schema,
        "area": polygon_schema
    },
    "additionalProperties": False
}

userAppInstanceInfo_schema = {
    "type": "object",
    "properties": {
        "appInstanceId": {"type": "string"},
        "referenceURI": {"type": "string"},  
        "appLocation": locationConstraints_schema
    },
    "additionalProperties": False
}

addressChangeNotification_schema = {
    "type": "object",
    "properties": {
        "notificationType": {"type": "string"},
        "contextId": {"type": "string"},
        "appInstanceId": {"type": "string"},
        "referenceURI": {"type": "string"}
    },
    "required": ["notificationType", "contextId", "appInstanceId", "referenceURI"],
    "additionalProperties": False
}

applicationContextDeleteNotification_schema = {
    "type": "object",
    "properties": {
        "notificationType": {"type": "string"},
        "contextId": {"type": "string"},
    },
    "required": ["notificationType", "contextId"],
    "additionalProperties": False
}

applicationContextUpdateNotification_schema = {
    "type": "object",
    "properties": {
        "notificationType": {"type": "string"},
        "contextId": {"type": "string"},
        "userAppInstanceInfo": userAppInstanceInfo_schema
    },
    "required": ["notificationType", "contextId"],
    "additionalProperties": False
}

availableLocations_schema = {
    "type": "object",
    "properties": {
        "appLocation": locationConstraints_schema
    },
    "required": ["appLocation"],
    "additionalProperties": False
}

applicationLocationAvailabilityNotification_schema = {
    "type": "object",
    "properties": {
        "notificationType": {"type": "string"},
        "contextId": {"type": "string"},
        "availableLocations": availableLocations_schema
    },
    "required": ["notificationType", "contextId"],
    "additionalProperties": False
}